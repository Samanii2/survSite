class ImageViewerApp {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.imagesListElement = document.getElementById('imagesList');
        this.imageDetailElement = document.getElementById('imageDetail');
        this.imageScanner = new ImageScanner();
        this.images = [];
        
        this.init();
    }

    async init() {
        // Load images list
        this.images = await this.imageScanner.getImagesList();
        
        // Initialize search functionality
        this.searchInput.addEventListener('input', () => this.handleSearch());
        
        // Initial render of images list
        this.renderImagesList(this.images);
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredImages = this.images.filter(image =>
            image.name.toLowerCase().includes(searchTerm)
        );
        this.renderImagesList(filteredImages);
    }

    renderImagesList(images) {
        this.imagesListElement.innerHTML = images.map(image => `
            <div class="image-item" data-image-id="${image.id}">
                <div class="image-thumbnail">
                    <img src="images/${image.filename}" alt="${image.name}"/>
                </div>
                <h3>${image.name}</h3>
            </div>
        `).join('');

        // Add click listeners to image items
        this.imagesListElement.querySelectorAll('.image-item').forEach(item => {
            item.addEventListener('click', () => {
                const image = this.images.find(img => img.id === item.dataset.imageId);
                this.showImageDetail(image);
            });
        });
    }

    showImageDetail(image) {
        this.imageDetailElement.innerHTML = `
            <div class="image-detail-content">
                <h2>${image.name}</h2>
                <div class="image-viewer">
                    <img 
                        src="images/${image.filename}" 
                        alt="${image.name}"
                        class="full-image"
                    />
                </div>
                <div class="image-info">
                    <p><strong>Filename:</strong> ${image.filename}</p>
                    ${image.description ? `<p><strong>Description:</strong> ${image.description}</p>` : ''}
                </div>
            </div>
        `;
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageViewerApp();
}); 