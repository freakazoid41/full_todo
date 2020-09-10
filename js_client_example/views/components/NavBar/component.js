export default class NavBar{

    constructor(elm,renderCallback = null){
        this.renderCallback = renderCallback;
        this.referance = elm;
    }

    loadCss(){
        const styles = [
            'views/components/'+this.constructor.name+'/component.css?v='+(new Date).getTime()
        ];
         
        //render css elements to dom
        styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.rel  = 'stylesheet';
            link.dataset.type='layout_component';
            document.querySelector('head').appendChild(link);
        });
    }

    async render(){
        this.loadCss();
        this.referance.innerHTML = `<div class="row ns div_header shadow" id="div_header">
                                        <div class="col">
                                            <a href="/#/" class="header_btn disabled_area">
                                                <i class="fa fa-tachometer" aria-hidden="true"></i>
                                                <span>Anasayfa</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn disabled_area">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn disabled_area">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn disabled_area">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <a href="/#/help" class="header_btn">
                                                <i class="fa fa-question" aria-hidden="true"></i>
                                                <span>Yardım</span>
                                            </a>
                                        </div>
                                    </div>`;
        await this.afterRender();
    }


    async afterRender(){
        if(this.renderCallback !== null) this.renderCallback(this.referance);

        this.setEvents();
    }


    async setEvents(){
        document.getElementById('div_header').addEventListener('click',e=>{
            if(e.target.classList.contains('header_btn')){
                console.log(e.target)
                const elms = document.querySelectorAll('.header_btn');
                for(let i=0;i<elms.length;i++){
                    if(elms[i] === e.target){
                        e.target.classList.add('head_selected');
                    }else{
                        elms[i].classList.remove('head_selected');
                    }
                }
            }
        });
    }

}

