<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $fillable = ['nome', 'cognome', 'email'];
    
    // Relazione con Noleggio
    public function noleggi()
    {
        return $this->hasMany(Noleggio::class);
    }
}
