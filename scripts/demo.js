window.addEventListener('load', initDemo);

function initDemo() {
    const launchBtn = document.getElementById('launch-btn');
    const gameAudio = document.getElementById('game-audio');

    if (launchBtn) {
        launchBtn.addEventListener('click', function() {
            document.getElementById('demo-container').classList.remove('demo-hidden');
            document.getElementById('loading-msg').classList.add('demo-hidden');

            document.getElementById('jpro-frame').src = "/demo/";
            if(gameAudio){
                gameAudio.volume = 0.1;
                gameAudio.play();
            }
        });
    }
}