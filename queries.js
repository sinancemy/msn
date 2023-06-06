
async function getDiffLang(country1, country2) {
    const response = await fetch(`http://localhost:3000/getDiffLang?country1=${country1}&country2=${country2}`);
    const jsonData = await response.json();
    return jsonData;
}

function diffTable() {
    var country1 = document.getElementById("country1").value;
    var country2 = document.getElementById("country2").value;
    var table = document.getElementById("lang-diff-table");
    getDiffLang(country1, country2).then((jsonData) => {
        table.innerHTML = "";
        for (var i = 0; i < jsonData.length; i++) {
            var row = table.insertRow();
            var langCell = row.insertCell(0);
            langCell.innerHTML = jsonData[i].Language;
        }
    });
}