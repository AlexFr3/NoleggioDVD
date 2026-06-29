<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DVD extends Model
{
    protected $table = 'dvds';
    protected $fillable = ['titolo', 'data_uscita', 'categoria', 'durata', 'quantita'];
    
    public function noleggi()
    {
        return $this->hasMany(Noleggio::class);
    }
}
