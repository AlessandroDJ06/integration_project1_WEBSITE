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

function handleSubmit(event){
    let message = document.querySelector('#question').value;
    let article = document.querySelector('.chat-body');2
    showMessageUserOnScreen(message,article);
    handleAiResponse(message,article);
    document.querySelector('#question').value = '';
    event.preventDefault();
    
}

async function saveChatbotData(message,category,recognized){
    await fetch("/saveData.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        message: message,
        category: category,
        recognized: recognized
    }),
    });
}

function showMessageUserOnScreen(message,article){
    let p = document.createElement('p');
    p.innerHTML = message;
    p.classList.add('pixel-box','user');
    article.appendChild(p);
}


function handleAiResponse(message,article){
    let p = document.createElement('p');
    p.classList.add('pixel-box','system');

    let a = document.createElement('a');
    a.classList.add('pixel-box','chat-link');
    let extraLink = document.createElement('a');
    extraLink.classList.add('pixel-box','chat-link');

    let appendLink = true;
    let appendExtraLink = false;
    
    let category = "";
    let recognized = true;

    const lowercaseMessage = message.toLowerCase();
    
    const rulesKeywords = ["regels", "spelregels", "uitleg", "handleiding", "wetten", "hoe speel ik", "pion", "beurt", "winnaar", "verliezen", "zijwaarts", "voorwaarts", "eindrij", "pin", "stapelen"];
    const aiKeywords = ["ai", "computer", "tegenstander", "bot", "verslaan", "moeilijkheid", "stefan", "alistair", "easy", "medium", "hard", "elite", "decideturn", "diepte"];
    const conceptualKeywords = ["diagram", "usecase", "domeinmodel", "wireframe", "ontwerp", "conceptueel", "dcd", "ssd", "visueel", "schema"];
    const aboutUsKeywords = ["alessandro", "lasha", "illia", "team", "ontwikkelaar", "makers", "wie", "creatie", "contact", "studenten", "kdg", "project"];
    const databaseKeywords = ["database", "sql", "query", "tables", "relatie", "erd", "leaderboard", "scores", "gehasht", "postgresql", "game_participation", "tussentabel", "foreign key"];
    const styleKeywords = ["stijl", "thema", "pixel", "retro", "galerij", "foto", "look", "layout", "graphics", "art", "kleuren", "pawncolor"];
    const gameLogicKeywords = ["bord", "pawn", "peg", "zet", "beurt", "winnaar", "logica", "controller", "verloop", "appcontroller", "gamestatus", "undo", "legale zet"];
    const infraKeywords = ["server", "ip", "ssh", "apache", "validator", "cron", "backup", "https", "ssl", "infra", "port 5432", "certbot", "duckdns", "security"];
    const installKeywords = ["download", "installeren", "gratis", "setup", "ram", "systeemvereisten", "geheugen", "schijfruimte", "windows", "64-bit", "installer"];
    const multiplayerKeywords = ["online", "vrienden", "samen", "multiplayer", "spelers", "lobby", "join", "host", "guest", "room_code", "pollen", "synchronisatie"];
    const accountKeywords = ["account", "aanmelden", "registreren", "inloggen", "profiel", "wachtwoord", "login", "user", "profielfoto"];
    const statsKeywords = ["stats", "statistieken", "data", "zettijd", "duur", "zetdata", "gemiddelde", "outlier", "agressief", "passief", "spelduur"];

    if (containsKeyword(lowercaseMessage, rulesKeywords)){
        p.innerHTML = "Voor meer info over de regels kan je terecht op volgende pagina!";
        a.href = "/html/spelregels.html";
        a.innerHTML = "spelregels";
        category = "rules";
    } else if (containsKeyword(lowercaseMessage, aboutUsKeywords)){
        p.innerHTML = "Je kan zien wie de game ontwikkelt heeft op onze contact pagina ;)";
        a.href = "/html/contact.html";
        a.innerHTML = "over ons";
        category = "aboutUs";
    } else if (containsKeyword(lowercaseMessage, aiKeywords)){
        p.innerHTML = "Je kan meer info terug vinden over onze ai speler op volgende pagina, laat me zeker weten of je hem kon verslaan!";
        a.href = "/html/aispeler.html";
        a.innerHTML = "ai speler";
        category = "ai";
    } else if (containsKeyword(lowercaseMessage, databaseKeywords)){
        p.innerHTML = "Voor databases hebben we 2 pagina's! 1 gaat over de implementatie en de andere het erd, ik geef je beide linkjes ;)";
        a.href = "/html/database.html";
        a.innerHTML = "implementatie";
        extraLink.href = "/html/erd.html";
        extraLink.innerHTML = "ERD";
        category = "database";
        appendExtraLink = true;
    } else if (containsKeyword(lowercaseMessage, styleKeywords)){
        p.innerHTML = "Ahhh onze ui! wist je al dat deze volledig zelf gemaakt is? Je kan hem hier bewonderen!";
        a.href = "/html/fotogalerij.html";
        a.innerHTML = "galerij";
        category = "style";
    } else if (containsKeyword(lowercaseMessage, gameLogicKeywords) || containsKeyword(lowercaseMessage, conceptualKeywords)){
        p.innerHTML = "De logica en het ontwerp van de game kan natuurlijk niet ontbreken, die kan je vinden op deze pagina's!";
        a.href = "/html/gamemodel.html";
        a.innerHTML = "gamemodel";
        extraLink.href = "/html/conceptualthinking.html";
        extraLink.innerHTML = "conceptual";
        appendExtraLink = true;
        category = "logic";
    } else if (containsKeyword(lowercaseMessage, infraKeywords)){
        p.innerHTML = "Voor infra hebben we ook een pagina! lees hier alle stappen die we hebben genomen om bv deze webserver online te krijgen ;)";
        a.href = "/html/infrastructure.html";
        a.innerHTML = "infra";
        category = "infra";
    } else if (containsKeyword(lowercaseMessage, installKeywords)){
        p.innerHTML = "Voor de hele installatie procedure kan je terecht op volgende pagina, check de vereisten en begin!";
        a.href = "/html/installatiepagina.html";
        a.innerHTML = "installatie";
        category = "install";
    } else if (containsKeyword(lowercaseMessage, multiplayerKeywords)){
        p.innerHTML = "Multiplayer is zeer belangrijk voor toffe games, hoe kan je anders tegen je vrienden spelen ;) hier is de link!";
        a.href = "/html/multiplayer.html";
        a.innerHTML = "multiplayer";
        category = "multiplayer";
    } else if (containsKeyword(lowercaseMessage, statsKeywords)){
        p.innerHTML = "Benieuwd naar de cijfers achter de game? Check hier alle stats en move data!"; 
        a.href = "/html/movedata.html";
        a.innerHTML = "stats";
        category = "stats"; 
    } else if (containsKeyword(lowercaseMessage, accountKeywords)){
        p.innerHTML = "Het lijkt erop dat je iets vraagt over accounts! Helaas is er geen pagina die hierover praat :/ mail de developers:";
        a.href = "mailto:alessandro.dejongh@student.kdg.be,lasha.dularidze@student.kdg.be,illia.ramael@student.kdg.be";
        a.innerHTML = "mail developers";
        category = "account";
    } else {
        p.innerHTML = "Sorry! ik heb je niet begrepen, kan je de vraag herformuleren? zoek je een pagina?";
        appendLink = false;
        recognized = false;
    }

    article.appendChild(p);
    if(appendLink){
        article.appendChild(a);
    }
    if(appendExtraLink){
        article.appendChild(extraLink);
    }
    saveChatbotData(message,category,recognized);
}

function containsKeyword(message,keyWords){
    for (keyWord of keyWords){
        if(message.includes(keyWord)){
            return true;
        }
    }
    return false;
}





