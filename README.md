# NoleggioDVD

Progetto full-stack:
- **Backend:** Laravel
- **Frontend:** React

## Setup backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Crea le tabelle vuote:

```bash
php artisan migrate
```

Oppure, per creare le tabelle e popolarle con i DVD di esempio:

```bash
php artisan migrate --seed
```

```bash
cd ..
```

## Setup frontend

```bash
cd frontend
npm install
cd ..
```

## Setup shortcuts

```bash
npm install
# npm run dev
```
