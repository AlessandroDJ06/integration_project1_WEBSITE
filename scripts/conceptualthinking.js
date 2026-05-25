window.addEventListener('load', handleInit);

function handleInit() {
    const galleryImages = document.querySelectorAll('#diagram-galerij img');

    for (const img of galleryImages){
        img.addEventListener('click', handleClick);
    }
}

function handleClick(event){
    const img = event.target;
    const article = img.closest('article');

    const previewContainer = document.querySelector('#preview-container');
    const previewTitle = document.querySelector('#preview-title');
    const previewText = document.querySelector('#preview-text');

    previewTitle.textContent = article.querySelector('h3').textContent;
    previewText.textContent = article.querySelector('p').textContent;

    let previewImage = document.querySelector('#preview-image');
    if (!previewImage) {
        previewImage = document.createElement('img');
        previewImage.id = 'preview-image';
        previewContainer.appendChild(previewImage);
    }

    previewImage.src = img.src;
    previewImage.alt = img.alt;

    previewContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}