
# 🍣 Qitchen - Aplicación Web para Restaurante de Sushi

Bienvenido al repositorio de **Qitchen**, una aplicación web diseñada para gestionar un restaurante de sushi con una arquitectura moderna, enfocada en una experiencia de usuario fluida gracias a su estructura SPA (Single Page Application).  

🔗 Diseño UI en Figma: [Ver diseño en Figma](https://www.figma.com/design/VkCxnTC1OaLEefSAEGOS8r/Restautant-Sushi?node-id=3220-239&m=dev)

---

## 🗂 Estructura del Proyecto

Este repositorio está organizado como un monorepo, separando claramente el frontend del backend:

APP-REST-SUSHI/
├── backend/                # API REST con Node.js y Prisma
│   ├── controllers/        # Controladores para usuarios, productos y pedidos
│   ├── middleware/         # Autenticación con JWT
│   ├── prisma/             # Esquema y cliente de base de datos
│   ├── routes/             # Rutas organizadas por recurso
│   ├── .env                # Variables de entorno
│   ├── db.js               # Inicialización de Prisma
│   └── server.js           # Servidor Express
│
├── frontend/               # SPA con Vanilla JS y Web Components
│   ├── components/         # Componentes reutilizables
│   ├── blocks/             # Estilos organizados con BEM
│   ├── services/           # Lógica del carrito y autenticación
│   ├── assets/             # Imágenes e íconos
│   ├── css/                # Hoja de estilos principal
│   ├── index.html          # Punto de entrada
│   ├── router.js           # Enrutamiento SPA
│   └── schema_design/      # Diagrama de la base de datos
│
└── .gitignore

---

## 🧩 Modelo de Datos (ERD)

Usuarios (1) ────< Pedidos (n)
Pedidos (1) ────< DetallesPedido (n)
Productos (1) ────< DetallesPedido (n)
Categorias (1) ────< Productos (n)

Entidades:
- Usuarios: id, nombre, email, contrasena_hash, rol, fecha_registro
- Pedidos: id, usuario_id, fecha_pedido, estado, total
- DetallesPedido: pedido_id, producto_id, cantidad, precio_unitario
- Productos: id, categoria_id, nombre, descripcion_detallada, precio, imagen_url
- Categorias: id, nombre, descripcion

---

## 🧠 Patrones de Diseño

🔄 **Observer**  
Permite que componentes reaccionen a cambios (ej. login, carrito).  
Usado en: `auth-service.js`, `carrito-observer-single.js`

🔒 **Singleton**  
Gestiona una única instancia de servicios como autenticación o carrito.

🧱 **MVC (backend)**  
Separación entre modelos, controladores y lógica de negocio.  
Middleware de autenticación con JWT (`authMiddleware.js`).

---

## 🛠 Tecnologías Utilizadas

- **Backend**: Node.js, Express, PostgreSQL, Prisma, JWT, Bcrypt
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Web Components
- **Herramientas**: Git, npm, Nodemom.

---

## ⚙️ Requisitos Previos

- Node.js v18+
- npm
- Git

---



## 🌐 Endpoints de la API

- POST `/api/usuarios/registro`: Registrar usuario
- POST `/api/usuarios/login`: Login y JWT
- GET `/api/productos`: Listar productos por categoría
- POST `/api/pedidos`: Crear pedido 

