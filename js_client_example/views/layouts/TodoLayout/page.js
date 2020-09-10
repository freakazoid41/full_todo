
import NavBar       from '../../components/NavBar/component.js'
import BottomBar    from '../../components/BottomBar/component.js'

export default class TodoLayout{

    constructor(elm,page,renderCallback = null,redirectCallback = null){
        this.renderCallback = renderCallback;
        this.redirectCallback = redirectCallback;
        this.page = page;
        this.referance = elm;
        
    }

    loadCss(){
        const styles = [
            'views/layouts/TodoLayout/page.css?v='+(new Date).getTime()
        ];
         
        //render css elements to dom
        styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.rel  = 'stylesheet';
            link.dataset.type='layout';
            document.querySelector('head').appendChild(link);
        });
    }

    async render(){
        this.loadCss();
        this.referance.innerHTML =` <div id="header_container"></div>

                                    <div data-layout="TodoLayout" id="page_container">
                                        <article> Loading....</article>
                                    </div>

                                    <div id="footer_container"></div>`;
        
        await this.afterRender();
    }

    async redirect(){
        const page = new this.page(document.getElementById('page_container'));
        await page.render();
        if(this.redirectCallback !== null) this.redirectCallback(this.referance);
    }

    async afterRender(){
        const header = new NavBar(document.getElementById('header_container'));
        await header.render();

        const footer = new BottomBar(document.getElementById('footer_container'));
        await footer.render();

        //page referance
        const page = new this.page(document.getElementById('page_container'));
        await page.render();

        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

