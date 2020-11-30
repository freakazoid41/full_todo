import Utils  from './services/Utils.js'
import Plib   from './services/Plib.js'


// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/':{
        page:'Home',
        layout:'AdminLayout'
    },
    '/home':{
        page:'Home',
        layout:'AdminLayout'
    },
    '/settings':{
        page:'Settings',
        layout:'AdminLayout'
    },
    '/persons':{
        page:'Persons',
        layout:'AdminLayout'
    },
    '/items':{
        page:'Items',
        layout:'AdminLayout'
    },
    '/transactions':{
        page:'Transactions',
        layout:'AdminLayout'
    },
    '/login':{
        page:'Login',
        layout:null
    }
};

//this method will clear main debris of page
/*const clearDebris = async ()=>{
    
    const clearCss = async () =>{
        //clean old css files if exist
        document.querySelectorAll('link[data-type="page"]').forEach(el=>{
            el.outerHTML = '';
        });
    }
    const clearJs = async () =>{
        //clean old layout js files if exist
        document.querySelectorAll('script[data-type="page"]').forEach(el=>{
            el.outerHTML = '';
        });
    }

    await Promise.all([clearJs(), clearCss()]);
}*/

//this method will clear layout debris of page
/*const clearLayoutDebris= async ()=>{
    const clearCss = async () =>{
        //clean old css files if exist
        document.querySelectorAll('link[data-type="layout_component"]').forEach(el=>{
            el.outerHTML = '';
        });
    }
    const clearJs = async () =>{
        //clean old layout js files if exist
        document.querySelectorAll('link[data-type="layout"]').forEach(el=>{
            el.outerHTML = '';
        });
    }

    await Promise.all([clearJs(), clearCss()]);
}*/

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

    
    //check session here and redirect to login if not setted !!
    const session = (await (new Plib).checkSession());
    if(session === true || pageObj.page === 'Login'){
        //import page
        let page = await import('./views/pages/'+pageObj.page+'/page.js');
        
        //check if has layout
        if(pageObj.layout !== null){
            //import layout
            let layout = await import('./views/layouts/'+pageObj.layout+'/page.js');
            //build layout
            layout = new layout.default(container,page.default,null,null,Utils.clearDebris('page'),Utils.clearDebris('layout'));
            //check layout is diffrent 
            if(document.querySelector('[data-layout="'+pageObj.layout+'"]')== null){
                //render page with layout
                layout.render();
            }else{
                //redirect page
                layout.redirect();
            }
        }else{
            page = new page.default(container,null,Utils.clearDebris('page'));
            //render page
            page.render();
        }
    }else{
        //import page
        /*let page = await import('./views/pages/Login/page.js');
        page = new page.default(container);
        page.render();
        console.log('Amcık nereye gidiyon sen ?? ..')*/
        window.location.href = '/#/login';
    }
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);