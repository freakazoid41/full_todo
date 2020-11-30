import Page    from '../../../bin/parents/page.js';

import Categories    from './Categories/component.js';
import Socials       from './Socials/component.js';


export default class Settings extends Page{

    async render(){
        this.styles = [
            'views/pages/Settings/page.css?v='+(new Date).getTime()
        ]

        //render page
        await this.view(`<section class="main_section fade-in">
                                        <div class="row">
                                            <div class="col-md-6" id="categories_container">
                                               
                                            </div>
                                            <div class="col-md-6" id="socials_container">
                                               
                                            </div>
                                        </div>
                                    </section>`);
    }


    async afterRender(){
        //categories referance
        await (new Categories(document.getElementById('categories_container'))).render();
        //socials referance
        await (new Socials(document.getElementById('socials_container'))).render();
        if(this.renderCallback !== null) this.renderCallback(this.referance);
    }


}

