# E-Commerce Backend

## Descripción
Backend de aplicación de e-commerce construido con Node.js, Express y TypeScript.

## Requisitos Previos
- Node.js (v18 o superior)
- npm

## Instalación



1. Instalar dependencias
```bash
npm install
```

2. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto con:
```
PORT=5000
JWT_SECRET=tu_secreto_jwt
CORS_ORIGIN=http://localhost:3000
```

## Scripts

- `npm run dev`: Iniciar servidor en modo desarrollo
- `npm run build`: Compilar TypeScript
- `npm start`: Iniciar servidor en producción

## Estructura del Proyecto
```
src/
├── config/          # Configuraciones
├── data/            # Gestión de datos (DAOs)
├── middleware/      # Middlewares
├── routes/          # Rutas de la API
├── services/        # Lógica de negocio
├── types/           # Definiciones de tipos
└── utils/           # Utilidades
```

## Mejoras Pendientes

### Funcionalidades a Implementar
- [ ] Sistema de gestión de ventas
- [ ] Validaciones exhaustivas de productos
- [ ] Implementar rutas de administrador unificadas
- [ ] Crear manejador de errores centralizado
- [ ] Añadir más validaciones de seguridad

### Arquitectura y Código
- [ ] Implementar middleware de admin global
- [ ] Crear manejador de errores único
- [ ] Añadir más pruebas unitarias
- [ ] Implementar logging más robusto



## Licencia
Distribuido bajo la licencia MIT.