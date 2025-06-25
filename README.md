# APP-REST-SUSHI
#Proyecto: Aplicación Web - Restaurante "Qitchen"

Este repositorio contiene el desarrollo de una aplicacion web de un restaurante de sushi, este proyecto tiene un enfoque de SPA para el frontend, construido en Vanilla Js, JavaScript y Web Components, uso de api RestFul para el backend, manejado con Node.js, Express y Prisma(ORM)

## 1. Estructura del Proyecto
El proyecto sigue una organización monorepo, separando claramente las responsabilidades del frontend y el backend.
```
APP-REST-SUSHI/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma   # Esquema de la base de datos para Prisma
│   │  
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   ├── productoController.js
│   │   └── pedidoController.js
│   ├── middleware/
│   │   └── authMiddleware.js # Middleware para manejo de rutas con Json Web Tokens
│   ├── routes/
│   │   ├── usuarioRoutes.js
│   │   └── productoRoutes.js
│   │   └── pedidoRoutes.js
│   ├── .env                # Variables de entorno (Base de datos - llaves secretas)
│   ├── db.js                 # Cliente de Prisma
│   ├── package.json          # Dependencias
│   └── server.js             # Servudor Express
│
├── frontend/
│   ├── components/          #Web components de cada pagina
│   │   ├── site-header.js
│   │   ├── front-page.js
│   │   ├── menu-page.js
│   │   └── ... (otros  web componentes de página)
│   ├── blocks/
│   │   ├── layout-split/
│   │   └── ... (demas estilos con metodologia BEM)
│   ├── services/
│   │   ├── auth-service.js     # Manejo de logica con Json Web Tokens
│   │   └── carrito-observer-single.js #Servicio para el carrito
│   │ 
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── css/
│   │   └── main.css          
│   ├── index.html            # SPA
│   ├── package.json          # Dependencias Live server
│   ├── router.js             # Router de SPA
│   └── schema_design/        # Esquema de base de datos
│
└── .gitignore
```
## 2.BASE DE DATOS
```
erDiagram
    Usuarios {
        int id PK
        string nombre
        string email UK
        string contrasena_hash
        tipo_rol rol
        datetime fecha_registro
    }

    Pedidos {
        int id PK
        int usuario_id FK
        datetime fecha_pedido
        estado_pedido_enum estado
        decimal total
    }

    DetallesPedido {
        int pedido_id FK
        int producto_id FK
        int cantidad
        decimal precio_unitario
    }

    Productos {
        int id PK
        int categoria_id FK
        string nombre
        text descripcion_detallada
        decimal precio
        string imagen_url
    }

    Categorias {
        int id PK
        string nombre UK
        string descripcion
    }

    Usuarios ||--o{ Pedidos 
    Pedidos }o--|| DetallesPedido 
    Productos }o--|| DetallesPedido 
    Categorias ||--o{ Productos 
```
## 3.Patrones de diseño
En este proyecto de utilizaron patrones diseño como:
-Patron Observer
Justificacion: Se necesitaba una manera para que los componentes reaccionaran ante cambios de estado de algunos elementos como el inicio de sesion, el carrito de compras, y asi tener por separado sus funciones, por ello se usa un patron observer.
* Archivos usados por este patron: frontend/services/carrito-observer-single.js y frontend/services/auth-service.js
Pseudo-codigo
```
//auth-service.js (Sujeto)
class ServicioAuth {
    // ...
    notificar() {
        this.observadores.forEach(obs => obs.update(this));
    }
}
//site-header.js (Observador)
class SiteHeader extends HTMLElement {
    connectedCallback() {
        servicioAuth.suscribir(this);
    }
    update(servicio) {
        // Se actualiza el navbar si se cumplen las condiciones segun servicio.estaLogueado()
    }
}
```
--
**Patrones**
-Patron Singleton
Justificacion: En el caso del patron singleton fue usado para tener una sola instancia del estado del carrito(servicioCarrito), tambien el servicio de autorizacion(servicioAuth) y de esta manera se simplifica el codigo.
* Archivos usados por este patron: frontend/services/carrito-observer-single.js y frontend/services/auth-service.js

Esos son los usos mas directos de patrones de diseño.
**Patron en el backend**
-Patron MVC (Model-View-Controller) / Service Layer
Para este proyecto se usó este patron por recomendacion y por ser un patron solido para el desarrollo de software, ya que separamos resposabilidades, lo que facilita la implementacion
-Middleware
se usó middleware para la logica de verificacion de la autenticacion mediante Json Web Tokens.
Ubicacion: backend/middleware/authMiddleware.js

## 4.Tecnologías Utilizadas
* Backend: Node.js, Express, PostgreSQL, Prisma, JWT, Bcrypt.js
* Frontend: HTML5, CSS, Vanilla JavaScript, Web Components.
* Herramientas: Git, npm, Live Server, Nodemon.

## 5. Configuración

Prerrequisitos:
* Node.js +V18
* npm
* Git
* Una instancia de PostgreSQL en ejecución (local o en la nube)

## 6.Instalación:

Clona el repositorio:
```
git clone 
cd APP-REST-SUSHI
```
Configura el Backend:
```
cd backend
npm install
```
Crea un archivo .env en la raíz de /backend y añade las siguientes variables:
```
DATABASE_URL="URL de la base de datos en la nube"
JWT_SECRET="Llave secreta jwt"
```
Comandos de Prisma para sincronizar y poblar la base de datos:
```
npx prisma generate
```
Configuracion Frontend:
```
cd ../frontend
npm install
```
Ejecucion
Terminal Backend
```
cd backend
npm run dev
```
Terminal Frontend
```
cd frontend
npm run dev
```
## 7.Endpoints de la API
* POST /api/usuarios/registro: Registra un nuevo usuario.

* POST /api/usuarios/login: Inicia sesión y devuelve un JWT.

* GET /api/productos: Productos por categoria
  
* POST /api/pedidos: Crea un nuevo pedido (ruta protegida por JWT).
