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

async function saveChatbotData(message,response){
    await fetch("/saveData.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        message: message,
        response: response
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

    const rulesKeywords = ["regels", "spelregels", "uitleg", "handleiding", "wetten"];
    const aiKeywords = ["alphazero", "mcts", "resnet", "neuraal", "deepmind", "tegenstander", "moeilijkheid", "value", "stefan", "alistair","ai","ai model"];
    const conceptualKeywords = ["diagram", "usecase", "domeinmodel", "wireframe", "sequence", "ontwerp", "conceptueel", "dcd", "ssd"];
    const aboutUsKeywords = ["alessandro", "lasha", "illia", "team", "ontwikkelaar", "spoc", "trello", "kwaliteit", "gitlab", "github","maker", "wie", "creatie", "ontwikkelaar","developers"];
    const databaseKeywords = ["database", "sql", "query", "tables", "relatie", "erd", "leaderboard", "scores", "pion", "gehasht"];
    const styleKeywords = ["stijl", "thema", "pixel", "retro", "donkey", "pink", "gold", "galerij", "foto", "look"];
    const gameLogicKeywords = ["bord", "pawn", "peg", "zet", "beurt", "winnaar", "logica", "controller", "verloop", "spelduur"];
    const infraKeywords = ["server", "ip", "ssh", "apache", "validator", "cron", "backup", "https", "ssl", "certificaat","infra"];
    const installKeywords = ["download", "installeren", "gratis", "setup", "ram", "schijfruimte", "versie", "systeemvereisten"];

    const lowercaseMessage = message.toLowerCase();
    const asksForRules = containsKeyword(lowercaseMessage, rulesKeywords);
    const asksAboutUs = containsKeyword(lowercaseMessage, aboutUsKeywords);
    const asksForAi = containsKeyword(lowercaseMessage, aiKeywords);
    const asksForConceptual = containsKeyword(lowercaseMessage, conceptualKeywords);
    const asksForDatabase = containsKeyword(lowercaseMessage, databaseKeywords);
    const asksForStyle = containsKeyword(lowercaseMessage, styleKeywords);
    const asksForGameLogic = containsKeyword(lowercaseMessage, gameLogicKeywords);
    const asksForInfra = containsKeyword(lowercaseMessage, infraKeywords);
    const asksForInstall = containsKeyword(lowercaseMessage, installKeywords);

    if (asksForRules){
        p.innerHTML = "Voor meer info over de regels kan je terecht op volgende pagina!";
        a.href = "/html/spelregels.html";
        a.innerHTML = "spelregels"
    } else if (asksAboutUs){
        p.innerHTML = "Je kan zien wie de game ontwikkelt heeft op onze contact pagina ;)";
        a.href = "/html/contact.html";
        a.innerHTML = "over ons";
    } else if (asksAboutUs){
        p.innerHTML = "Je kan zien wie de game ontwikkelt heeft op onze contact pagina ;)";
        a.href = "/html/contact.html";
        a.innerHTML = "over ons";
    } else if (asksForAi){
        p.innerHTML = "Je kan meer info terug vinden over onze ai speler op volgende pagina, laat me zeker weten of je hem kon verslaan!";
        a.href = "/html/aispeler.html";
        a.innerHTML = "ai speler";
    } else if (asksForConceptual){
        p.innerHTML = "Diagrammen voor conceptual thinking kan je vinden op volgende pagina";
        a.href = "/html/conceptualthinking.html";
        a.innerHTML = "conceptual";
    } else if (asksForDatabase){
        p.innerHTML = "Voor databases hebben we 2 pagina's! 1 gaat over de implementatie en de andere het erd, ik geef je beide linkjes ;)";
        a.href = "/html/database.html";
        a.innerHTML = "implemenatie";
        extraLink.href = "/html/erd.html";
        extraLink.innerHTML = "ERD";
        appendExtraLink = true;
    } else if (asksForStyle){
        p.innerHTML = "Ahhh onze ui! wist je al dat deze volledig zelf gemaakt is? Je kan hem hier bewonderen!";
        a.href = "/html/fotogalerij.html";
        a.innerHTML = "galerij";
    } else if (asksForGameLogic){
        p.innerHTML = "De logica van de game kan natuurlijk niet ontbreken, die kan je vinden op deze pagina!";
        a.href = "/html/gamemodel.html";
        a.innerHTML = "gamemodel";
    } else if (asksForInfra){
        p.innerHTML = "Voor infra hebben we ook een pagina! lees hier alle stappen die we hebben genomen om bv deze webserver online te krijgen ;)";
        a.href = "/html/infrastructure.html";
        a.innerHTML = "infra";
    } else if (asksForInfra){
        p.innerHTML = "Voor de hele installatie procedure kan je terecht op volgende pagina , op dit moment is er nog geen release maar deze komt eraan!";
        a.href = "/html/installatiepagina.html";
        a.innerHTML = "infra";
    }  else {
        p.innerHTML = "Sorry! ik heb je niet begrepen, kan je de vraag herformuleren?"
        appendLink = false;
    }

    article.appendChild(p);
    if(appendLink){
        article.appendChild(a);
    }
    if(appendExtraLink){
        article.appendChild(extraLink);
    }
    saveChatbotData(message,p.innerHTML);
}

function containsKeyword(message,keyWords){
    for (keyWord of keyWords){
        if(message.includes(keyWord)){
            return true;
        }
    }
    return false;
}





