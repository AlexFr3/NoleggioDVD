<?php

namespace App\Http\Controllers\api;

use App\Models\Noleggio;
use App\Models\DVD;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NoleggioController extends Controller
{
    //tutti i noleggi
    public function index()
    {
        return Noleggio::with(['cliente', 'dvd'])->get();
    }

    //nuovo noleggio
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'dvd_id' => 'required|exists:dvds,id',
            'data_noleggio' => 'required|date',
            'restituzione_prevista' => 'required|date|after:data_noleggio',
        ]);

        // Controlla disponibilità
        $dvd = DVD::find($validated['dvd_id']);
        $noleggiatiAttivi = Noleggio::where('dvd_id', $validated['dvd_id'])
            ->whereNull('restituzione_effettiva')
            ->count();

        if ($noleggiatiAttivi >= $dvd->quantita) {
            return response()->json(['error' => 'DVD non disponibile'], 422);
        }

        return Noleggio::create($validated);
    }

    //singolo noleggio
    public function show(Noleggio $noleggio)
    {
        return $noleggio->load(['cliente', 'dvd']);
    }

    // Chiudi un noleggio
    public function update(Request $request, Noleggio $noleggio)
    {
        $validated = $request->validate([
            'restituzione_effettiva' => 'required|date|after_or_equal:data_noleggio',
        ]);

        $noleggio->update($validated);
        return $noleggio;
    }

    public function destroy(Noleggio $noleggio)
    {
        $noleggio->delete();
        return response()->noContent();
    }
}