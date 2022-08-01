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



        ////////////////////////////////////////
        const $selects = this.createSelect()
        $table.before($selects)

        $selects.onchange = rowCounte
        function rowCounte(e) {
            let neil = poginetion.querySelectorAll('.list');
            neil.forEach(e => e.remove())

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

            }
            buttonGenerator(limit)




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

            let z = 0;
            function nextElement() {
                if (this.id == 'next') {
                    z == $array.length - limit ? (z = 0) : (z += limit);
                }

                if (this.id == 'prev') {
                    z == 0 ? $array.length - limit : (z -= limit);
                }

                $tbody.innerHTML = '';
                for (let c = z; c < z + limit; c++) {
                    $tbody.appendChild($array[c])
                }


            }
            document.getElementById('prev').onclick = nextElement
            document.getElementById('next').onclick = nextElement
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
        let $option1 = document.createElement('option')
        $option1.value = '1'
        $option1.innerHTML = 1
        let $option2 = document.createElement('option')
        $option2.value = '2'
        $option2.innerHTML = 2
        let $option3 = document.createElement('option')
        $option3.value = '3'
        $option3.selected = 3
        $option3.innerHTML = 3
        let $option4 = document.createElement('option')
        $option4.value = '4'
        $option4.innerHTML = 4

        $select.appendChild($option1)
        $select.appendChild($option2)
        $select.appendChild($option3)
        $select.appendChild($option4)











        return $select


    };
























};


let poginetion = document.querySelector('.paginettion')





export default DataTable;