import Categories    from './Categories/component.js'

export default class Settings{

    constructor(elm,renderCallback = null){
        this.renderCallback = renderCallback;
        this.referance = elm;
        
    }

    loadCss(){
        const styles = [
            'views/pages/Settings/page.css?v='+(new Date).getTime()
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
                                            <div class="col-md-6" id="categories_container">
                                                <!--<div class="card fluid shadow">
                                                    <div class="section head_section">
                                                        <h4>Item Categories</h4>
                                                        <button type="button" class="secondary ripple">
                                                            <i class="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                    <div class="section"></div>
                                                </div>-->
                                            </div>
                                            <div class="col-md-6">
                                                <div class="card fluid shadow">
                                                    Settings
                                                </div>
                                            </div>
                                        </div>
                                    </section>`;

        await this.afterRender();
    }


    async afterRender(){
        //categories referance
        const page = new Categories(document.getElementById('categories_container'));
        await page.render();
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

