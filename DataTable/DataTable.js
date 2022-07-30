class DataTable {
    constructor(colums = [], data = []) {
        this.colums = colums;
        this.data = data;
    };
    createTable() {
        const $table = document.createElement('table');
        this.table = $table;
        const $dataTableContener = document.querySelector('.data-tableContener');
        $dataTableContener.appendChild($table);
        this.createThead();
        const $tbody = this.createBody();
        $table.appendChild($tbody);
        const $trs = this.renderData();
        console.log($trs);
        $trs.forEach(($tr) => {
            $tbody.appendChild($tr);
        });
        const $selects = this.createSelect()
        $table.before($selects)

        $selects.onchange = rowCounte
        function rowCounte(e) {
            let neil = poginetion.querySelectorAll('.list');
            neil.forEach((n) => {
                n.remove()
            })
            let limit = parseInt(e.target.value);
            displayPage(limit)

        }
        let $array = [];
        for (let i = 0; i < $trs.length; i++) {
            $array.push($trs[i])
        }

        function displayPage(limit) {
            $tbody.innerHTML = '';
            for (let i = 0; i < limit; i++) {

                $tbody.appendChild($array[i])
                buttonGenerator(limit)
            }





        }
        displayPage(3)

        function buttonGenerator(limit) {
            const noftr = $array.length;
            if (noftr <= limit) {

                poginetion.style.display = 'none'
            }
            else {
                poginetion.style.display = 'flex'
                const noPage = Math.ceil(noftr / limit)

                for (let i = 1; i <= noPage; i++) {
                    const $li = document.createElement('li');
                    $li.className = 'list';
                    const $a = document.createElement('a');
                    $a.href = '#';
                    $a.setAttribute('data-page', i)
                    $li.appendChild($a);
                    $a.innerHTML = i
                    poginetion.insertBefore($li, poginetion.querySelector('.next'));

                    $a.onclick = e => {
                        let x = e.target.getAttribute('data-page');
                        $tbody.innerHTML = ''
                        x--;
                        let start = limit * x;
                        let end = start + limit;
                        let page = $array.slice(start, end);

                        for (let i = 0; i < page.length; i++) {

                            let item = page[i];
                            $tbody.appendChild(item)
                        }
                    }
                }
            }
            let z = 0
            function nextElement() {
                if (this.id === 'next') {
                    z === $array.length - limit ? (z = 0) : (z += limit);
                }

                if (this.id === 'prev') {
                    z === 0 ? $array.length - limit : (z -= limit);
                }

                $tbody.innerHTML = ''
                for (let c = z; c < z + limit; c++) {
                    $tbody.appendChild($array[c]);
                }

            }
            document.getElementById('prev').onclick = nextElement;
            document.getElementById('next').onclick = nextElement;
        }










    };


    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        this.colums.forEach((colum) => {
            const $th = document.createElement('th');
            $th.innerHTML = colum;
            $tr.appendChild($th);
        });
        $thead.appendChild($tr);
        this.table.appendChild($thead);





    };

    createBody() {
        const $tbody = document.createElement('tbody');
        return $tbody;

    };

    renderData() {
        return this.data.map((item) => {
            let $tr = document.createElement('tr');
            for (let key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);


            };




            return $tr;
        });
    };


    createSelect() {
        const $select = document.createElement('select')
        $select.className = 'select'
        const $trs = this.renderData()
        const $tbody = this.createBody()
        for (let i = 1; i <= 5; i++) {
            let $option = document.createElement('option')
            $option.value = i
            $option.innerHTML = i
            $select.appendChild($option)



        }






        return $select


    };




















};


let poginetion = document.querySelector('.paginettion')






export default DataTable;