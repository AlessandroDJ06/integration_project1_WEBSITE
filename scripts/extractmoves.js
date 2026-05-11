window.addEventListener('load',handleInit);

function handleInit(){
    getMoveData();
    document.getElementById("moveDataBtn").addEventListener("click", getMoveData);
}


function getMoveData() {
    loadJsonFile('../game.json', function(data) {
        const tableBody = document.getElementById('game-data');
        const sortValue = document.getElementById('sortOrder').value;

        if (sortValue == "player"){
            data = sortDataByName(data);
        } else if (sortValue == "duration"){
            data = sortDataByDuration(data);
        } else if (sortValue == "game"){
            data = sortDataByDate(data);
        }
        
        let rows = []; 
        
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            let rowClass = row.outlier === 'X' ? " class='outlier'" : "";

            let tr = `<tr${rowClass}>
                <td>${row.player}</td>
                <td>${formatDate(row.game)}</td>
                <td>${row.outcome}</td>
                <td>${formatDate(row.move)}</td>
                <td>${roundDuration(row.duration)}</td>
                <td>${row.outlier || ""}</td>
            </tr>`;

            rows.push(tr);
        }
        tableBody.innerHTML = "";
        tableBody.insertAdjacentHTML('beforeend', rows.join(''));
    });
}

function sortDataByName(data){
    return data.sort((a,b) => a.player.localeCompare(b.player));
}

// function sortDataByDuration(){

// }

// function sortDataByDate(){

// }


// function getDataByUsername(){

// }

// function getPlayerWithMostMoves(){

// }

// function getAverageMoveDuration(){

// }

// function getTotalMoves(){

// }


function loadJsonFile(jsonFileUrl, callback) {
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(callback)
        .catch(error => alert(`Er heeft zich een fout voorgedaan bij het ophalen van '${jsonFileUrl}'`));
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

