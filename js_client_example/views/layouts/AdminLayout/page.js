import Layout from '../../../bin/parents/layout.js';
import Theme from '../../../assets/theme/theme.js';


import NavBar       from '../../components/NavBar/component.js'
import SideBar    from '../../components/SideBar/component.js'

export default class AdminLayout extends Layout{

    async render(){
        const theme = new Theme();
        

        this.styles = [
            'views/layouts/AdminLayout/page.css?v='+(new Date).getTime()
        ];

        //render layout
        await this.view(` <div class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show" id="sidebar">
                          </div>
                          <div class="c-wrapper c-fixed-components">
                            <header class="c-header c-header-light c-header-fixed c-header-with-subheader" id="headerbar">
                            </header>
                            <div class="c-body" data-layout="AdminLayout" id="page_container">
                            </div>
                          </div>`);
    }

    async redirect(){
        const page = new this.page(document.getElementById('page_container'),null,this.beforeRenderPage);
        await page.render();
        if(this.redirectCallback !== null) this.redirectCallback(this.referance);
    }

    async afterRender(){
        const header = new NavBar(document.getElementById('headerbar'));
        await header.render();

        const sidebar = new SideBar(document.getElementById('sidebar'));
        await sidebar.render();

        //page referance
        const page = new this.page(document.getElementById('page_container'),null,this.beforeRenderPage);
        await page.render();

        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

