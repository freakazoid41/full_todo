
import Plib from '../../../services/Plib.js';

export default class Login extends Plib{

    constructor(elm,renderCallback = null,beforeRender = null){
        super();
        this.beforeRender = beforeRender
        this.renderCallback = renderCallback;
        this.referance = elm;
    }

    loadCss(){
        const styles = [
            'views/pages/Login/page.css?v='+(new Date).getTime()
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
        this.referance.innerHTML = '';
        //trigger before render if is exist 
        if(this.beforeRender !== null) await this.beforeRender();
        this.loadCss();
        //render page
        this.referance.innerHTML = `<section class="container">
                                        <div class="row login_row">
                                            <div class="col-sm-4">
                                                <div class="card fluid shadow">
                                                    <div class="section">
                                                        <fieldset>
                                                            <legend>System Login</legend>
                                                            <div class="row">
                                                                <div class="col-md-12 input-group vertical text-center">
                                                                    <label for="username">Username</label>
                                                                    <input required class="elm_login" type="text" name="username" placeholder="Username"/>
                                                                </div>
                                                                <div class="col-md-12 input-group vertical text-center">
                                                                    <label for="username">Password</label>
                                                                    <input required class="elm_login" type="text" name="password" placeholder="Password"/>
                                                                </div>
                                                                <div class="col-md-12 input-group vertical">
                                                                    <button type="button" class="secondary ripple" id="btn_login">Login</button>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section>`;

        await this.afterRender();
    }


    async afterRender(){
        //trigger events
        await this.pageEvents();




        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


    async pageEvents(){
        //login event
        document.getElementById('btn_login').addEventListener('click',async e=>{
            //check valid
            const obj = this.checkForm('.elm_login');
            if(obj.valid){
                this.setLoader('body');
                //send form
                await this.request({
                    method:'POST',
                    url: '/src/passage.php?job=login',
                    data:obj.obj
                }).then(rsp=>{
                    if(rsp.rsp){
                        this.toast('success','Loggined ..')
                        window.location.href = '/#/home';
                    }else{
                        this.toast('error','Error Happend !!')
                    }
                });
                this.setLoader('body',false);
            }else{
                this.toast('error','User Not Exist !!')
            }
        });
    }


}

