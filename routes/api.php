<?php

use Illuminate\Support\Facades\Route;

//Resident
Route::get('/fizz-buzz', 'App\Http\Controllers\AssignmentController@FizzBuzz')->name('FizzBuzz.fetch');
Route::get('/divide-collect-slice', 'App\Http\Controllers\AssignmentController@DivideList')->name('DivideCollect.slice');
Route::get('/mondays-period-fetch', 'App\Http\Controllers\AssignmentController@GetMondays')->name('Mondays.fetch');