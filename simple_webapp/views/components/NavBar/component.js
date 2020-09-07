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
        this.referance.innerHTML = `<div class="row ns div_header">
                                        <div class="col">
                                            <a href="/#/" class="header_btn">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Home</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a href="/#/about" class="header_btn">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <span class="header_btn">
                                                <i class="fa fa-cog" aria-hidden="true"></i>
                                                <span>Ayarlar</span>
                                            </span>
                                        </div>
                                    </div>`;
        await this.afterRender();
    }


    async afterRender(){
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

