window.addEventListener('load',handleInit);

function handleInit() {
    let sessionId = checkSessionId();
    logCurrentPage(sessionId,window.location.pathname);
    updateAllLinks(sessionId);
}

function checkSessionId(){
    const urlParams = new URLSearchParams(window.location.search);
    let sid = urlParams.get('session_id');

    if (!sid) {
        sid = sessionStorage.getItem('project_sid');
    }

    if (!sid) {
        sid = createSessionId()
        sessionStorage.setItem('project_sid', sid);
    }

    return sid;
}

function createSessionId(){
    return 'sess_' + Date.now() + Math.random().toString(36).substr(2, 5);
}

function logCurrentPage(sessionId,page) {
    fetch('/savepagedata.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            session_id: sessionId,
            page: page
        })
    }).catch(err => console.error('Logging error:', err));
}

[8.4000 - 96.0000]
[0.9375 - 8.5655]

function updateAllLinks(sessionId) {
    for(let i of document.querySelectorAll('a')){
        try {
            const href = new URL(i.href, window.location.origin);
            if (href.origin === window.location.origin) {
                href.searchParams.set('session_id', sessionId);
                i.href = href.toString();
            }
        } catch (e){
        }
    }
}
