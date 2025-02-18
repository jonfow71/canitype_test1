// resources/views/components/typing-test.blade.php
<div class="typing-test-container">
    <div id="error-message" class="alert alert-danger" style="display: none;"></div>
    
    <div class="test-area">
        <div id="textDisplay" class="text-display"></div>
        <input type="text" id="textInput" class="text-input" autocomplete="off">
    </div>

    <div class="stats-area">
        <div class="stat">
            <label>Time:</label>
            <span id="timer">60</span>
        </div>
        <div class="stat">
            <label>WPM:</label>
            <span id="wpm">0</span>
        </div>
        <div class="stat">
            <label>Accuracy:</label>
            <span id="accuracy">100%</span>
        </div>
    </div>

    <button id="restart" class="btn btn-primary">Restart Test</button>
</div>
