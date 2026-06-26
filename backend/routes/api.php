<?php

use App\Http\Controllers\api\ClienteController;
use App\Http\Controllers\api\DVDController;
use App\Http\Controllers\api\NoleggioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotte per Clienti
Route::apiResource('clienti', ClienteController::class);

// Rotte per DVD
Route::apiResource('dvds', DVDController::class);

// Rotte per Noleggi
Route::apiResource('noleggios', NoleggioController::class);