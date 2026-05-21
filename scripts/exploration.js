window.addEventListener('load',handleInit);

function handleInit(){
    document.getElementById("increase-picture").addEventListener("click",increaseIndex);
    document.getElementById("decrease-picture").addEventListener("click",decreaseIndex);
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




