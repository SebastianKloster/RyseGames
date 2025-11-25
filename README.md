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

## 📦 Instalación y Ejecución

### 1️⃣ Clonar Frontend
```bash
git clone https://github.com/SebastianKloster/RyseGames.git
cd RyseGames
npm install
ng serve

