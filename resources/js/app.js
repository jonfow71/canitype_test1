import './bootstrap';
import Alpine from 'alpinejs';
import { TypingTest } from './typing.js';  // Added .js extension
import { TypingService } from './services/TypingService.js';
import { ErrorService } from './services/ErrorService.js';
import { TypingState } from './services/TypingState.js';
import { DOMHandler } from './services/DOMHandler.js';

window.Alpine = Alpine;
Alpine.start();

document.addEventListener('DOMContentLoaded', () => {
    const typingService = new TypingService();
    const errorService = new ErrorService();
    const typingState = new TypingState();
    const domHandler = new DOMHandler();

    new TypingTest(typingService, errorService, typingState, domHandler);
});
