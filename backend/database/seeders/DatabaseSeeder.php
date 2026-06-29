<?php

namespace Database\Seeders;

use App\Models\DVD; 
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        DVD::create([
            'titolo' => 'Inception',
            'data_uscita' => '2010-07-16',
            'categoria' => 'Sci-Fi',
            'durata' => 148,
            'quantita' => 3,
        ]);

        DVD::create([
            'titolo' => 'The Matrix',
            'data_uscita' => '1999-03-31',
            'categoria' => 'Sci-Fi',
            'durata' => 136,
            'quantita' => 2,
        ]);

        DVD::create([
            'titolo' => 'Forrest Gump',
            'data_uscita' => '1994-07-06',
            'categoria' => 'Drama',
            'durata' => 142,
            'quantita' => 4,
        ]);

        DVD::create([
            'titolo' => 'Interstellar',
            'data_uscita' => '2014-11-07',
            'categoria' => 'Sci-Fi',
            'durata' => 169,
            'quantita' => 2,
        ]);

        DVD::create([
            'titolo' => 'Pulp Fiction',
            'data_uscita' => '1994-10-14',
            'categoria' => 'Crime',
            'durata' => 154,
            'quantita' => 3,
        ]);
    }
}
