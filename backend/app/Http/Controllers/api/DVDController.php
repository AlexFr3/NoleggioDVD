<?php

namespace App\Http\Controllers\api;

use App\Models\DVD;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DVDController extends Controller
{
    public function index()
    {
        $dvds = DVD::all();
        foreach ($dvds as $dvd) {
        $noleggiatiAttivi = \App\Models\Noleggio::where('dvd_id', $dvd->id)
            ->whereNull('restituzione_effettiva')
            ->count();
            
        $dvd->copie_disponibili = $dvd->quantita - $noleggiatiAttivi;
    }

    return $dvds;
    }

    //singolo DVD
    public function show(DVD $dvd)
    {
        return $dvd;
    }

    // nuovo DVD
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titolo' => 'required|string',
            'data_uscita' => 'required|date',
            'categoria' => 'required|string',
            'durata' => 'required|integer',
            'quantita' => 'required|integer',
        ]);

        return DVD::create($validated);
    }

    public function update(Request $request, DVD $dvd)
    {
        $validated = $request->validate([
            'titolo' => 'string',
            'data_uscita' => 'date',
            'categoria' => 'string',
            'durata' => 'integer',
            'quantita' => 'integer',
        ]);

        $dvd->update($validated);
        return $dvd;
    }

    public function destroy(DVD $dvd)
    {
        $dvd->delete();
        return response()->noContent();
    }
}