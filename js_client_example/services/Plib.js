export default class Plib{
    constructor(){
        this.ReqUrl = '/requestApi';
        this.CdnUrl = 'http://cache.cilogluarge.com';
    }


    /**
     * system request method
     * @param {json object} rqs 
     */
    async request(rqs, file = null) {
        let fD = new FormData();
        for (let key in rqs['data']) {
            fD.append(key, rqs['data'][key]);
        }

        if (file !== null) {
            fD.append('file', file, file.name);
        }
        let op = {
            method: rqs['method'],
        };
        if (rqs['method'] !== 'GET') {
            op.body = fD;
        }
        const rsp = await fetch(rqs['url'], op).then((response) => {
            //convert to json
            return response.json();
        });
        //in this point check if api is send timeout command 
        if (rsp.command !== undefined) {
            switch (parseInt(rsp.command)) {
                case 0:
                    //this mean token is not valid
                    this._logout();
                    break;
            }
        }
        return rsp;
    }

    /**
     * this method will set loading to div
     * @param {string} selector 
     * @param {boolean} event 
     */
    setLoader(selector, event = true) {
        let elms = document.querySelectorAll(selector);
        if (event) {
            document.body.style.pointerEvents = 'none';
            for (let i = 0; i < elms.length; i++) {
                elms[i].classList.add('b-loader');
            }
        } else {
            document.body.style.pointerEvents = '';
            for (let i = 0; i < elms.length; i++) {
                elms[i].classList.remove('b-loader');
            }
        }
    }

    /**
     * this function will ask client to session information 
     */
    async checkSession(){
        if(sessionStorage.getItem('sinfo') === null){
            //ask session  info to client
            return await this.request({
                method: 'POST',
                url: '/src/passage.php?job=data&event=checkSession',
            }).then(rsp => {
                if(rsp.rsp){
                    sessionStorage.setItem('sinfo',JSON.stringify(rsp.data));
                }
                return rsp.rsp;
            });
        }else{
            return true;
        }
    }

    /**
     * Toast message (sweet alert 2)
     * @param {string} type 
     * @param {string} msg 
     */
    toast(type, msg) {
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

        }).fire({
            type: type,
            title: msg,
            heightAuto: true
        });
    }

    /**
     * Clear all items
     * @param {string} type 
     * @param {string} selector 
     */
    clearElements(selector) {
        let elms = document.querySelectorAll(selector);
        for (let i = 0; i < elms.length; i++) {
            switch (elms[i].tagName) {
                case 'SELECT':
                    elms[i].selectedIndex = 0;
                    break;
                case 'LABEL':
                    elms[i].innerHTML='';
                    break;    
                case 'INPUT':
                    if (elms[i].getAttribute('type') === 'radio' || elms[i].getAttribute('type') === 'checkbox') {
                        elms[i].checked = false;
                    } else {
                        elms[i].value = '';
                    }
                    break;
                default:
                    elms[i].value = '';
                    break;
            }
            elms[i].classList.remove('is-invalid');
        }
        //set invisible language inputs
        elms = document.querySelectorAll('.div_lang_row');
        for (let i = 0; i < elms.length; i++) {
            elms[i].style.display = 'none';
        }
    }
}