export default class Component{
    constructor(elm,renderCallback = null){
        this.renderCallback = renderCallback;
        this.referance = elm;
    }

    /**
     * this method will load css files for page from local css container
     */
    async loadCss(){
        //render css elements to dom
        this.styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.dataset.type='page';
            link.rel  = 'stylesheet';
            document.querySelector('head').appendChild(link);
        });
    }

    /**
     * this method will be return view to html target
     */
    async view(view){
        //remove inside of referance 
        this.referance.innerHTML = '';

        //render css files
        await this.loadCss();

        //render page
        this.referance.innerHTML = view;

        //trigger after page render event
        await this.afterRender();
    }
}