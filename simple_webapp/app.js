import Utils        from './services/Utils.js'

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

    const container = null || document.getElementById('div_container');
   


    // Get the parsed URl from the addressbar
    const request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    const parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    const pageObj = routes[parsedURL] ? routes[parsedURL] : Error404;
    //ask if page layout is null
    if(pageObj.layout !== null){
        //import page
        const page = await import('./views/pages/'+pageObj.page+'/page.js');

        //import layout
        let layout = await import('./views/layouts/'+pageObj.layout+'/page.js');
        layout = new layout.default(container,page.default)
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
