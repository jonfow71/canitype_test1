// public/js/app.js
import { TypingTest } from './typing.js';
import { TypingService } from './services/TypingService.js';
import { ErrorService } from './services/ErrorService.js';
import { TypingState } from './services/TypingState.js';
import { DOMHandler } from './services/DOMHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    const typingService = new TypingService();
    const errorService = new ErrorService();
    const typingState = new TypingState();
    const domHandler = new DOMHandler();

    new TypingTest(typingService, errorService, typingState, domHandler);
});
