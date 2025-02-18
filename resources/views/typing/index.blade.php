@extends('layouts.app')

@section('content')
<div class="container mx-auto p-4">
    <div id="error-message" class="alert alert-danger" style="display: none;"></div>
    
    <div class="typing-test-container">
        <div id="textDisplay" class="text-lg mb-4 p-4 bg-gray-100 rounded"></div>
        <input type="text" id="textInput" class="w-full p-2 border rounded mb-4" autocomplete="off">
        
        <div class="stats-container grid grid-cols-3 gap-4 mb-4">
            <div class="stat-box p-4 bg-white rounded shadow">
                <label>Time:</label>
                <span id="timer">60</span>s
            </div>
            <div class="stat-box p-4 bg-white rounded shadow">
                <label>WPM:</label>
                <span id="wpm">0</span>
            </div>
            <div class="stat-box p-4 bg-white rounded shadow">
                <label>Accuracy:</label>
                <span id="accuracy">100%</span>
            </div>
        </div>
        
        <button id="restart" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Restart Test
        </button>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/services/ErrorService.js') }}"></script>
<script src="{{ asset('js/services/TypingService.js') }}"></script>
<script src="{{ asset('js/services/DOMHandler.js') }}"></script>
<script src="{{ asset('js/services/TypingState.js') }}"></script>
<script src="{{ asset('js/typing.js') }}"></script>
@endsection
