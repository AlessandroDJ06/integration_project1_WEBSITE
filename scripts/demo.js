document.getElementById('launch-btn').addEventListener('click', function() {
    document.getElementById('demo-container').classList.remove('demo-hidden');
    document.getElementById('loading-msg').classList.add('demo-hidden');

    document.getElementById('jpro-frame').src = "/demo/";
});