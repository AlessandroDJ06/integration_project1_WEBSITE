window.addEventListener('load',handleInit);

function handleInit(){
    document.getElementById("increase-picture").addEventListener("click",increaseIndex);
    document.getElementById("decrease-picture").addEventListener("click",decreaseIndex);
    loadJsonFile("../correlations.json",showCurrentCorrelations)
    loadPicture(0);
}

function loadPicture(index){
    const pictureSection = document.getElementById("pictures-analysis");
    let title = document.createElement("h3");
    title.id = "picture-title";
    let image = document.createElement('img');

    pictureSection.innerHTML = "";

    image.src = getPictures()[index];
    image.alt = getAlts()[index];

    title.innerHTML = getAlts()[index];
    pictureSection.appendChild(title);
    pictureSection.appendChild(image);

}

function getPictures(){
    const pictures = [
        "../images/exploration/ai_spelers_cor.png",
        "../images/exploration/echte_spelers_cor.png",
        "../images/exploration/orange_workflow.png",
        "../images/exploration/polynomial_reg.png",
        "../images/exploration/scatter_plot_ai.png",
        "../images/exploration/scatter_plot_echt.png"
    ];
    return pictures;
}

function getAlts(){
    const alt = [
        "correlatie ai speler",
        "correlatie echte spelers",
        "workflow",
        "regressie",
        "scatter plot ai spelers",
        "scatter plot echte spelers"
    ];
    return alt;
}

function increaseIndex(){
    AMOUNT_OF_PICTURES = getAmountOfPictures();
    currentIndex = (getCurrentIndex() - 1 + AMOUNT_OF_PICTURES) % AMOUNT_OF_PICTURES;
    loadPicture(currentIndex);
}

function decreaseIndex(){
    AMOUNT_OF_PICTURES = getAmountOfPictures();
    currentIndex = (getCurrentIndex() + 1) % AMOUNT_OF_PICTURES;
    loadPicture(currentIndex);
}

function getCurrentIndex(){
    const title = document.getElementById("picture-title").innerHTML;
    return getAlts().indexOf(title);
}

function getAmountOfPictures(){
    return getPictures().length;
}


function showCurrentCorrelations(data){
    const correlationSection = document.getElementById("current-correlations");

    for(let i = 0; i < data.length ; i++){
        const box = createCorrelationBox(data[i].correlation, data[i].type);
        correlationSection.appendChild(box);
    }

}

function createCorrelationBox(correlation,type){
    let section = document.createElement('section');
    let title = document.createElement('h3');
    let text = document.createElement('p');
    section.classList.add('pixel-box')
    title.innerHTML = type;
    text.innerHTML = "correlatie: " + correlation;
    section.appendChild(title);
    section.appendChild(text);

    return section;
}




function loadJsonFile(jsonFileUrl, callback) {
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(callback)
        .catch(error => alert(`Er heeft zich een fout voorgedaan bij het ophalen van '${jsonFileUrl}'`));
}







