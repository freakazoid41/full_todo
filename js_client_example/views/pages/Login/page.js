
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
        
        this.referance.innerHTML = `<div class="container">
                                        <div class="row justify-content-center">
                                            <div class="col-md-12">
                                                <div class="card p-4">
                                                    <div class="card-body">
                                                        <h1>Login</h1>
                                                        <p class="text-muted">Sign In to your account</p>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend"><span class="input-group-text">
                                                                <svg class="c-icon">
                                                                <use xlink:href="/assets/theme/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                                                                </svg></span></div>
                                                            <input required class="form-control elm_login" name="username" type="text" placeholder="Username">
                                                        </div>
                                                        <div class="input-group mb-4">
                                                            <div class="input-group-prepend"><span class="input-group-text">
                                                                <svg class="c-icon">
                                                                <use xlink:href="/assets/theme/vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                                                                </svg></span></div>
                                                            <input required class="form-control elm_login" name="password" type="password" placeholder="Password">
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <button class="btn btn-primary px-4" id="btn_login" type="button">Login</button>
                                                            </div>
                                                            <div class="col-6 text-right">
                                                                <button class="btn btn-link px-0" type="button">Forgot password?</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
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
                    url: '/admin_login',
                    data:obj.obj
                }).then(rsp=>{
                    if(rsp.rsp){
                        this.toast('success','Loggined ..');
                        //set informations to session
                        sessionStorage.setItem('sinfo',JSON.stringify(rsp.data));
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

