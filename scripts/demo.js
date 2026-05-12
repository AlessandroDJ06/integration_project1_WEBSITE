const launchBtn = document.getElementById('launch-btn');
const loadingMsg = document.getElementById('loading-msg');
const demoContainer = document.getElementById('demo-container');

launchBtn.addEventListener('click', async () => {
    launchBtn.disabled = true;
    launchBtn.textContent = 'LADEN...';
    loadingMsg.classList.remove('demo-hidden');
    demoContainer.classList.remove('demo-hidden');

    await cheerpjInit({
        clipboardMode: "system",
        scalingFactor: window.devicePixelRatio,
        displayCanvas: document.getElementById('cheerpjDisplay')
    });

    await cheerpjRunJar("/demo/zaroc-demo.jar");
});