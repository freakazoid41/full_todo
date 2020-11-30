import Component from '../../../../bin/parents/component.js';

import Plib from '../../../../services/Plib.js';
import PickleTree  from '../../../../assets/tree//pickletree.js';

export default class Categories extends Component{

    async render(){
        
        this.styles = [
            'views/pages/Settings/Categories/component.css?v='+(new Date).getTime(),
            'assets/tree/pickletree.css?v='+(new Date).getTime()
        ];

       
        //render component
        await this.view( `<div class="card fluid shadow">
                                        <div class="section head_section">
                                            <h4>Item Categories</h4>
                                            <button type="button" class="secondary ripple" id="btn_add_category">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                        <div class="section">
                                            <div class="tree" id="div_tree"></div>
                                        </div>
                                    </div>`);

    }


    async afterRender(){
        await this.build();
        await this.events();
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }

    async build(){
        this.container = {};
        this.plib = new Plib();
        //get categories and build tree
        this.getCategories();
    }


    async events(){
        //listen add event
        document.getElementById('btn_add_category').addEventListener('click',()=>this.getCForm());
    }


    /**
     * this method will get categories from api
     */
    async getCategories(){
        this.tableNode = [{
            icon:'fa fa-plus',
            title:'Add',
            //context button click event
            onClick : (node) => {
                this.getCForm('add',node.value);
            }
        },{
            icon:'fa fa-edit',
            title:'Edit',
            //context button click event
            onClick : (node) => {
                this.getCForm('update',node.parent.value,node.value);
            }
        },{
            icon:'fa fa-trash',
            title:'Delete',
            onClick : async (node) => {
                this.plib.setLoader('#div_tree');
                await this.plib.request({
                    method:'POST',
                    url: '/src/passage.php?job=event',
                    data:{
                        event : 'delete',
                        model: 'sys_categories',
                        data: JSON.stringify({
                            id:node.value
                        })
                    }
                }).then(rsp=>{
                    if(rsp.rsp){
                        this.tree.getNode(node.value).deleteNode();
                        this.plib.toast('error','Category Removed !!');
                    }else{
                        this.plib.toast('error','Error Happend !!');
                    }
                });
                this.plib.setLoader('#div_tree',false);
            }
        }];
        await this.plib.request({
            method: 'POST',
            url: '/src/passage.php?job=data&event=get',
            data: {
                model:'sys_categories'
            }
        }).then(rsp => {
            if(rsp.rsp){
                let data = [];
                //order elements
                for(let i=0;i<rsp.data.length;i++){
                    this.container[rsp.data[i].id] = rsp.data[i];
                    data.push({
                        n_elements:this.tableNode,
                        n_title:rsp.data[i].title,
                        n_parentid:parseInt(rsp.data[i].parent_id),
                        n_id:parseInt(rsp.data[i].id,)
                    });
                }


                //build tree
                this.tree = new PickleTree({
                    c_target: 'div_tree',
                    dropCallback: async (node) => {
                        //update node parent
                        this.container[node.value].parent_id = node.parent.id;
                        await this.plib.request({
                            method:'POST',
                            url: '/src/passage.php?job=event',
                            data:{
                                event : 'update',
                                model: 'sys_categories',
                                data: JSON.stringify({
                                    id:node.value,
                                    parent_id:node.parent.value === undefined ? 0 : node.parent.value
                                })
                            }
                        }).then(rsp=>{
                            if(!rsp.rsp) this.plib.toast('error','Error Happend !!');
                        });
                    },
                    c_config: {
                        //start as folded or unfolded
                        foldedStatus: true,
                        //for drag / drop
                        drag: true
                    },
                    c_data: data
                });
            }
        });
    }

    /**
     * this method will get category form for transaction
     * @param {string} type    
     * @param {integer} parent_id 
     * @param {integer} id 
     */
    async getCForm(type="add",parent_id=0,id=0){
        Swal.fire({
            icon: 'warning',
            title: 'Enter Info',
            html:`  <div class="row">
                        <div class="col-md-12 input-group vertical text-center">
                            <label>Title *</label>
                            <input required class="elm_categories" type="text" name="title" placeholder="Title"/>
                        </div>
                        <div class="col-md-12 input-group vertical text-center">
                            <label>Icon</label>
                            <select name="icon" id="sel_icon" class="fa fas elm_categories">
                                <option value="">Select Icon</option>
                                <option class="fas" value="fas fa-laptop">&#xf109; Computers</option>
                                <option class="fa" value="fa fa-building">&#xf1ad; Buildings</option>
                            </select>
                        </div>
                    </div>
                    <br>`,
            showCancelButton:true,
            confirmButtonText:'Save !',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            willOpen:()=>{
                if(id!==0){
                    document.querySelector('.elm_categories[name="title"]').value = this.container[id].title;
                    document.querySelector('.elm_categories[name="icon"]').value = this.container[id].icon;
                }
            },
            preConfirm:async ()=>{
                const model = this.plib.checkForm('.elm_categories');
                if(model.valid){
                    //set parent id and main id
                    model.obj.parent_id = parent_id;
                    model.obj.id = id;
                    //send data to api
                    await this.plib.request({
                        method:'POST',
                        url: '/src/passage.php?job=event',
                        data:{
                            event : id === 0 ? 'add' : 'update',
                            model: 'sys_categories',
                            data: JSON.stringify(model.obj)
                        }
                    }).then(rsp=>{
                        if(rsp.rsp){
                            model.obj.id = rsp.data.id;
                            this.container[rsp.data.id] = model.obj;
                            this.plib.toast('success','Category '+id === 0 ? 'Added' : 'Updated'+' ..');
                            //manage tree 
                            if(id === 0){
                                //add new tree element
                                this.tree.createNode({
                                    n_value: model.obj.id,
                                    n_title: model.obj.title,
                                    n_id: model.obj.id,
                                    n_elements: this.tableNode, // node options
                                    n_parent: this.tree.getNode(model.obj.parent_id),
                                    n_checkStatus: false
                                });
                            }else{
                                //update title of element
                                let our_node = this.tree.getNode(id);
                                our_node.title = model.obj.title;
                                our_node.updateNode();
                            }
                        }else{
                            this.plib.toast('error','Error Happend !!');
                        }
                    });
                }else{
                    swal.showValidationMessage(
                        'Please enter required fields.'
                    );
                    return false;
                }
            }
        });



    }   

}

