export default class Plib {
    constructor(){
        this.apiUrl = 'http://localhost:5002/';
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
        const rsp = await fetch(this.apiUrl+rqs['url'], op).then((response) => response.json());
        //in this point check if api is send timeout command 
        /*if (rsp.command !== undefined) {
            switch (parseInt(rsp.command)) {
                case 0:
                    //this mean token is not valid
                    this._logout();
                    break;
            }
        }*/
        return rsp;
    }
}