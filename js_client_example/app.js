import Utils        from './services/Utils.js'
import Plib        from './services/Plib.js'


// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/':{
        page:'Home',
        layout:'TodoLayout'
    },
    '/about':{
        page:'About',
        layout:'TodoLayout'
    },
    '/help':{
        page:'Help',
        layout:'TodoLayout'
    },
    '/login':{
        page:'Login',
        layout:null
    }
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    const container = null || document.getElementById('div_container');
    
    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const pageObj = routes[parsedURL] ? routes[parsedURL] : Error404;

    //clean old css files if exist
    document.querySelectorAll('link[data-type="page"]').forEach(el=>{
        el.outerHTML = '';
    });
    //clean old layout js files if exist
    document.querySelectorAll('script[data-type="page"]').forEach(el=>{
        el.outerHTML = '';
    });



    //check session here and redirect to login if not setted !!
    const session = (await (new Plib).checkSession());
    console.log(session);
    if((await (new Plib).checkSession()) === true){
        //import page
        let page = await import('./views/pages/'+pageObj.page+'/page.js');
        
        //check layout is diffrent 
        if(document.querySelector('[data-layout="'+pageObj.layout+'"]')== null){
            //clean old css files if exist
            document.querySelectorAll('link[data-type="layout_component"]').forEach(el=>{
                el.outerHTML = '';
            });

            //clean old layout css files if exist
            document.querySelectorAll('link[data-type="layout"]').forEach(el=>{
                el.outerHTML = '';
            });

            //ask if page layout is null
            if(pageObj.layout !== null){
                //import layout
                let layout = await import('./views/layouts/'+pageObj.layout+'/page.js');
                layout = new layout.default(container,page.default)
                layout.render();
            }else{
                page = new page.default(container);
                page.render();
            }
        }else{

            //import layout
            let layout = await import('./views/layouts/'+pageObj.layout+'/page.js');
            layout = new layout.default(container,page.default)
            layout.redirect();
        }
    }else{
        console.log('logine geldim ben..')
        //import login page
        /*let page = await import('./views/pages/Login/page.js');
        page = new page.default(container);
        page.render();*/
        //window.location.href = 'http://lb.ciloglunet.com';
    }
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);