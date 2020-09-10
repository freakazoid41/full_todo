import Plib from '../../../services/Plib.js';
export default class Help extends Plib{

    constructor(elm,renderCallback = null){
        super();
        this.renderCallback = renderCallback;
        this.referance = elm;
    }

    loadCss(){
        const styles = [
            'views/pages/Help/page.css?v='+(new Date).getTime(),
        ];
         
        //render css elements to dom
        styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.dataset.type='page';
            link.rel  = 'stylesheet';
            document.querySelector('head').appendChild(link);
        });
    }

    async render(){
        this.loadCss();
        this.referance.innerHTML = `<section class="main_section fade-in">
                                        <div class="card shadow main_card">
                                            <div class="row h-100">
                                                <div class="col-4">
                                                    <div class="hide-scr form_div">
                                                        <h3 class="text-center" style="padding-top: 36px;">Bilgilendirme Formu</h3>
                                                        <div class="row-1">
                                                            <div class="col">
                                                                <label class="text-center">Başlık</label>
                                                                <input required name="title" type="text" class="elm_form elm_feed" placeholder="Falan Sorunu">
                                                            </div>
                                                            <div class="col">
                                                                <label class="text-center">Sorun Kategori</label>
                                                                <select required name="category_id" class="elm_form elm_feed">
                                                                    <option value="1">Sistem Hatası</option>
                                                                    <option value="2">Veri Hatası</option>
                                                                </select>
                                                            </div>
                                                            <div class="col">
                                                                <label class="text-center">Sorun Açıklaması</label>
                                                                <textarea required name="note" class="elm_form elm_feed" placeholder="Falan Boyle Gibi Gereksiz.."></textarea>
                                                            </div>
                                                            <div class="col">
                                                                <label class="text-center">Ekran Görüntüsü</label>
                                                                <input id="feed_file" type="file" class="elm_form elm_feed" name="l_file">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row ns">
                                                        <button id="btn_save" type="button" class="button button-outline button-block">Kaydet</button>
                                                    </div>
                                                </div>
                                                <div class="col-8">
                                                    <div style="height:5vh;">
                                                        <div class="row-4 ns end middle">
                                                            <div class="col">
                                                                <input name="title" type="text" class="in_search" placeholder="Ara :">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="height:55vh;overflow: auto;border-left:1px solid whitesmoke;">
                                                        <table style="padding:10px;font-size:12px">
                                                            <thead>
                                                            <tr>
                                                                <th>Başlık</th>
                                                                <th>Durum</th>
                                                                <th>Görevli</th>
                                                                <th>Kategori</th>
                                                                <th>Tarih</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody id="tbl_feedback">
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="table_btns">
                                                        <span id="btn_table_list">
                                                        
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>`;

        this.afterRender();
    }


    async afterRender(){
        if(this.renderCallback !== null) this.renderCallback(this.referance);
        console.log('rendered')
        this.buildPage();
        this.setEvents();

    }


    async setEvents(){
        //pagination
        document.getElementById('btn_table_list').addEventListener('click',async e=>{
            if(e.target.classList.contains('btn_page')){
                await this.buildFTable(parseInt(e.target.dataset.page),20);
            }
        });

        //search bars
        document.querySelectorAll('.in_search').forEach(el=>{
            el.addEventListener('keyup',e=>{
                //build table
                this.buildFTable(1,20,e.target);
            });
        });

        //save form
        document.getElementById('btn_save').addEventListener('click',e=>{
            Swal.fire({
                title: 'Eminmisiniz ?',
                text: "Talebiniz işleme alınacaktır !",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Gönder !',
                cancelButtonText:'Kapat'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.saveForm();
                }
            });
        });
    }


    async buildPage(){
        console.log('build started');
        //build languages
        await this.getLanguages();
        //build table
        this.buildFTable(1,20);
    }

    /**
     * this method will set feedback list
     * @param {int} start 
     * @param {int} size 
     */
    async buildFTable(page=1,size=20,filter = null){
        const buttons = document.getElementById('btn_table_list');
        const table = document.getElementById('tbl_feedback');
        this.setLoader('.main_card');
        let query = {
            model: 'sys_feedback',
            size:size,
            page:page
        }
        //add filter to model
        if(filter !== null) query =
        {
            ...query,
            ...{
                filters:JSON.stringify(
                [
                    {
                        value : filter.value,
                        field : 'all',
                        type  : 'like'
                    }
                ])
            }
        };


        await this.request({
            method: 'POST',
            url: '/src/passage.php?job=data&event=_getList',
            data: query
        }).then(rsp => {
            table.innerHTML = '';
            if(rsp.data.length>0){
                for(let i=0;i<rsp.data.length;i++){
                    let color = '';
                    switch(parseInt(rsp.data[i].status)){
                        case 1:
                            color = 'rgb(255, 193, 7)';//metarial yellow
                            break;
                        case 2:
                            color = 'rgb(139, 195, 74)';//metarial green
                            break; 
                        case 3:
                            color = 'tomato'; //metarial red
                            break;        
                    }
                    const s_icon = '<i class="fa fa-dot-circle-o" style="color:'+color+'"></i>';

                    table.innerHTML += `<tr>
                                            <td>${rsp.data[i].title}</td>
                                            <td>${this.status[parseInt(rsp.data[i].status)] +' '+ s_icon}</td>
                                            <td>${String(rsp.data[i].fixer) == 'null' ? 'Atanmadı' : rsp.data[i].fixer}</td>
                                            <td>${rsp.data[i].category}</td>
                                            <td>${moment(rsp.data[i].created_at,'YYYY-MM-DD').format('DD.MM.YYYY')}</td>
                                        </tr>`;
                }
                //set buttons
                let start = 1;
                let end = 7;
                if(page  > 5){
                    start = page-3;
                    end = page+3
                }
                buttons.innerHTML = '';
                for(let i=start;i<=end;i++){
                    buttons.innerHTML += '<button data-page="'+i+'" class="button button-outline btn_page '+(i === parseInt(page) ? 'current' : '')+'" type="button">'+i+'</button>';
                    if(i === parseInt(rsp.last_page)) break;
                }
            }
        });
        this.setLoader('.main_card',false);
    }


    //#region helper
    async getLanguages(){
        /*this.status = [
            await this._getLanguage('key_op_waiting'),
            await this._getLanguage('key_op_wip'),
            await this._getLanguage('key_op_fixed'),
            await this._getLanguage('key_op_failed')
        ];*/
        this.status = [
            'Bekleniyor',
            'Çalışılıyor',
            'Düzeltildi',
            'Başarısız Oldu'
        ];
    }

    //#endregion

    //#region transactions
    async saveForm(){
        
        let obj = {};
        let valid = true;
        const file = document.getElementById('feed_file').files[0];
        const elms = document.querySelectorAll('.elm_feed');
        for(let i=0;i<elms.length;i++){
            if(elms[i].required && elms[i].value.trim() === ''){
                elms[i].classList.add('is-invalid');
                valid = false;
            }else{
                if(elms[i].name !== null && elms[i].name.trim() != '' && elms[i].type!=='file') obj[elms[i].name] = elms[i].value;
                elms[i].classList.remove('is-invalid');
            }
        }

        if(valid){
            this.setLoader('.main_card');
            //send form
            await this.request({
                method:'POST',
                url: '/src/passage.php?job=event',
                data:{
                    event : 'add',
                    model: 'sys_feedback',
                    data: JSON.stringify(obj)
                }
            },file!== undefined ? file : null).then(rsp=>{
                if(rsp.rsp){
                    //clean form 
                    this.clearElements('elm_form');
                    //build table
                    this.buildFTable(1,20);
                    this.toast('success','Yardım Talebiniz Alınmıştır ..')
                }else{
                    this.toast('error','Hata Oluştu !!')
                }
            });
            this.setLoader('.main_card',false);
        }else{
            this.toast('error','Boş Alanları Doldurunuz !!')
        }
    }
    //#endregion

}

