# Prueba Tecnica Proforest

Proyecto monolito con backend en Django y frontend en Angular para consultar coordenadas por ciudad, registrar ubicaciones favoritas y obtener las 3 ubicaciones favoritas mas cercanas a una ciudad dada.

## Descripcion

La aplicacion esta dividida en dos partes:

- **Backend**: API REST en Django con Django REST Framework.
- **Frontend**: Interfaz en Angular con rutas separadas para cada funcionalidad.

El proyecto usa **SQLite** como base de datos local y **geopy** para resolver coordenadas y calcular distancias geograficas.

## Funcionalidades implementadas

- Consulta de coordenadas por ciudad.
- Registro de ubicaciones favoritas con nombre, latitud y longitud.
- Listado de todas las ubicaciones favoritas almacenadas.
- Consulta de las 3 ubicaciones favoritas mas cercanas a una ciudad.
- Interfaz web separada por secciones para cada flujo.

## Stack tecnico

### Backend
- Python 3.11
- Django
- Django REST Framework
- geopy
- django-cors-headers
- SQLite

### Frontend
- Angular
- TypeScript
- RxJS
- FormsModule / HttpClient

## Estructura del proyecto

```text
backend/
  config/
  locations/
  manage.py
  db.sqlite3

frontend/
  src/
    app/
      pages/
      app.html
      app.scss
      app.routes.ts
      location-api.service.ts
      location.models.ts
```

## Endpoints de la API

Base URL local:

```text
http://127.0.0.1:8000/api/
```

### 1. Obtener coordenadas por ciudad

```http
GET /coordinates/?city=<nombre_ciudad>
```

Ejemplo:

```text
http://127.0.0.1:8000/api/coordinates/?city=Bogota
```

Respuesta:

```json
{
  "city": "Bogota",
  "latitude": 4.6533817,
  "longitude": -74.0836331
}
```

### 2. Crear ubicacion favorita

```http
POST /favorite-locations/
```

Cuerpo:

```json
{
  "name": "Museo del Oro",
  "latitude": 4.5981,
  "longitude": -74.0760
}
```

Respuesta:

```json
{
  "id": 1,
  "name": "Museo del Oro",
  "latitude": 4.5981,
  "longitude": -74.076
}
```

### 3. Listar ubicaciones favoritas

```http
GET /favorite-locations/
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Museo del Oro",
    "latitude": 4.5981,
    "longitude": -74.076
  }
]
```

### 4. Obtener las 3 ubicaciones mas cercanas

```http
GET /closest-locations/?city=<nombre_ciudad>
```

Ejemplo:

```text
http://127.0.0.1:8000/api/closest-locations/?city=Medellin
```

Respuesta:

```json
{
  "city": "Medellin",
  "closest_locations": [
    {
      "id": 1,
      "name": "Museo del Oro",
      "latitude": 4.5981,
      "longitude": -74.076,
      "distance_km": 250.58
    }
  ]
}
```

## Requisitos previos

- Python 3.11 o superior
- Node.js y npm
- Angular CLI

## Instalacion local

### 1. Backend

```bash
cd backend
../venv/Scripts/python.exe manage.py migrate
../venv/Scripts/python.exe manage.py runserver 127.0.0.1:8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

## URLs locales

- Frontend: `http://localhost:4200`
- Backend: `http://127.0.0.1:8000`

## Notas

- El frontend esta preparado para consumir la API en `http://127.0.0.1:8000/api`.
- Se habilito CORS para permitir peticiones desde `http://localhost:4200`.
- SQLite se usa de forma local y no requiere instalacion adicional.
- Si se cambia el esquema de la app `locations`, se deben generar y aplicar migraciones nuevamente.

## Autor

Proyecto desarrollado para prueba tecnica.
