<?php

namespace App\Http\Controllers\api;

use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClienteController extends Controller
{
    // Elenca tutti i clienti
    public function index()
    {
        return Cliente::all();
    }

    // Crea un nuovo cliente
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string',
            'cognome' => 'required|string',
            'email' => 'required|email|unique:clientes',
        ]);

        return Cliente::create($validated);
    }

    // Mostra un singolo cliente
    public function show(Cliente $cliente)
    {
        return $cliente;
    }

    // Aggiorna un cliente
    public function update(Request $request, Cliente $cliente)
    {
        $validated = $request->validate([
            'nome' => 'string',
            'cognome' => 'string',
            'email' => 'email|unique:clientes,email,' . $cliente->id,
        ]);

        $cliente->update($validated);
        return $cliente;
    }

    // Elimina un cliente
    public function destroy(Cliente $cliente)
    {
        $cliente->delete();
        return response()->noContent();
    }
}