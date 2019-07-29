let showSheets = document.querySelector('#showSheets');
let buildTable = document.querySelector('#buildTable');
let obj = { name: 1, age: 2 };

showSheets.addEventListener('click', function () {
    if (document.querySelector('#warn') != null) {
        document.querySelector('#warn').parentElement.removeChild(document.querySelector('#warn'));
    }

    if (document.querySelector('#Sheets') != null) {
        document.querySelector('#Sheets').parentElement.removeChild(document.querySelector('#Sheets'));
    }

    let select = document.createElement('select');
    select.setAttribute('id', 'Sheets');

    if (Object.keys(nameSheets).length > 0) {
        for (key in nameSheets) {
            let option = document.createElement('option');
            option.textContent = key;
            select.appendChild(option);
        }
        document.body.appendChild(select);


    } else {
        if (document.querySelector('#warn') != null) {
            document.querySelector('#warn').parentElement.removeChild(document.querySelector('#warn'));
        }

        let warn = document.createElement('div');
        warn.setAttribute('id', 'warn');
        warn.textContent = 'Загружен файл неправильного формата либо файл не загружен';
        document.body.appendChild(warn);
    }
});

buildTable.addEventListener('click', function () {
    if (document.querySelector('table') != null) {
        document.querySelector('table').parentElement.removeChild(document.querySelector('table'));
    }
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let selectedSheet = document.querySelector('#Sheets').value;
    let tr = document.createElement('tr');
    for (key in nameSheets[selectedSheet][0]) {
        let th = document.createElement('th');

        let str = key;
        th.textContent = str;
        tr.appendChild(th);
    };
    thead.appendChild(tr);
    table.appendChild(thead);
    for (let i = 0; i < nameSheets[selectedSheet].length; i++) {
        let tr = document.createElement('tr');
        for (key in nameSheets[selectedSheet][i]) {
            let td = document.createElement('td');
            let str = nameSheets[selectedSheet][i][key];
            td.textContent = str;
            tr.appendChild(td);
        };
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);
})