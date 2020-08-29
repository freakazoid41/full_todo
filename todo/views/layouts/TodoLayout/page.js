
import NavBar       from '../../components/NavBar/component.js'
import BottomBar    from '../../components/BottomBar/component.js'


const TodoLayout = {
    render : async (elm) => {
        const styles = [
            'views/layouts/TodoLayout/page.css'
        ];
         
        //render css elements to dom
        styles.forEach(el=>{
            const link = document.createElement('link');
            link.href = el;
            link.rel  = 'stylesheet';
            link.dataset.type='component';
            document.querySelector('head').appendChild(link);
        });
        //render html to dom
        elm.innerHTML = `<div id="header_container"></div>

                        <div id="page_container">
                            <article> Loading....</article>
                        </div>

                        <div id="footer_container"></div>`;
    },
    after_render: async (referance) => {
             

        const header = new NavBar(document.getElementById('header_container'));
        await header.render();
        await header.afterRender();

        const footer = new BottomBar(document.getElementById('footer_container'));
        await footer.render();
        await footer.afterRender();


        const page = new referance(document.getElementById('page_container'));
        await page.render();
        await page.afterRender();
    }
        
}

export default TodoLayout;