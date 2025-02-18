<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;  // Add this import
use App\Http\Controllers\TypingTestController;

// Authentication Routes
Auth::routes();

// Public routes
Route::get('/', function () {
    // Add debugging to check auth status
    $isAuthenticated = Auth::check();
    Log::info('Root route - Auth status: ' . ($isAuthenticated ? 'true' : 'false'));

    if ($isAuthenticated) {
        return redirect()->route('typing.index');
    }
    return redirect()->route('login');
})->name('root');

// Home route - same behavior as root
Route::get('/home', function () {
    $isAuthenticated = Auth::check();
    Log::info('Home route - Auth status: ' . ($isAuthenticated ? 'true' : 'false'));

    if ($isAuthenticated) {
        return redirect()->route('typing.index');
    }
    return redirect()->route('login');
})->name('home');

// Typing test routes (protected)
Route::middleware(['auth'])->group(function () {
    Route::get('/typing', [TypingTestController::class, 'index'])->name('typing.index');
    Route::get('/typing/data', [TypingTestController::class, 'getData'])->name('typing.data');
});
