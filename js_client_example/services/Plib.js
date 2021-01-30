export default class Plib{
    constructor(){
        //this.CdnUrl = 'http://cache.cilogluarge.com';
    }


    /**
     * system request method
     * @param {json object} rqs 
     */
    async request(rqs, file = null,isApi = true) {
        
        //set fetch options
        let op = {
            method: rqs['method'],
        };

        if(op.method === 'PATCH' || op.method === 'delete'){
            //because patch and delete methods will send url encoded data !!
            op.headers = { 'Content-Type':'application/x-www-form-urlencoded' };
            op.body = new URLSearchParams(rqs.data);
        }else{
            //post will send form data
            if(rqs['method'] !== 'GET') {
                //create form data
                const fD = new FormData();
                for (let key in rqs['data']) {
                    fD.append(key, rqs['data'][key]);
                }

                if (file !== null) {
                    fD.append('file', file, file.name);
                }
                op.body = fD;
            }
        }

        
        //send fetch
        const rsp = await fetch(isApi ? '/src/passage.php?url='+rqs['url'] : rqs['url'], op).then((response) => {
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
        if(sessionStorage.getItem('sinfo') === null || sessionStorage.getItem('sinfo') === '-1'){
            //ask session  info to client
            /*return await this.request({
                method: 'POST',
                url: '/src/passage.php?job=data&event=checkSession',
            }).then(rsp => {
                if(rsp.rsp){
                    sessionStorage.setItem('sinfo',JSON.stringify(rsp.data));
                }
                return rsp.rsp;
            });*/
            return false;
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
            icon: type,
            title: msg,
            heightAuto: true
        });
    }

    /**
     * Clear all items
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

    /**
     * Get form element with validation
     * @param {string} selector 
     */
    checkForm(selector){
        const rsp = {
            obj:{},
            valid:true
        }
        //get elements
        const elms = document.querySelectorAll(selector);
        for(let i=0;i<elms.length;i++){
            //validate
            if(elms[i].value.trim() !== ''){
                rsp.obj[elms[i].name] = elms[i].value;
                elms[i].classList.remove('is-invalid');
            }else{
                if(elms[i].required){
                    elms[i].classList.add('is-invalid');
                    rsp.valid = false;
                }
            }
        }
        return rsp;
    }


    /**
     * this method will format money decimal
     * @param {float} amount 
     * @param {int} decimalCount 
     * @param {string} decimal 
     * @param {string} thousands 
     */
    formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      
            const negativeSign = amount < 0 ? "-" : "";
        
            const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            const j = (i.length > 3) ? i.length % 3 : 0;
      
            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
          console.log(e)
        }
    };
}