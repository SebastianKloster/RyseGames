# 🎮 RyseGames — Plataforma de Compra de Videojuegos

RyseGames es una aplicación web que permite visualizar, gestionar y comprar videojuegos.  
El proyecto está compuesto por un **frontend en Angular**, un **backend en Spring Boot** y una **base de datos MySQL**.

---

## 🏗️ Arquitectura del Proyecto

Este proyecto está dividido en tres capas principales:

### 🔹 Frontend (este repositorio)
- Angular 20
- TypeScript
- HTML, CSS, SCSS
- Servicios para consumir el backend (HTTPClient)
- Render de catálogo, detalles, carrito, billetera, estadísticas, etc.

📌 Repositorio: https://github.com/SebastianKloster/RyseGames

---

### 🔹 Backend (API REST)
Desarrollado en **Spring Boot**, expone los servicios que consume el frontend.

Incluye:
- Autenticación (Login / Registro)
- Gestión de usuarios
- Carrito de compras
- Juegos y estadísticas de ventas
- Control de billetera
- Seguridad con JWT
- Servicios REST documentados

📌 Repositorio backend:  
https://github.com/rodrigo13rios/Proyecto-final-Progra3

---

### 🔹 Base de Datos
El backend se conecta a una base de datos **MySQL**, donde se almacenan:

- Usuarios  
- Juegos  
- Ventas  
- Carritos  
- Billeteras  
- Estadísticas de desarrolladoras  
- Registros históricos  

---

## 🚀 Tecnologías utilizadas

### Frontend
- Angular 20  
- TypeScript  
- Angular Material  
- Observables & Signals  
- RxJS  

### Backend
- Spring Boot 3  
- Java 17  
- JPA / Hibernate  
- Controladores REST  
- Seguridad JWT  

### Base de Datos
- MySQL 8  
- Scripts SQL de creación y carga  
- Relaciones entre tablas  

---

##Integración con Mercado Pago (Modo Prueba)

RyseGames utiliza la API de pagos de Mercado Pago para procesar cargas virtuales de la billetera. Para que pueda funcionar correctamente hay que abrir el puerto 8443 que opera de forma local, por lo que debemos ser notificados a la hora de probar esta funcion para abirlo con ngrok.

- Cuenta Comprador de prueba
    - User ID: 3200707522
    - Usuario: TESTUSER6385916532157337326
    - Contraseña: 66HpvwhZnN
    - Codigo de verificacion: 707524
 
- Tarjeta Aprobada

    - Número: 4509 9535 6623 3704
    - CVV: 123
    - Vencimiento: 11/30
    - Nombre: APRO
    - DNI: 12345678

- Tarjeta Rechazada

    - Número: 4509 9535 6623 3704
    - CVV: 123
    - Vencimiento: 11/30
    - Nombre: OTHE
    - DNI: 12345678

---

## 📦 Instalación y Ejecución

### 1️⃣ Clonar Frontend
```bash
git clone https://github.com/SebastianKloster/RyseGames.git
cd RyseGames
npm install
ng serve --ssl true


