// TypingState.js
export class TypingState {
    constructor() {
        this.state = {
            timeLeft: 60,
            testActive: false,
            errors: 0,
            totalCharacters: 0,
            currentPhrase: '',
            wpm: 0,
            accuracy: 100
        };

        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifySubscribers();
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.state));
    }
}
