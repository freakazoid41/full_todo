"use strict";

import TodoLayout  from './views/layouts/TodoLayout/page.js';
import Home        from './views/pages/Home/page.js'
import About       from './views/pages/About/page.js'





import Utils        from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/':{
        page:Home,
        layout:TodoLayout
    },
    '/about':{
        page:About,
        layout:TodoLayout
    },
    '/login':{
        page:'Login',
        layout:null

    }



    /*'/'             : Home
    , '/about'      : About
    , '/p/:id'      : PostShow
    , '/register'   : Register*/
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    //clean old css files if exist
    document.querySelectorAll('link[data-type="component"]').forEach(el=>{
        el.outerHTML = '';
    });



    let container = null || document.getElementById('div_container');
    // Lazy load view element:
    /*const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');*/
    
    // Render the Header and footer of the page
    /*header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();*/


    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const pageObj = routes[parsedURL] ? routes[parsedURL] : Error404;
    //ask if page layout is null
    if(pageObj.layout !== null){
        const layout = new pageObj.layout(container,pageObj.page);
        layout.render();
        
    }else{
        /*await pageObj.page.render(container);
        await pageObj.page.after_render();*/
    }
  

    /*console.log(request);
    content.innerHTML = await page.render();
    await page.after_render();*/
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
