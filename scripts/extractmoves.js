window.addEventListener('load',handleInit);

function handleInit(){
    getMoveData(1);
    document.getElementById("moveDataBtn").addEventListener("click", getMoveData);
    document.getElementById("increase-page").addEventListener("click",increasePage);
    document.getElementById("decrease-page").addEventListener("click",decreasePage);
}


function getMoveData(pageLimit) {
    loadJsonFile('../game.json', function(data) {
        const tableBody = document.getElementById('game-data');
        const sortValue = document.getElementById('sortOrder').value;
        const searchElement = document.getElementById('searchInput');
        
        let searchName = "";
        let searchByName = false;
        
        if(searchElement && searchElement.value.trim() !== ""){
            searchByName = true;
            searchName = searchElement.value.toLowerCase();
        }

        if (sortValue == "playerAsc") data = sortDataByName(data,true);
        else if (sortValue == "playerDesc") data = sortDataByName(data,false);
        else if (sortValue == "durationAsc") data = sortDataByDuration(data,true);
        else if (sortValue == "durationDesc") data = sortDataByDuration(data,false);
        else if (sortValue == "gameAsc") data = sortDataByDate(data,true);
        else if (sortValue == "gameDesc") data = sortDataByDate(data,false);
        
        let rows = []; 
        
        for (let i = getMinimumBound(data,pageLimit); i < getUpperBound(data,pageLimit); i++) {
            let row = data[i];
            
    
            if (searchByName && !row.player.toLowerCase().includes(searchName)) {
                continue; 
            }

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

        if(rows.length === 0){
            decreasePage();
            return;
        }
        tableBody.innerHTML = rows.join('');
    });
}

function sortDataByName(data,orderAsc){
    if(orderAsc){
        return data.sort((a,b) => a.player.localeCompare(b.player));
    } else {
        return data.sort((a,b) => b.player.localeCompare(a.player));
    }
    
}

function sortDataByDuration(data,orderAsc){
    if(orderAsc){
        return data.sort((a,b) => a.duration - b.duration);
    } else {
        return data.sort((a,b) => b.duration - a.duration);
    }
    
}

function sortDataByDate(data,orderAsc){
    if (orderAsc){
        return data.sort((a,b) => new Date(a.game) - new Date(b.game));
    }else{
        return data.sort((a,b) => new Date(b.game) - new Date(a.game));
    }
   
}


function increasePage(){
    const currentPageSelector = document.getElementById("current-page");
    let currentPage = parseInt(currentPageSelector.innerHTML);

    currentPageSelector.innerHTML = ++currentPage;
    getMoveData(currentPage);
}

function decreasePage(){
    const currentPageSelector = document.getElementById("current-page");
    let currentPage = parseInt(currentPageSelector.innerHTML);
    if(currentPage > 1){
        currentPageSelector.innerHTML = --currentPage;
    }
    getMoveData(currentPage);
}

function getUpperBound(data, pageLimit){
    const upper = pageLimit * 25;
    return upper > data.length ? data.length : upper;
}

function getMinimumBound(data, pageLimit){
    const lower = (pageLimit - 1) * 25;
    return lower > data.length ? data.length : lower;
}
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

