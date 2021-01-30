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

        //render page 
        this.view(` <main class="c-main">
                        <div class="kc_fab_main_btn fade-in" id="btn_save"><i class="cil-save"></i></div>
                        <div class="container-fluid">
                            <div class="fade-in">
                                <div class="card section_main" data-section="div_per_edit">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h4>Sistem Kişiler</h4>
                                        <i class="c-icon c-icon-2xl cil-plus selectable-icon section_changer" data-section="div_per_edit" data-type="1"></i>
                                    </div>
                                    <div class="card-body" style="height: 70vh;">
                                        <div id="tbl_persons"></div>
                                    </div>
                                </div>
                                <div class="card section_sub" data-section="div_per_edit" style="display:none;">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h4>Yeni Kişi</h4>
                                        <i class="c-icon c-icon-2xl cil-arrow-left selectable-icon section_changer elm_clean" data-section="div_per_edit" data-type="0"></i>
                                    </div>
                                    <div class="card-body tab-content" style="height: 70vh;">
                                        <ul class="nav nav-tabs" id="myTab1" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="javascript:;" role="tab" data-target="home" aria-selected="false">
                                                    Ana Bilgiler
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link " id="profile-tab" data-toggle="tab" href="javascript:;" role="tab" data-target="profile" aria-selected="true">
                                                    Adres Bilgileri
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="tab-content pt-3" id="myTab1Content">
                                            <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div class="row">
                                                    <div class="col-md-4 form-group">
                                                        <label >İsim & Soyisim</label>
                                                        <input required class="form-control  elm_main elm_form" data-model="sys_persons" type="text" name="name" placeholder="Name & Surname"/>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label>Çalışan Kodu</label>
                                                        <input required class="form-control  elm_main elm_form" data-model="sys_persons" type="text" name="code" placeholder="US-4651"/>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label >Kimlik Numarası</label>
                                                        <input required class="form-control  elm_main elm_form" data-model="sys_persons" type="text" name="id_number" placeholder="5465138432VB"/>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label>Cinsiyet</label>
                                                        <select required class="custom-select elm_main elm_form" data-model="sys_persons" name="gender">
                                                            <option value="0">Kadın</option>
                                                            <option value="1">Erkek</option>
                                                            <option value="2">Non-Binary</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label>Doğum Tarihi</label>
                                                        <input required class="form-control  elm_main elm_date elm_form" data-model="sys_persons" type="text" name="birth_date" placeholder="----/--/--"/>
                                                    </div>
                                                    <div class="col-md-4 form-group">
                                                        <label>Doğum Yeri</label>
                                                        <input required class="form-control  elm_main elm_form" data-model="sys_persons" type="text" name="birth_place" placeholder="Name & Surname"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <div class="row" id="address_container">
                                                    <div class="col-md-2">
                                                        <div class="card address_box main selectable" id="new_address">
                                                            <i class="c-icon c-icon-2xl cil-plus"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>`);
    }


    async afterRender(){
        await this.build();
        await this.setEvents();

        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }

    async build(){
        this.plib = new Plib();

        this.setCache();

        this.fob = document.getElementById('btn_save');
        this.fob.hidden = true;
        const headers = [{
                title:'Name',
                key:'name',
                //width:'50%',
                order:true,
                type:'string', // if column is number then make type number
            },
            {
                title:'Gender',
                key:'gender',
                order:true,
                columnFormatter:(elm,rowData,columnData)=>{
                    switch(columnData){
                        case '0':
                            return 'Kadın';
                        case '1':
                            return 'Erkek';
                        case '2':
                            return 'NON-BINARY';        
                    }
                },
            },{
                title:'Job Count',
                key:'jcount',
                order:true,
                columnFormatter:(elm,rowData,columnData)=>{
                    return 0;
                },
            },{
                title:'#',
                key:'id',
                width:'10%',
                headAlign:'center',
                colAlign:'center',
                columnFormatter:(elm,rowData,columnData)=>{
                    elm.classList.add('btn_person');
                    elm.dataset.id = rowData.id;
                    return '<i  class="cil-list-rich" style="pointer-events:none;"></i>';
                },
            },
            
        ]

        this.table = new PickleTable({
            container:'#tbl_persons',
            headers:headers,
            type:'ajax',
            ajax:{
                url: '/src/passage.php?url=/table/sys_persons',
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
            method: 'GET',
            url: '/assets/theme/countries.json',
        },null,false).then(rsp=>{
            let countries = {};
            for(let key in rsp){
                countries[key] = rsp[key];
            }
            return countries;
        }));

        //main table menu
        new PickleContext({
            //target
            c_target: 'btn_person',
            //nodes
            c_nodes: [{
                icon: 'cil-brush',
                title: 'Edit',
                //context button click event
                onClick: (node) => {
                    this.getPerson(node.dataset.id);
                }
            }, {
                icon: 'cil-trash',
                title: 'Delete',
                onClick: async (node) => {
                    this.plib.request({
                        method: 'DELETE',
                        url: '/request/sys_persons/'+node.dataset.id,
                    }).then(rsp => {
                        if(rsp.success){
                            this.table.deleteRow(node.dataset.id);
                        }else{
                            console.log(rsp);
                        }
                        this.plib.toast(
                            rsp.success ? 'success' : 'error',
                            rsp.success ? 'Girdiler Kaydedildi' : 'Hata Oldu !'
                        );
                    });
                }
            }]
        });
    }   

    setCache(){
        this.page = {
            sys_persons:{
                isList:false,
                changed:false,
                data:{}
            },
            sys_address:{
                isList:true,
                changed:false,
                data:{}
            }
        };

        this.plib.clearElements('.elm_form');
        document.querySelectorAll('.add_box').forEach(el=>el.remove());
    }

    /**
     * this method will set page events
     */
    async setEvents(){
        //address events
        this.aEvents();

        //save event
        this.fob.addEventListener('click',e => this.saveForm());

        //listen change events
        const elms = document.querySelectorAll('.elm_form');
        for(let i = 0;i<elms.length;i++){
            elms[i].addEventListener('change',e => {
                this.fob.hidden = false;
                this.page[e.target.dataset.model].data[e.target.name] = e.target.value.trim();
            });
        }

        //listen cleaners
        document.querySelectorAll('.elm_clean').forEach(el=>el.addEventListener('click',e=>this.setCache()));
    }


    /**
     * this method will get person and set to form
     */
    async getPerson(id){
        await this.plib.request({
            method:'GET',
            url: '/request/sys_persons/'+id,
        }).then(async rsp => {
            if(rsp.success){
                //set main form informations
                this.page.sys_persons.data = rsp.data[0];
                for(let key in rsp.data[0]){
                    const elm = document.querySelector('.elm_form[data-model="sys_persons"][name="'+key+'"]');
                    if(elm !== null) elm.value = rsp.data[0][key];
                }

                //get address info
                await this.plib.request({
                    method:'POST',
                    url: '/query/sys_address',
                    data:{
                        per_id:id
                    }
                }).then(rsp => {
                    if(rsp.success){
                        for(let i=0;i<rsp.data.length;i++){
                            //set address to data
                            this.page.sys_address.data[rsp.data[i].id] = rsp.data[i];
                            //set address to html
                            this.setAddress(rsp.data[i]);
                        }
                    }
                });

                this.fob.hidden = true;

            }
        });

        //open form
        document.querySelector('.section_changer[data-section="div_per_edit"][data-type="1"]').click();
    }

    //#region Address Events
    async aEvents(){
        console.log('### Builded..');
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
                    this.addressForm(this.page.sys_address.data[node.dataset.id]);
                }
            }, {
                icon: 'fa fa-trash',
                title: 'Delete',
                onClick: async (node) => {
                    if(this.page.sys_address.data[node.dataset.id].event !== 'add'){
                        this.page.sys_address.data[node.dataset.id].event = 'delete';
                    }else{
                        //remove if is new element
                        delete this.page.sys_address.data[node.dataset.id];
                    }
                    document.getElementById('add_'+node.dataset.id).remove();
                }
            }]
        });
    }

    async addressForm(data = {}){
        Swal.fire({
            title: 'Adres Bilgisi Giriniz',
            html:`  <div class="row">
                        <div class="col-md-12 form-group">
                            <label>Title *</label>
                            <input required max-length="100" class="elm_address form-control  form-control-sm" type="text" value="" name="title" placeholder=""/>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Country *</label>
                            <select name="country" class="elm_address custom-select custom-select-sm">
                                <option value="">Select Countries</option>
                                ${Object.keys(this.countries).map(c=>{
                                    return '<option value="'+c+'">'+this.countries[c]+'</option>';
                                }).join()}
                            </select>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>City *</label>
                            <input required max-length="50" class="elm_address form-control  form-control-sm" type="text" value="" name="city" placeholder=""/>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Province *</label>
                            <input required max-length="50"  class="elm_address form-control  form-control-sm" type="text" value="" name="province" placeholder=""/>
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Zipcode *</label>
                            <input required max-length="50"  class="elm_address form-control  form-control-sm" type="text" value="" name="zipcode" placeholder=""/>
                        </div>
                        <div class="col-md-12 form-group">
                            <label>Address *</label>
                            <textarea max-length="300"  class="elm_address form-control  form-control-sm" name="content"></textarea>
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
                    //send model to container
                    this.page.sys_address.data[data.id] = data;
                   
                    this.setAddress(data);
                }else{
                    swal.showValidationMessage(
                        'Lütfen gerekli alanları doldurunuz !!'
                    );
                    return false;
                }
            }
        });
    }

    async setAddress(data = {}){
        //check if exist
        const elm = `   <div class="card address_box  btn_addr" data-id="${data.id}">
                            <div class="card-header text-center">${data.title}</div>
                            <div class="card-body text-center selectable"> ${data.content}</div>
                            <div class="card-footer text-center">
                                <div>${this.countries[data.country]+' / '+data.city}</div>
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

        this.fob.hidden = false;
    }
    //#endregion

    async saveForm(){
        //first get main and required fiels
        const form = this.plib.checkForm('.elm_form[data-model="sys_persons"]');
        if(form.valid){
            let valid = true;
            for(let key in this.page){
                if(valid){
                    if(this.page[key].isList === false){
                        //set person id to other models
                        if(key != 'sys_persons') this.page[key].data.per_id = this.page.sys_persons.data.id;
                        //this is a normal form
                        const cForm = this.plib.checkForm('.elm_form[data-model="'+key+'"]');
                        await this.plib.request({
                            method:this.page[key].data.id !== undefined ? 'PATCH' : 'POST',
                            url: '/request/'+key+(this.page[key].data.id !== undefined ? '/'+this.page[key].data.id : ''),
                            data:cForm.obj
                        }).then(rsp => {
                            valid = rsp.success;
                            //add to main table with new id
                            if(key == 'sys_persons'){
                                if(this.page[key].data.id === undefined){
                                    //add new 
                                    this.table.addRow({
                                        ...cForm.obj,
                                        ...{id : rsp.data.id}
                                    });

                                    this.page.sys_persons.data.id = rsp.data.id;
                                }else{
                                    //update
                                    console.log(cForm.obj)
                                    this.table.updateRow(this.page[key].data.id,cForm.obj);
                                }
                            } 
                        });
                    }else{
                        for(let item in this.page[key].data){
                            if(valid){
                                //set person id
                                this.page[key].data[item].per_id = this.page.sys_persons.data.id;
                                const event = this.page[key].data[item].event;
                                if(event !== undefined){
                                    //delete fake id if is new item
                                    if(event == 'add')  delete this.page[key].data[item].id;
                                    //delete event info
                                    delete this.page[key].data[item].event;

                                    await this.plib.request({
                                        method: this.page[key].data[item].id !== undefined ? 'PATCH' : 'POST',
                                        url: '/request/'+key+(event !== 'add' ? '/'+ this.page[key].data[item].id : ''),
                                        data: this.page[key].data[item]
                                    }).then(rsp => {
                                        valid = rsp.success;
                                    });
                                }
                            }else{
                                break;
                            }
                        }
                    }
                }else{
                    break;
                }
            }

            this.plib.toast(
                valid ? 'success' : 'error',
                valid ? 'Girdiler Kaydedildi' : 'Gerekli Alanları Doldurunuz !'
            );
            if(valid){
                //clear form and data
                this.setCache();
                //return to main screen
                document.querySelector('.section_changer[data-section="div_per_edit"][data-type="0"]').click();
            }
        }else{
            this.plib.toast('error','Gerekli Alanları Doldurunuz !');
        }
    }
}

