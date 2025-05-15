# CRUD El Gran Gremio 🐾

Este es un sistema completo de gestión de adopciones de mascotas desarrollado con **Spring Boot + MongoDB + TailwindCSS + HTML**.  
Permite a usuarios y administradores registrar, consultar, editar y gestionar mascotas para adopción de forma intuitiva y segura.

---

## ✨ Características principales

- Registro e inicio de sesión de usuarios y administradores (JWT)
- CRUD completo de mascotas
- Filtro por especie y búsqueda por nombre/raza
- Subida de imagen por ruta o URL
- Edición de mascotas (solo con sesión activa)
- Validación de token JWT para endpoints protegidos

---

## 📸 Captura del frontend

![El Gran Gremio Frontend](https://github.com/mateosalas28066/CRUD_El_Gran_Gremio/blob/main/src/main/resources/static/captura.png)

---

## ⚙️ Tecnologías utilizadas

- **Java 17** / **Spring Boot 3.1+**
- **MongoDB Atlas**
- **JWT (Json Web Tokens)** para autenticación
- **HTML + TailwindCSS**
- **Fetch API** para comunicación frontend-backend

---

## 🚀 Cómo correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/mateosalas28066/CRUD_El_Gran_Gremio.git
cd CRUD_El_Gran_Gremio
```

### 2. Configurar MongoDB

En `src/main/resources/application.properties`, asegúrate de tener tu URI:

```
spring.data.mongodb.uri=mongodb+srv://<usuario>:<clave>@<cluster>.mongodb.net/GremioDB
```

### 3. Ejecutar Spring Boot

Usa tu IDE o ejecuta:

```bash
./mvnw spring-boot:run
```

### 4. Abrir el frontend

Abre `index.html` directamente en el navegador o configura para servirlo desde `/static`.

---

## 👨‍💻 Autor

**Mateo Salas**  
Proyecto personal para práctica con Spring Boot, JWT y MongoDB.

---

## 📄 Licencia

MIT