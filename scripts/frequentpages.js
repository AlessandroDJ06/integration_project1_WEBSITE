window.addEventListener('load',handleInit);

function handleInit(){
    loadJsonFile("page_frequenties.json",showFrequentlyVisitedPages);
    
}

function showFrequentlyVisitedPages(pages){
    const listOfArticles = getFrequentlyVisitedPages(pages);
    const section= getSection();
    for(let i = 0; i < 6 ; i++){
        for(article of listOfArticles){
            section.appendChild(article.cloneNode(true));
        }
    }
}

function getFrequentlyVisitedPages(pages){
    let listOfArticles = [];

    for(let i = 0; i < 6; i++){
        listOfArticles.push(createFeatureCard(pages[i]));
    }
    
    return listOfArticles;
}

function createFeatureCard(page){
    let article = document.createElement('article');
    article.classList.add('feature-card', 'pixel-box');
    article.innerHTML = `
        <h3>${getCleanPageName(page.page)}</h3>
        <p>Deze pagina werd ${page.frequentie} bezocht!</p>
        <a href="${page.page.slice(1)}">Ontdek ${getCleanPageName(page.page)} &gt;</a>
    `;
    return article;
}

function loadJsonFile(jsonFileUrl, callback) {
    fetch(jsonFileUrl)
        .then(response => response.json())
        .then(callback)
        .catch(error => alert(`Er heeft zich een fout voorgedaan bij het ophalen van '${jsonFileUrl}'`));
}

function getSection(){
    return document.querySelector('#frequently-visited');
}

function getCleanPageName(name){
    let fileName = name.split("/").pop();
    return fileName.replace(".html", "");
}