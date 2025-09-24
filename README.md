# 💱 Proyecto de Conversión de Monedas (Vue 3 + Vite + Pinia + Firebase)

Este es un proyecto básico construido con **Vite + Vue 3**, que utiliza **Pinia** para el manejo de estado, **Typescript** para el tipado y **Firebase Firestore** para obtener tasas de cambio en tiempo real.

---

## 🚀 Requisitos

Antes de empezar asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18+  
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 📂 Estructura del proyecto

```bash
src/
├─ assets/            # Archivos estáticos (imágenes, css, etc.)
├─ components/        # Componentes Vue reutilizables
├─ stores/            # Pinia stores (estado global)
├─ views/             # Vistas principales
├─ App.vue            # Componente raíz
└─ main.ts            # Punto de entrada
```

## ⚙️ Instalación

Clona este repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/Anthonyca18m/prueba-fss-prestamype
cd prueba-fss-prestamype
```
Instala las dependencias:
```bash
npm install
```
Cambias el nombre al archivo .env.example a .env y asignas el valor correcto a cada variable en el contenido:
 ```bash
VARIABLE_ENV1="VALOR REAL"
VARIABLE_ENV2="VALOR REAL"
VARIABLE_ENV3="VALOR REAL"
...
```

Levanta el servidor de desarrollo con:
```bash
npm run dev
```
El proyecto estará disponible en:
http://localhost:5173