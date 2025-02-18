<?php

use App\Http\Controllers\Api\TypingController;
use App\Http\Controllers\Api\TypingResultController;
use Illuminate\Support\Facades\Route;

Route::prefix('typing')->group(function () {
    Route::get('/data', [TypingController::class, 'getData']);
    Route::post('/results', [TypingResultController::class, 'store']);
});
