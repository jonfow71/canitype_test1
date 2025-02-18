// ErrorService.js
export class ErrorService {
    static handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        if (error.response) {
            // Handle different HTTP error codes
            switch (error.response.status) {
                case 404:
                    this.showUserMessage('Resource not found');
                    break;
                case 500:
                    this.showUserMessage('Server error occurred');
                    break;
                default:
                    this.showUserMessage('An error occurred');
            }
        }
    }

    static showUserMessage(message) {
        // Create or update error message element
        const errorDiv = document.getElementById('error-message') || 
                        this.createErrorElement();
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    static createErrorElement() {
        const div = document.createElement('div');
        div.id = 'error-message';
        div.className = 'alert alert-danger';
        document.body.prepend(div);
        return div;
    }
}
