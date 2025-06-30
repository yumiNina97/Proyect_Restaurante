# 🍣 APP-REST-SUSHI  
**Proyecto:** Aplicación Web para el Restaurante "Qitchen"

Este repositorio contiene el desarrollo de una aplicación web para un restaurante de sushi. El proyecto presenta una arquitectura SPA (Single Page Application) usando **Vanilla JavaScript** y **Web Components** en el frontend, mientras que el backend ofrece una API RESTful construida con **Node.js**, **Express** y **Prisma ORM** conectada a una base de datos en **Supabase (PostgreSQL)**.

---

## 📁 Estructura del Proyecto

├── backend/
│ ├── prisma/ # Esquema de base de datos
│ ├── controllers/ # Lógica de negocio (MVC)
│ ├── middleware/ # Autenticación con JWT
│ ├── routes/ # Endpoints REST
│ ├── .env # Variables de entorno
│ ├── db.js # Cliente Prisma
│ ├── server.js # Servidor Express
│ └── package.json # Dependencias
│
├── frontend/
│ ├── components/ # Web Components
│ ├── blocks/ # Estilos con BEM
│ ├── services/ # Carrito y autenticación
│ ├── assets/ # Iconos e imágenes
│ ├── css/ # Estilos globales
│ ├── index.html # Entrada SPA
│ ├── router.js # SPA Routing
│ └── schema_design/ # Esquema DB
└── .gitignore

---

## 🗄️ Base de Datos

> Este proyecto utiliza **PostgreSQL** como base de datos, gestionado desde **Supabase** y sincronizado con **Prisma ORM**.

![Base de datos](/schema_design/supabase-schema-widyfbkhpyvdoceqwetg.png)

---

## 🧱 Patrones de Diseño Utilizados

### 🔁 Observer
Para reaccionar a cambios de estado como inicio de sesión o cambios en el carrito.

```js
// auth-service.js (Sujeto)
notificar() {
  this.observadores.forEach(obs => obs.update(this));
}

// site-header.js (Observador)
update(servicio) {
  if (servicio.estaLogueado()) this.render();
}

🧠 MVC y Middleware (Backend)
El backend usa el patrón Modelo-Vista-Controlador junto a middleware JWT para verificación de usuarios autenticados.

🧰 Tecnologías Utilizadas
🔙 Backend
Node.js

Express

PostgreSQL (Supabase)

Prisma

JWT

Bcrypt.js

🎨 Frontend
HTML5

CSS3

Vanilla JavaScript

Web Components

🔧 Herramientas
Git

npm

🚀 Instalación y Ejecución

git clone <URL-del-repositorio>
cd PROYECT_RESTAURANTE

🔧 Backend

cd backend
npm install


🔐 Configura el archivo .env
Crea un archivo .env en /backend con el siguiente contenido:

DATABASE_URL="URL de la base de datos en la nube"
JWT_SECRET="TuLlaveSecretaJWT"

▶️ Ejecutar el proyecto
Terminal 1: Backend

cd backend
npm run dev

Terminal 2: Frontend
cd frontend
npm run dev

📡 Endpoints Principales
Método	Endpoint	Descripción
POST	/api/usuarios/registro	Registro de un nuevo usuario
POST	/api/usuarios/login	Login de usuario y retorno de JWT
GET	/api/productos	Obtiene productos por categoría
POST	/api/pedidos	Crea un nuevo pedido (requiere autenticación)

🖌️ Diseño en Figma
Figma – UI del Proyecto