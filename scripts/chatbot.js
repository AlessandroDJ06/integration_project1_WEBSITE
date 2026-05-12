window.addEventListener('load',handleInit);

function handleInit(){
    document.getElementById("toggleChat").addEventListener("click", toggleChat);
    document.getElementById("chatBtn").addEventListener("click", toggleChat);
    document.querySelector("form").addEventListener('submit',handleSubmit)
}
function toggleChat() {
    let chatWindow = document.getElementById('chatWindow');
    let btn = document.getElementById('chatBtn');

    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        btn.style.display = 'none';
    } else {
        chatWindow.style.display = 'none';
        btn.style.display = 'flex';
    }
}

async function handleSubmit(event){
    let message = document.querySelector('#question').value;
    let article = document.querySelector('.chat-body');
    showMessageUserOnScreen(message,article);
    let p = await showMessageAiOnScreen(message,article,null);
    handleAiResponse(message,article,p);

    document.querySelector('#question').value = '';
    event.preventDefault();
    
}

function showMessageUserOnScreen(message,article){
    let p = document.createElement('p');
    p.innerHTML = message;
    p.classList.add('pixel-box','user');
    article.appendChild(p);
}

async function showMessageAiOnScreen(message, article, p) {
    if (p == null){
        p = document.createElement('p');
        p.innerHTML = "<em>aan het denken...</em>";
        p.classList.add('pixel-box', 'system');
        article.appendChild(p);
        article.scrollTop = article.scrollHeight;

        return p
    } else {
        p.innerHTML = message;
        const lowercaseMessage = message.toLowerCase();
        let category = "general";
        let recognized = true;

        if (containsKeyword(lowercaseMessage, ["regels", "spelregels", "uitleg", "handleiding", "hoe speel ik", "pion", "beurt", "stapelen"])) {
            createLink('/html/spelregels.html', "spelregels", article);
            category = "rules";
        } 
        else if (containsKeyword(lowercaseMessage, ["alessandro", "lasha", "illia", "team", "ontwikkelaar", "makers", "wie", "contact"])) {
            createLink('/html/contact.html', "over ons", article);
            category = "aboutUs";
        } 
        else if (containsKeyword(lowercaseMessage, ["ai", "computer", "tegenstander", "bot", "stefan", "alistair", "moeilijkheid"])) {
            createLink('/html/aispeler.html', "ai speler", article);
            category = "ai";
        } 
        else if (containsKeyword(lowercaseMessage, ["database", "sql", "query", "erd", "leaderboard", "postgresql"])) {
            createLink('/html/database.html', "implementatie", article);
            createLink('/html/erd.html', "ERD", article);
            category = "database";
        } 
        else if (containsKeyword(lowercaseMessage, ["stijl", "thema", "pixel", "retro", "galerij", "look", "art"])) {
            createLink('/html/fotogalerij.html', "galerij", article);
            category = "style";
        } 
        else if (containsKeyword(lowercaseMessage, ["bord", "logica", "controller", "gamestatus", "diagram", "usecase", "ontwerp", "conceptueel"])) {
            createLink('/html/gamemodel.html', "gamemodel", article);
            createLink('/html/conceptualthinking.html', "conceptual", article);
            category = "logic";
        } 
        else if (containsKeyword(lowercaseMessage, ["server", "ip", "ssh", "apache", "infra", "port 5432", "ssl"])) {
            createLink('/html/infrastructure.html', "infra", article);
            category = "infra";
        } 
        else if (containsKeyword(lowercaseMessage, ["download", "installeren", "setup", "windows", "installer"])) {
            createLink('/html/installatiepagina.html', "installatie", article);
            category = "install";
        } 
        else if (containsKeyword(lowercaseMessage, ["online", "vrienden", "multiplayer", "lobby", "room_code"])) {
            createLink('/html/multiplayer.html', "multiplayer", article);
            category = "multiplayer";
        } 
        else if (containsKeyword(lowercaseMessage, ["stats", "statistieken", "data", "zettijd", "gemiddelde", "outlier"])) {
            createLink('/html/movedata.html', "stats", article);
            category = "stats";
        } 
        else if (containsKeyword(lowercaseMessage, ["account", "registreren", "inloggen", "login", "user"])) {
            createLink('mailto:alessandro.dejongh@student.kdg.be', "mail alessandro", article);
            createLink('mailto:lasha.dularidze@student.kdg.be', "mail lasha", article);
            createLink('mailto:illia.ramael@student.kdg.be', "mail illia", article);
            category = "account";
        } 
        return;
    }

}

function createLink(link,message,article,p){
    let a = document.createElement('a');
    a.classList.add('pixel-box','chat-link');

    a.innerHTML = message;
    a.href = link;

    article.appendChild(a);
}

function containsKeyword(message,keyWords){
    for (keyWord of keyWords){
        if(message.includes(keyWord)){
            return true;
        }
    }
    return false;
}

async function handleAiResponse(message,article,p) {
    const chatResponse = await fetch('/geminihandler.php', {
        method: 'POST',
        body: JSON.stringify({ message: message })
    });
    const chatData = await chatResponse.json();
    const reply = chatData.candidates[0].content.parts[0].text;

    showMessageAiOnScreen(reply,article,p);
    saveChatbotData(message,reply);
}

async function saveChatbotData(message,response){
    await fetch("/savedata.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        message: message,
        response: response
    }),
    });
}