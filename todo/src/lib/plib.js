class Plib {
    constructor(){
        this.api = 'http://localhost:5002/';
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
            headers: {
               'X-TOKEN':sessionStorage.getItem('user_data') !== 'null' ? JSON.parse(sessionStorage.getItem('user_data'))['token'] : 'none'
            },
        };
        if (rqs['method'] !== 'GET') {
            op.body = fD;
        }
        const rsp = await fetch(this.api+rqs['url'], op).then((response) => {
            //convert to json
            return response.json();
        });
        //in this point check if api is send timeout command 
        if (rsp.command !== undefined) {
            switch (parseInt(rsp.command)) {
                case 0:
                    //this mean token is not valid
                    //this._logout();
                    break;
            }
        }
        return rsp;
    }

    /**
     * manages login / logout transactions
     * @param {bool} type 
     * @param {json} data 
     */
    async login(type=true,data = null){
        sessionStorage.setItem('user_data',data);
        window.location.href = !type ? '/login' : '/admin';
    }

    getClient = () => sessionStorage.getItem('user_data');
}




