# Bar QR Frontend - Sistema de Pedidos con Autenticación

Este es el frontend para un sistema de pedidos de bar con QR codes que incluye un sistema de autenticación para camareros y administradores.

## Características

### Para Clientes (Público)
- **Menú Digital**: Visualización de productos organizados por categorías
- **Carrito de Compras**: Gestión de productos seleccionados
- **Pedidos QR**: Creación de pedidos desde códigos QR
- **Diseño Responsive**: Optimizado para móviles y tablets

### Para Camareros
- **Dashboard de Pedidos**: Vista en tiempo real de todos los pedidos
- **Gestión de Estados**: Actualización del estado de pedidos (pendiente → preparando → listo → entregado)
- **Estadísticas**: Contadores de pedidos por estado
- **Auto-refresh**: Actualización automática cada 30 segundos

### Para Administradores
- **Dashboard Completo**: Gestión de usuarios, productos, categorías y pedidos
- **Gestión de Usuarios**: Ver y eliminar usuarios del sistema
- **Gestión de Productos**: Ver y eliminar productos
- **Gestión de Categorías**: Ver y eliminar categorías
- **Gestión de Pedidos**: Ver y eliminar pedidos
- **Estadísticas**: Resumen de todos los elementos del sistema

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar la URL del backend en las peticiones fetch (actualmente apunta a `/api/*`)

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Usuarios de Prueba

El sistema está configurado para trabajar con los siguientes usuarios del backend:

- **admin** / password123 - Administrador del sistema
- **waiter1** / password123 - Juan Pérez (Camarero)
- **waiter2** / password123 - María García (Camarero)
- **manager** / password123 - Carlos López (Gerente)

## Rutas de la Aplicación

### Rutas Públicas
- `/` - Página principal (menú público)
- `/menu` - Lista de productos
- `/product/:id` - Detalle de producto
- `/cart` - Carrito de compras
- `/login` - Página de inicio de sesión

### Rutas Protegidas
- `/waiter/dashboard` - Dashboard para camareros y gerentes
- `/admin/dashboard` - Dashboard para administradores

## Sistema de Autenticación

### Características
- **Cookies de Sesión**: Autenticación segura con cookies httpOnly
- **Protección de Rutas**: Verificación automática de autenticación y roles
- **Redirección Inteligente**: Los usuarios son redirigidos según su rol
- **Persistencia**: El estado de autenticación se mantiene entre recargas

### Flujo de Autenticación
1. **Login**: El usuario ingresa sus credenciales en `/login`
2. **Verificación**: El sistema verifica las credenciales con el backend
3. **Redirección**: Según el rol del usuario:
   - `admin` → `/admin/dashboard`
   - `waiter`/`manager` → `/waiter/dashboard`
4. **Protección**: Las rutas protegidas verifican automáticamente la autenticación

## Componentes Principales

### Contextos
- **AuthContext**: Maneja el estado de autenticación global
- **CartContext**: Maneja el carrito de compras

### Componentes de Autenticación
- **ProtectedRoute**: Componente que protege rutas según autenticación y roles
- **LoginPage**: Página de inicio de sesión
- **DashboardNav**: Navegación para los dashboards

### Páginas de Dashboard
- **WaiterDashboardPage**: Dashboard para camareros con gestión de pedidos
- **AdminDashboardPage**: Dashboard completo para administradores

## API Integration

El frontend se comunica con el backend a través de los siguientes endpoints:

### Autenticación
- `POST /api/users/login` - Iniciar sesión
- `POST /api/users/logout` - Cerrar sesión
- `GET /api/users/profile` - Obtener perfil del usuario

### Camareros
- `GET /api/waiter/orders` - Obtener todos los pedidos
- `PATCH /api/waiter/orders/:id/status` - Actualizar estado de pedido

### Administradores
- `GET /api/admin/users` - Listar usuarios
- `DELETE /api/admin/users/:id` - Eliminar usuario
- `GET /api/admin/products` - Listar productos
- `DELETE /api/admin/products/:id` - Eliminar producto
- `GET /api/admin/categories` - Listar categorías
- `DELETE /api/admin/categories/:id` - Eliminar categoría
- `GET /api/admin/orders` - Listar pedidos
- `DELETE /api/admin/orders/:id` - Eliminar pedido

## Tecnologías Utilizadas

- **React 18** - Framework de interfaz de usuario
- **React Router 6** - Enrutamiento de la aplicación
- **Tailwind CSS** - Framework de estilos
- **Context API** - Gestión de estado global
- **Fetch API** - Comunicación con el backend

## Estructura del Proyecto

```
src/
├── components/
│   ├── ProtectedRoute.jsx      # Protección de rutas
│   ├── DashboardNav.jsx        # Navegación de dashboards
│   ├── Layout.jsx              # Layout principal
│   └── ...                     # Otros componentes
├── context/
│   ├── AuthContext.jsx         # Contexto de autenticación
│   └── CartContext.jsx         # Contexto del carrito
├── routes/
│   ├── LoginPage.jsx           # Página de login
│   ├── WaiterDashboardPage.jsx # Dashboard de camareros
│   ├── AdminDashboardPage.jsx  # Dashboard de administradores
│   └── ...                     # Otras páginas
├── hooks/
│   └── useDeviceType.js        # Hook para detectar tipo de dispositivo
└── index.jsx                   # Punto de entrada
```

## Configuración del Backend

Para que el frontend funcione correctamente, el backend debe estar configurado con:

1. **CORS habilitado** para el dominio del frontend
2. **Cookies de sesión** configuradas correctamente
3. **Endpoints de autenticación** funcionando
4. **Rutas protegidas** por roles implementadas

## Desarrollo

### Scripts Disponibles
- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción

### Variables de Entorno
Crear un archivo `.env` si es necesario:
```
VITE_API_URL=http://localhost:3000
```

## Notas de Seguridad

- Las cookies de sesión se manejan automáticamente por el navegador
- Todas las peticiones incluyen `credentials: 'include'`
- Las rutas protegidas verifican autenticación en el cliente y servidor
- Los roles se verifican tanto en el frontend como en el backend
