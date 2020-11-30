import Layout from '../../../bin/parents/layout.js';
import Theme from '../../../assets/theme/theme.js';


import NavBar       from '../../components/NavBar/component.js'
import BottomBar    from '../../components/BottomBar/component.js'

export default class AdminLayout extends Layout{

    async render(){
        const theme = new Theme();
        

        this.styles = [
            'views/layouts/AdminLayout/page.css?v='+(new Date).getTime()
        ];

        //render layout
        await this.view(` <div id="header_container"></div>

                                    <div data-layout="AdminLayout" id="page_container">
                                        <article> Loading....</article>
                                    </div>

                                    <div id="footer_container"></div>`);
    }

    async redirect(){
        const page = new this.page(document.getElementById('page_container'),null,this.beforeRenderPage);
        await page.render();
        if(this.redirectCallback !== null) this.redirectCallback(this.referance);
    }

    async afterRender(){
        const header = new NavBar(document.getElementById('header_container'));
        await header.render();

        const footer = new BottomBar(document.getElementById('footer_container'));
        await footer.render();

        //page referance
        const page = new this.page(document.getElementById('page_container'),null,this.beforeRenderPage);
        await page.render();

        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

