class ImageScanner {
    constructor() {
        this.supportedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    }

    async getImagesList() {
        try {
            // Since we can't directly scan folders in browser JavaScript,
            // we'll maintain a JSON file with image information
            const response = await fetch('images/index.json');
            const images = await response.json();
            return images;
        } catch (error) {
            console.error('Error loading images index:', error);
            return [];
        }
    }
} 