const Utils = { 
    // --------------------------------
    //  Parse a url and break it into resource, id and verb
    // --------------------------------
    parseRequestURL : () => {

        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    // --------------------------------
    //  Simple sleep implementation
    // --------------------------------
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    //cleaning debris from html for ol css filesasync ()=>{
    clearDebris : (type = 'page' )=>{
        const debris = {
            css:()=>{},
            js:()=>{}
        }
        if(type == 'page'){
            debris.css = async () =>{
                //clean old css files if exist
                document.querySelectorAll('link[data-type="page"]').forEach(el=>{
                    el.outerHTML = '';
                });
            }
            debris.js = async () =>{
                //clean old layout js files if exist
                document.querySelectorAll('script[data-type="page"]').forEach(el=>{
                    el.outerHTML = '';
                });
            }
        }else{
            debris.css = async () =>{
                //clean old css files if exist
                document.querySelectorAll('link[data-type="layout_component"]').forEach(el=>{
                    el.outerHTML = '';
                });
            }
            debris.js = async () =>{
                //clean old layout js files if exist
                document.querySelectorAll('link[data-type="layout"]').forEach(el=>{
                    el.outerHTML = '';
                });
            }
        }
        return async () => { await Promise.all([debris.js, debris.css]) };
    }
}

export default Utils;