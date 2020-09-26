export default class Home{

    constructor(elm,renderCallback = null){
        this.renderCallback = renderCallback;
        this.referance = elm;
        
    }

    loadCss(){
        const styles = [
            'views/pages/Home/page.css?v='+(new Date).getTime()
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
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="card fluid main_card shadow">
                                                    falan boyle
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </section>`;

        await this.afterRender();
    }


    async afterRender(){
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

