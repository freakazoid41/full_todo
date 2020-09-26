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
        this.referance.innerHTML = `<header class="shadow">
                                        <a href="/#/" class="logo">Logo</a>
                                        <button data-url="/#/settings" class="header_btn">Settings</button>
                                        <button data-url="/#/persons" class="header_btn">Persons</button>
                                        <button data-url="/#/items" class="header_btn">Items</button>
                                        <button data-url="/#/transactions" class="header_btn">Transactions</button>
                                    </header>`;
        await this.afterRender();
    }


    async afterRender(){
        await this.setEvents();
    
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


    async setEvents(){
        document.body.addEventListener('click',e=>{
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
    }

}

