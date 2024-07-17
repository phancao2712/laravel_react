<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'auth'
], function ($router) {
    Route::get('profile', [AuthController::class,'profile']);
    Route::post('logout', [AuthController::class,'logout']);
});
Route::post('auth/login', [AuthController::class,'login']);
Route::post('auth/refresh', [AuthController::class,'refresh']);
