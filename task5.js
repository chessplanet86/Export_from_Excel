let arraySheets = [];
let nameSheets = {};
let bookProp = [];

function getCorrectDate(countDay) {
    let D = new Date(1900, 0, 1);
    D.setDate(D.getDate() + countDay);
    let day = D.getDate();
    let month = D.getMonth();
    let year = String(D.getFullYear());
    return `${day}.${month+1}.${year[2]}${year[3]}`;
}

function processFiles(files) {
    for (key in nameSheets) {
        delete nameSheets[key];
    }
    bookProp.length = 0;
    arraySheets.length = 0;
    console.log('Извлекаем файл');
    //Извлекаем файл
    file = files[0];
    //Создаем объект ФайлРиадер
    let reader = new FileReader();
    //В случае успешной загрузки файла
    reader.onload = function(e) {

        let data = e.target.result;
        let workbook = XLSX.read(data, {
            type: 'binary'
        });
        //Книги есть листы, для каждого листа собираем данные.
        workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            let json_object = JSON.stringify(XL_row_object);
            let str = JSON.parse(json_object);
            arraySheets.push(str);
            bookProp.push(sheetName);
        });
        for (let i = 0; i < arraySheets.length; i++) {
            for (let j = 0; j < arraySheets[i].length; j++) {
                if (arraySheets[i][j].hasOwnProperty('OrderDate')) {
                    arraySheets[i][j]['OrderDate'] = getCorrectDate(arraySheets[i][j]['OrderDate']);
                }

                if (arraySheets[i][j].hasOwnProperty('Unit Cost')) {
                    arraySheets[i][j]['Unit Cost'] = Math.round(arraySheets[i][j]['Unit Cost'] * 100) / 100;
                }

                if (arraySheets[i][j].hasOwnProperty('Total')) {
                    arraySheets[i][j]['Total'] = Math.round(arraySheets[i][j]['Total'] * 100) / 100;
                }
            }
            nameSheets[bookProp[i]] = arraySheets[i];
        }

    };
    //В случае ошибки
    reader.onerror = function(ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);
}