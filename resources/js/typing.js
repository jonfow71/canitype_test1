// typing.js
export class TypingTest {
    constructor() {
        // DOM Elements
        this.textDisplay = document.getElementById('textDisplay');
        this.textInput = document.getElementById('textInput');
        this.timerDisplay = document.getElementById('timer');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.restartButton = document.getElementById('restart');
        
        // Test State
        this.timeLeft = 60;
        this.timer = null;
        this.testActive = false;
        this.errors = 0;
        this.totalCharacters = 0;
        this.currentPhrase = '';
        this.testData = null;
        
        // Bind event listeners
        this.initializeEventListeners();
        
        // Load initial data
        this.loadTestData();
    }

    initializeEventListeners() {
        this.textInput.addEventListener('input', () => this.handleInput());
        this.restartButton.addEventListener('click', () => this.restartTest());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    async loadTestData() {
        try {
            const response = await fetch('/typing-data', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            this.testData = await response.json();
            this.generateNewPhrase();
        } catch (error) {
            console.error('Error loading typing test data:', error);
            this.textDisplay.innerHTML = 'Error loading test data. Please refresh the page.';
        }
    }

    generateNewPhrase() {
        if (!this.testData?.StrP1) return;
        
        const { I1, I2, I3, I4, I5 } = this.testData.StrP1;
        
        this.currentPhrase = [
            this.getRandomElement(I1),
            this.getRandomElement(I2),
            this.getRandomElement(I3),
            this.getRandomElement(I4),
            this.getRandomElement(I5)
        ].join(' ');

        this.displayPhrase();
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    displayPhrase() {
        this.textDisplay.innerHTML = this.currentPhrase
            .split('')
            .map(char => `<span class="character">${char}</span>`)
            .join('');
    }

    handleInput() {
        if (!this.testActive && this.textInput.value.length > 0) {
            this.startTest();
        }

        const inputValue = this.textInput.value;
        const currentCharacters = this.textDisplay.querySelectorAll('.character');
        
        currentCharacters.forEach((char, index) => {
            if (index >= inputValue.length) {
                char.classList.remove('correct', 'incorrect');
            } else {
                if (char.innerText === inputValue[index]) {
                    char.classList.add('correct');
                    char.classList.remove('incorrect');
                } else {
                    char.classList.add('incorrect');
                    char.classList.remove('correct');
                }
            }
        });

        if (inputValue === this.currentPhrase) {
            this.handlePhraseCompletion();
        }
    }

    handlePhraseCompletion() {
        this.calculateStats();
        this.textInput.value = '';
        this.generateNewPhrase();
    }

    calculateStats() {
        const totalCharacters = this.currentPhrase.length;
        const incorrectCharacters = this.textDisplay.querySelectorAll('.incorrect').length;
        this.errors += incorrectCharacters;
        this.totalCharacters += totalCharacters;
        
        const minutes = (60 - this.timeLeft) / 60;
        const wpm = Math.round((this.totalCharacters / 5) / minutes);
        const accuracy = Math.round(((this.totalCharacters - this.errors) / this.totalCharacters) * 100);
        
        this.updateStats(wpm, accuracy);
    }

    updateStats(wpm, accuracy) {
        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = `${accuracy}%`;
    }

    startTest() {
        this.testActive = true;
        this.timer = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        this.timeLeft--;
        this.timerDisplay.textContent = this.timeLeft;
        
        if (this.timeLeft <= 0) {
            this.endTest();
        }
    }

    endTest() {
        clearInterval(this.timer);
        this.testActive = false;
        this.textInput.disabled = true;
        
        // Save results to database via API
        this.saveResults();
    }

    async saveResults() {
        try {
            const results = {
                wpm: parseInt(this.wpmDisplay.textContent),
                accuracy: parseInt(this.accuracyDisplay.textContent),
                total_characters: this.totalCharacters,
                errors: this.errors,
                _token: document.querySelector('meta[name="csrf-token"]').content
            };

            const response = await fetch('/typing-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(results)
            });

            if (!response.ok) {
                throw new Error('Failed to save results');
            }
        } catch (error) {
            console.error('Error saving results:', error);
        }
    }

    restartTest() {
        // Reset all test states
        this.timeLeft = 60;
        this.testActive = false;
        this.errors = 0;
        this.totalCharacters = 0;
        this.textInput.value = '';
        this.textInput.disabled = false;
        this.timerDisplay.textContent = this.timeLeft;
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100%';
        clearInterval(this.timer);
        
        // Generate new phrase
        this.generateNewPhrase();
    }

    handleKeydown(e) {
        // Prevent tab key from changing focus
        if (e.key === 'Tab') {
            e.preventDefault();
        }
    }
}

// Initialize the typing test when the DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new TypingTest();
// });
