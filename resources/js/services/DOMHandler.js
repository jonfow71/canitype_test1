// DOMHandler.js
export class DOMHandler {
    constructor() {
        this.elements = {
            textDisplay: document.getElementById('textDisplay'),
            textInput: document.getElementById('textInput'),
            timerDisplay: document.getElementById('timer'),
            wpmDisplay: document.getElementById('wpm'),
            accuracyDisplay: document.getElementById('accuracy'),
            restartButton: document.getElementById('restart')
        };
    }

    updateDisplay(phrase) {
        this.elements.textDisplay.innerHTML = phrase
            .split('')
            .map(char => `<span class="character">${char}</span>`)
            .join('');
    }

    updateStats(wpm, accuracy) {
        this.elements.wpmDisplay.textContent = wpm;
        this.elements.accuracyDisplay.textContent = `${accuracy}%`;
    }

    updateTimer(time) {
        this.elements.timerDisplay.textContent = time;
    }
}
