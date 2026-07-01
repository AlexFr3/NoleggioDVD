# NoleggioDVD

Progetto full-stack:
- Backend: Laravel
- Frontend: React

## Setup backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Crea le tabelle vuote:
php artisan migrate 
# OPPURE, per creare le tabelle e popolarle con i DVD di esempio:
# php artisan migrate --seed
cd ..

## Setup frontend
cd frontend
npm install
cd ..

## Setup shortcuts
npm install
# npm run dev