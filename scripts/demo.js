const launchBtn = document.getElementById('launch-btn');
const loadingMsg = document.getElementById('loading-msg');
const demoContainer = document.getElementById('demo-container');

launchBtn.addEventListener('click', async () => {
    launchBtn.disabled = true;
    launchBtn.textContent = 'LADEN...';
    loadingMsg.classList.remove('demo-hidden');
    demoContainer.classList.remove('demo-hidden');

    const test = await fetch("/INF102_Team_1-website/demo/zaroc-demo.jar");
    console.log("JAR status:", test.status, "Size:", test.headers.get("content-length"));

    await cheerpjInit({
        clipboardMode: "system",
        scalingFactor: window.devicePixelRatio,
        displayCanvas: document.getElementById('cheerpjDisplay')
    });

    await cheerpjRunJar("/INF102_Team_1-website/demo/zaroc-demo.jar");
});