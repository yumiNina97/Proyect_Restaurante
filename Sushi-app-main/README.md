# Sushi App
> **Sushi App** es una aplicación full-stack para un restaurante de sushi: catálogo de productos, carrito de compras, blog, reservas y contacto.

---

## 📂 Estructura del Proyecto Frontend
<img width="205" alt="image" src="https://github.com/user-attachments/assets/dc817a1a-23a7-4fc4-bc9d-138c8e366e96" />

## 📂 Estructura del Proyecto Backend
<img width="207" alt="image" src="https://github.com/user-attachments/assets/b951eab4-f073-4484-8a74-96367a676dd3" />

---

## Diagrama de la Base de Datos (Supabase)

<img width="1118" alt="image" src="https://github.com/user-attachments/assets/f87e9fbb-9f55-4ebd-9476-bca30a3734e9" />


---

## ¿Qué Hace Este Proyecto?

1. **Backend (Node.js + Supabase)**  
   - Autenticación con JWT (register/login).  
   - CRUD de categorías, productos, blogs, reservas, carrito y órdenes.  

2. **Frontend (Vanilla Web Components)**  
   - Componentes encapsulados con Shadow DOM.  
   - Enrutador hash-based (`router.js`).  
   - Diseño responsive con CSS Metodologia BEM

---

## Pasos para Levantar el Proyecto

### Backend

1. Clona y entra en la carpeta:
   
   git clone <repo-url>
   cd sushi-app/backend

2. npm install

3. Crea un .env con al menos:

    PORT=3000
    JWT_SECRET=tu_secreto_aqui
    SUPABASE_URL=https://xyz.supabase.co
    SUPABASE_KEY=tu_api_key 

4. Crea las tablas en Supabase (Categories, MenuItems, Users, CartItems, Orders…).

5. npm run dev

### Frontend

1. Desde la raíz del proyecto:

    cd sushi-app/frontend

2. Abre index.html en un navegador moderno.

3. Asegúrate de que API_BASE en api.js apunte a tu backend:

    export const API_BASE = 'http://localhost:3000/api';

---

### Diseño en Figma
Todos los mockups están en este archivo de Figma:

Figma: [ https://www.figma.com/file/XXXXXXXXXXXX/Qitchen-Designs](https://www.figma.com/design/Jh09DOT3nHwthxmIjNd6pQ/web-app-exam?node-id=0-1&t=5kfoojXTuLDqCgFQ-1)

Layouts de escritorio.


