export default class BottomBar{

    constructor(elm){
        this.referance = elm;
        this.loadCss();
    }

    loadCss(){
        const styles = [
            'views/components/'+this.constructor.name+'/component.css'
        ];
         
        //render css elements to dom
        styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.rel  = 'stylesheet';
            link.dataset.type='component';
            document.querySelector('head').appendChild(link);
        });
    }

    async render(){
        this.referance.innerHTML =`<footer>
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card text-center">
                                                    <p>
                                                        This is my foot. There are many like it, but this one is mine.
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </footer>`;
    }


    async afterRender(){}


}

