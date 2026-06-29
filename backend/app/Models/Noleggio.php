<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Noleggio extends Model
{
    protected $fillable = ['cliente_id', 'dvd_id', 'data_noleggio', 'restituzione_prevista', 'restituzione_effettiva'];
    
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    
    public function dvd()
    {
        return $this->belongsTo(DVD::class);
    }
}
