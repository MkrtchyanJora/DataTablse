import DataTable from "./DataTable.js";

const colums = ['id','name','age'];


const data = [
    {
        id: 1,
        name: 'Albert',
        age: 50,
    },
    {
        id: 2,
        name: 'Gevorg',
        age: 51,
    },
    {
        id: 3,
        name: 'Aram',
        age: 21,
    },
    {
        id: 4,
        name: 'Gexam',
        age: 31,
    },
    {
        id: 5,
        name: 'Tikran',
        age: 16,
    },
    {
        id: 6,
        name: 'Arpine',
        age: 20,
    },
    {
        id: 7,
        name: 'Hripsime',
        age: 50,
    },
    {
        id: 8,
        name: 'Vazgen',
        age: 26,
    },
    {
        id: 9,
        name: 'Davit',
        age: 22,
    },
    {
        id: 10,
        name: 'Hovhannes',
        age: 21,
    },
    
];

const dataTable = new DataTable(colums,data)
console.log(colums)
console.log(data)
dataTable.createTable()
