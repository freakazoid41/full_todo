export default class SideBar{

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
        this.referance.innerHTML = `    <div class="c-sidebar-brand d-lg-down-none">
                                            <svg class="c-sidebar-brand-full" width="118" height="46" alt="CoreUI Logo">
                                                <use xlink:href="assets/brand/coreui.svg#full"></use>
                                            </svg>
                                            <svg class="c-sidebar-brand-minimized" width="46" height="46" alt="CoreUI Logo">
                                                <use xlink:href="assets/brand/coreui.svg#signet"></use>
                                            </svg>
                                        </div>
                                        <ul class="c-sidebar-nav">
                                            <li class="c-sidebar-nav-item"><a class="c-sidebar-nav-link" href="index.html">
                                                <svg class="c-sidebar-nav-icon">
                                                    <use xlink:href="/assets/theme/vendors/@coreui/icons/svg/free.svg#cil-speedometer"></use>
                                                </svg> Dashboard<span class="badge badge-info">NEW</span></a></li>
                                            <li class="c-sidebar-nav-title">Falan</li>
                                            <li class="c-sidebar-nav-item">
                                                <a class="c-sidebar-nav-link" href="/#/persons">
                                                    <svg class="c-sidebar-nav-icon">
                                                        <use xlink:href="/assets/theme/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                                                    </svg> Kişiler
                                                </a>
                                            </li>
                                        </ul>
                                        <button class="c-sidebar-minimizer c-class-toggler" type="button" data-target="_parent" data-class="c-sidebar-minimized"></button>`;
        await this.afterRender();
    }


    async afterRender(){
        await this.setEvents();
    
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


    async setEvents(){
        //listen menu opens
        const toggles = document.querySelectorAll('.c-sidebar-nav-dropdown-toggle');
        for(let i=0;i<toggles.length;i++){
            toggles[i].addEventListener('click',e=>{
                toggles[i].parentNode.classList.toggle('c-show');
            });
        }

        /*document.body.addEventListener('click',e=>{
            if(e.target.classList.contains('header_btn')){
                window.location.href = e.target.dataset.url;
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

        //logout
        document.getElementById('i_logout').addEventListener('click',()=>{
            sessionStorage.setItem('sinfo','-1');
            window.location.href = '/src/passage.php?job=logout';
        });*/
    }

}

