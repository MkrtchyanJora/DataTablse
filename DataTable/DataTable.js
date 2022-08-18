class DataTable {
    constructor(colums = [], data = [], { notesPage }) {
        this.colums = colums;
        this.data = data;
        this.originalData = data;
        this.notesPage = notesPage;
        this.start = 0;
        this.end = this.start + this.notesPage;
    };
    createTable() {
        const $dataTableContainer = document.querySelector('.data-tableContener');
        const $table = document.createElement('table');
        this.table = $table;
        $dataTableContainer.appendChild($table);
        this.createThead();
        this.createBody();
        this.renderData();
        this.createPerPage();
        this.pagination();
        this.createSearchForm();
        
    };
    

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        this.colums.forEach((colum) => {
            const $th = document.createElement('th');
            let isReverse;
            $th.setAttribute('data-sort', colum.index);

            $th.addEventListener('click', (e) => {
                const field = e.target.dataset.sort;

              if(!isReverse){
                  if (isNaN(+this.data[0][field])) {
                      this.data.sort((a, b) => a[field].localeCompare(b[field]))
                  }
                  this.data.sort((a, b) => a[field] - b[field]);
                  this.renderData();
                  isReverse = true;

              }
                if (isReverse) {
                    this.data.reverse();
                    this.renderData();
                }
                

            });
            $th.innerHTML = colum.name;
            $tr.appendChild($th);
        });
        $thead.appendChild($tr);
        this.table.appendChild($thead);





    };

    createBody() {
        const $tbody = document.createElement('tbody');
        this.$tbody = $tbody;
        this.table.appendChild($tbody);

    };

    renderData() {
        const $dataTableContainer = document.querySelector('.data-tableContener');
        const $tbody = this.table.querySelector('tbody');
        $tbody.innerHTML = null;
        this.data.slice(this.start, this.end).map((item) => {
            const $tr = document.createElement('tr');

            for (const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
            };

            const $tdDelete = document.createElement('td');
            const $checkboxTd = document.createElement('td');
            const $checkbox = document.createElement('input');
            $checkbox.type = "checkbox";
            $checkboxTd.appendChild($checkbox);
            $tdDelete.setAttribute('data-id', item.id);
            $checkbox.setAttribute('data-id', item.id);
            $tdDelete.className = 'remove';
            $tdDelete.innerHTML = 'Delete';
            $tdDelete.addEventListener('click', (e) => {
                this.data.filter((elem, index) => {

                    if (elem.id == e.target.dataset.id) {
                        this.data.splice(index, 1);
                        this.renderData();
                        this.pagination();
                        const $ul = document.querySelector('ul');
                        $dataTableContainer.removeChild($ul);
                        
                        
                    };
                });
            });

            $tr.appendChild($tdDelete);
            $tr.appendChild($checkboxTd);
            $tbody.appendChild($tr);

        });

    };

    pagination() {
        let self = this;
        const $dataTableContainer = document.querySelector('.data-tableContener');
        const $ul = document.createElement('ul');
        const countItems = Math.ceil(this.data.length / this.notesPage);
        $ul.setAttribute('id', 'pagination');
        $dataTableContainer.appendChild($ul);
        let items = [];

        for (let i = 1; i <= countItems; i++) {
            let $li = document.createElement('li');
            $li.innerHTML = i;
            $ul.appendChild($li);
            items.push($li);
        };

        for (let item of items) {
            item.addEventListener('click', function () {

                let pageNum = this.innerHTML;
                self.start = (pageNum - 1) * self.notesPage;
                self.end = self.start + self.notesPage;
                let newPageContainer = document.querySelector('tbody');
                newPageContainer.innerHTML = null;
                $dataTableContainer.removeChild($ul);
                self.renderData();
                self.pagination();

            });
        };
    };


    createPerPage() {
        const $select = document.createElement('select');
        const $ul = document.getElementById('pagination');

        for (let i = 3; i < 10; i = i + 2) {
            let $option = document.createElement('option');
            $option.innerHTML = i;
            $select.appendChild($option);
        }

        this.table.appendChild($select);
        $select.addEventListener('change', (e) => {
            const $pagination = document.querySelector('#pagination');
            this.notesPage = +e.target.value;
            this.end = this.start + this.notesPage;
            $pagination.remove();
            this.renderData();
            this.pagination();
        });
    };

    createSearchForm() {
        const $ul = document.querySelector('ul');
        const $input = document.createElement('input');
        $input.className = 'search';
        $input.placeholder = 'Search'
        const $dataTableContainer = document.querySelector('.data-tableContener');
        $dataTableContainer.prepend($input);
        $input.addEventListener('input', (e) => {
            let $value = e.target.value;

            if ($value == '') {
                this.data = this.originalData;
            }

            this.data = this.data.filter((elem) => {
                for (let key in elem) {

                    if (elem[key].toString().includes($value)) {
                        return elem;
                    };

                };
            });
            this.renderData();
            this.pagination();
            const $ul = document.querySelector('ul');
            $dataTableContainer.removeChild($ul);

        });

    };

};




export default DataTable;