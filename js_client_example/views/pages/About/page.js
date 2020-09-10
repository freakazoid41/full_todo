export default class About{

    constructor(elm,renderCallback = null){
        this.renderCallback = renderCallback;
        this.referance = elm;
        
    }

    loadCss(){
        const styles = [
            'views/pages/About/page.css?v='+(new Date).getTime()
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
        this.referance.innerHTML = `<section class="">
                                        <h1> About </h1>
                                        <ul>
                                            ${ [1,2,3,4,5].map(post => 
                                                /*html*/`<li><a href="javascript:;">${post}</a></li>`
                                                ).join('\n ')
                                            }
                                        </ul>
                                    </section>`;
        await this.afterRender();
    }


    async afterRender(){
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

