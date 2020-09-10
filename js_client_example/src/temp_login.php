<button type='button' id="btn_login">Login Yap Beni !!</button>




<script>
    /**
     * this function will open new tab with poste parmeters
     * exp. openTab('POST', 'http://biber.picklecan.loc/spec/', {"Tedarik":"1523546", "Region":"TR"},'_blank');
     * @param {strng} verb
     * @param {string} url
     * @param {json} data
     * @param {string} target
     */
    function openTab(verb, url, data, target) {
        let form = document.createElement("form");
        form.action = url;
        form.method = verb;
        form.target = target || "_self";
        if (data) {
            for (var key in data) {
                var input = document.createElement("textarea");
                input.name = key;
                input.value = typeof data[key] === "object" ?
                    JSON.stringify(data[key]) :
                    data[key];
                form.appendChild(input);
            }
        }
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    document.getElementById('btn_login').addEventListener('click',()=>{
        openTab('POST','/src/passage.php?job=login',{
            username:'freakazoid41',
            password:'602360',
        },'_BLANK');
    })

</script>