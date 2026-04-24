function getMoveData() {
    fetch('../game.json').then(
        function(response) {
            return response.json();
        })
        .then(function(data) {
            const tableBody = document.getElementById('game-data');
            
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                let tr = '';
                if (row.outlier === 'X'){
                    tr = "<tr class='outlier'>" +
                    "<td>" + row.player + "</td>" +
                    "<td>" + formatDate(row.game) + "</td>" +
                    "<td>" + row.outcome + "</td>" +
                    "<td>" + formatDate(row.move) + "</td>" +
                    "<td>" + roundDuration(row.duration) + "</td>" +
                    "<td>" + (row.outlier || "") + "</td>" +
                "</tr>";
                } else {
                    tr = "<tr>" +
                    "<td>" + row.player + "</td>" +
                    "<td>" + formatDate(row.game) + "</td>" +
                    "<td>" + row.outcome + "</td>" +
                    "<td>" + formatDate(row.move) + "</td>" +
                    "<td>" + roundDuration(row.duration) + "</td>" +
                    "<td>" + (row.outlier || "") + "</td>" +
                "</tr>";
                }

                
                tableBody.innerHTML += tr;
            }
        });
}

function formatDate(unformattedDate){
    const date = new Date(unformattedDate);
    let dag = String(date.getDate()).padStart(2, '0');
    let maand = String(date.getMonth() + 1).padStart(2, '0'); 
    let uren = String(date.getHours()).padStart(2, '0');
    let minuten = String(date.getMinutes()).padStart(2, '0');

    let formattedDate = `${dag}/${maand} ${uren}:${minuten}`; 
    return formattedDate;
}

function roundDuration(duration){
    return Math.round(duration * 100) / 100;
}

getMoveData();

document.getElementById("moveDataBtn").addEventListener("click", getMoveData);


