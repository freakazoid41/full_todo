import Page    from '../../../bin/parents/page.js';
import flatpickr from "../../../../assets/datePicker/flatpickr.js";

import Plib from '../../../../services/Plib.js';
import PickleTable  from '../../../../assets/table/pickletable.js';
import PickleContext  from '../../../../assets/context/picklecontext.js';


export default class Persons extends Page{
    
    async render(){
        this.styles = [
            'views/pages/Persons/page.css?v='+(new Date).getTime(),
            'assets/table/pickletable.css?v='+(new Date).getTime(),
            'assets/table/theme.css?v='+(new Date).getTime(),
            'assets/context/picklecontext.css?v='+(new Date).getTime(),
            'assets/datePicker/flatpickr.css?v='+(new Date).getTime(),
        ]

        const range = (start, end) => {
            return Array(end - start + 1).fill().map((_, idx) => start + idx)
        }

        //render page 
        this.view(`<section class="main_section">
                        <div class="row fade-in section_main" data-section="div_per_edit">
                            <div class="col-sm-12 col-md-12">
                                <div class="card fluid shadow">
                                    <div class="section head_section">
                                        <h4>System Persons</h4>
                                        <button type="button" class="secondary ripple section_changer" data-section="div_per_edit" data-type="1" id="btn_add_person">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="section" style="height:80vh" id="div_table">
                                        <div class="row">
                                            <div class="col-sm-12" style="padding-bottom: 5px;">
                                                <input style="width:100%" type="text" id="in_tbl" placeholder="Search :"/>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12" style="height: 70vh;">
                                                <div id="tbl_persons"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row fade-in section_sub" data-section="div_per_edit" style="display:none;">
                            <div class="col-sm-12 col-md-12">
                                <div class="card fluid shadow">
                                    <div class="section head_section">
                                        <h4>New System User</h4>
                                        <button type="button" class="primary ripple section_changer" id="btn_add_person" data-section="div_per_edit" data-type="0" >
                                            <i class="fa fa-arrow-right"></i>
                                        </button>
                                    </div>
                                    <div class="section" style="height:80vh" id="div_table">
                                        <div class="row h-100 tab-content">
                                            <!-- Navigation Tabs -->
                                            <div class="col-sm-1 col-lg-2 h-100">
                                                <div class="navigation h-100" style="overflow:auto;">
                                                    <div class="card">
                                                        <div class="section nav-tab active" data-target="tab_main">
                                                            <i class="far fa-id-card"></i>
                                                            <span>Main Informations</span>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="section nav-tab " data-target="tab_address">
                                                            <i class="fas fa-map-marked-alt"></i>
                                                            <span>Address Informations</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- // -->
                                            <!-- Tab Content -->
                                            <div class="col-sm-11 col-lg-10 h-100">
                                                <div class="nav-target active" id="tab_main">
                                                    <fieldset>
                                                        <legend>Main Informations</legend>
                                                        <div class="row">
                                                            <div class="col-md-4 input-group vertical text-center">
                                                                <label for="username">Name & Surname</label>
                                                                <input required class="elm_main elm_form" data-model="persons" type="text" name="title" placeholder="Name & Surname"/>
                                                            </div>
                                                            <div class="col-md-4 input-group vertical text-center">
                                                                <label for="username">ID Number</label>
                                                                <input required class="elm_main elm_form" data-model="persons" type="text" name="id_number" placeholder="Gender"/>
                                                            </div>
                                                            <div class="col-md-4 input-group vertical text-center">
                                                                <label for="username">Gender</label>
                                                                <select required class="elm_main elm_form" data-model="persons" name="">
                                                                    <option value="0">Famale</option>
                                                                    <option value="1">Male</option>
                                                                    <option value="2">Non-Binary</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-md-4 input-group vertical text-center">
                                                                <label for="username">Birth Date</label>
                                                                <input required class="elm_main elm_date elm_form" data-model="gender" type="text" name="title" placeholder="Gender"/>
                                                            </div>
                                                            <div class="col-md-4 input-group vertical text-center">
                                                                <label for="username">Birth Place</label>
                                                                <input required class="elm_main elm_form" data-model="persons" type="text" name="title" placeholder="Name & Surname"/>
                                                            </div>
                                                            
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div class="nav-target" id="tab_address">
                                                    <fieldset>
                                                        <legend>Address Informations</legend>
                                                        <div class="row" id="address_container">
                                                            <div class="col-md-2">
                                                                <div class="card address_box main selectable" id="new_address">
                                                                    <i class="fa fa-plus"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <!-- // -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>`);
    }


    async afterRender(){
        await this.build();
        await this.setEvents();

        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }

    async build(){
        this.plib = new Plib();

        this.page = {
            main:{
                isList:false,
                changed:false,
                data:{}
            },
            address:{
                isList:true,
                changed:false,
                data:{}
            }
        };

        const headers = [{
                title:'Name',
                key:'title',
                //width:'50%',
                order:true,
                type:'string', // if column is number then make type number
            },
            {
                title:'Gender',
                key:'gender',
                order:true,
            },{
                title:'Join Date',
                key:'created_at',
                order:true,
            },{
                title:'Product Count',
                key:'pcount',
                order:true,
            },{
                title:'Job Count',
                key:'jcount',
                order:true,
            },{
                title:'#',
                key:'id',
                width:'10%',
                headAlign:'center',
                colAlign:'center',
                columnFormatter:(elm,rowData,columnData)=>{
                    elm.classList.add('btn_context');
                    elm.dataset.id = columnData;//give to id 
                    //this method will manuplate column content
                    //console.log(elm,rowData);
                    return '<i class="fa fa-list" style="pointer-events:none;"></i>';
                },
            },
            
        ]

        this.table = new PickleTable({
            container:'#tbl_persons',
            headers:headers,
            type:'ajax',
            ajax:{
                url: '/src/passage.php?job=data&event=getTable&model=persons',
                pageLimit:10,
                data:{
                    //order:{},
                }
            },
        });

        flatpickr(".elm_date", {
            dateFormat: "Y/m/d",
        });
        
        //get countries
        this.countries = (await this.plib.request({
            method: 'POST',
            url: '/src/passage.php?job=data&event=get',
            data: {
                model:'sys_countries'
            }
        }).then(rsp=>{
            let countries = {};
            for(let i=0;i<rsp.data.length;i++){
                countries[rsp.data[i].id] = rsp.data[i];
            }
            return countries;
        }));
    }   

    async setEvents(){
        //address events
        this.aEvents();
    }

    //#region Address Events
    async aEvents(){
        //new click
        document.getElementById('new_address').addEventListener('click',e=>{
            this.addressForm();
        });

        //address options
        //table menu
        new PickleContext({
            //target
            c_target: 'btn_addr',
            //nodes
            c_nodes: [{
                icon: 'fa fa-edit',
                title: 'Edit',
                //context button click event
                onClick: (node) => {
                    this.addressForm(this.page.address.data[node.dataset.id]);
                }
            }, {
                icon: 'fa fa-trash',
                title: 'Delete',
                onClick: async (node) => {
                    if(this.page.address.data[node.dataset.id].event !== 'add'){
                        this.page.address.data[node.dataset.id].event = 'delete';
                    }else{
                        //remove if is new element
                        delete this.page.address.data[node.dataset.id];
                    }
                    document.getElementById('add_'+node.dataset.id).remove();
                }
            }]
        });


    }

    async addressForm(data = {}){
        Swal.fire({
            title: 'Enter Address Info',
            html:`  <div class="row">
                        <div class="col-md-12 input-group vertical text-center">
                            <label>Title *</label>
                            <input required class="elm_address" type="text" value="" name="title" placeholder=""/>
                        </div>
                        <div class="col-md-6 input-group vertical text-center">
                            <label>Country *</label>
                            <select name="country_id" class="elm_address">
                                <option value="">Select Countries</option>
                                ${Object.values(this.countries).map(c=>{
                                    return '<option value="'+c.id+'">'+c.title+'</option>';
                                }).join()}
                            </select>
                        </div>
                        <div class="col-md-6 input-group vertical text-center">
                            <label>City *</label>
                            <input required class="elm_address" type="text" value="" name="city" placeholder=""/>
                        </div>
                        <div class="col-md-6 input-group vertical text-center">
                            <label>Province *</label>
                            <input required class="elm_address" type="text" value="" name="province" placeholder=""/>
                        </div>
                        <div class="col-md-6 input-group vertical text-center">
                            <label>Zipcode *</label>
                            <input required class="elm_address" type="text" value="" name="zipcode" placeholder=""/>
                        </div>
                        <div class="col-md-12 input-group vertical text-center">
                            <label>Address *</label>
                            <textarea class="elm_address" name="content"></textarea>
                        </div>
                    </div>
                    <br>`,
            showCancelButton:true,
            confirmButtonText:'Save !',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            willOpen:()=>{
                //fill if is update
                if(Object.keys(data).length !== 0){
                    for(let key in data){
                        const elm = document.querySelector('.elm_address[name="'+key+'"]');
                        if(elm !== null) elm.value = data[key];
                    }
                }
            },
            preConfirm:async ()=>{
                const model = this.plib.checkForm('.elm_address');
                if(model.valid){
                    if(data.id == undefined){
                        data = model.obj;
                        data.id = (new Date).getTime();
                        data.event = 'add';
                    }else{
                        model.obj.id = data.id;
                        //not change if is a new item
                        if(model.obj.event === undefined || model.obj.event !== 'add') model.obj.event = 'update';
                        data = model.obj;
                    }
                    console.log(data);
                    //send model to container
                    this.page.address.data[data.id] = data;
                    console.log(this.page.address);
                    this.setAddress(data);
                }else{
                    swal.showValidationMessage(
                        'Please enter required fields.'
                    );
                    return false;
                }
            }
        });
    }


    async setAddress(data = {}){
        //check if exist
        const elm = `   <div class="card address_box selectable btn_addr" data-id="${data.id}">
                            <div class="section text-center">${data.title}</div>
                            <p class="text-center">${data.content}</p>
                            <hr>
                            <div class="section text-center">
                                <div>${this.countries[data.country_id].title+' / '+data.city}</div>
                                <div>${data.province+' - '+data.zipcode}</div>
                            </div>
                        </div>`;
        if(data.event !== 'update'){
            const container = document.createElement('div');
            container.classList.add('col-md-2','add_box');
            container.id = 'add_'+data.id;
            container.innerHTML = elm;
            document.getElementById('address_container').appendChild(container);
        }else{
            const up_elm = document.getElementById('add_'+data.id);
            up_elm.innerHTML = elm;
        }
    }
    //#endregion
}

