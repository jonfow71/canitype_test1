// TypingService.js
export class TypingService {
    constructor() {
        this.baseUrl = '/api/typing';
    }

    async fetchTestData() {
        const response = await fetch(`${this.baseUrl}/data`);
        return response.json();
    }

    async saveResults(results) {
        return await fetch(`${this.baseUrl}/results`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(results)
        });
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Accept': 'application/json'
        };
    }
}
