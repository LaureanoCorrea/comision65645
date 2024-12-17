# Proyecto Comi65645

Este es un proyecto basado en React que utiliza Vite como bundler, con enrutamiento mediante React Router DOM.

## Características principales

- **Framework**: React 18
- **Enrutador**: React Router DOM
- **Bundler**: Vite
- **Linter**: ESLint con soporte para React y React Hooks

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona este repositorio:

   ```bash
   git clone <https://github.com/LaureanoCorrea/comision65645>
   cd comi65645
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm run dev`

Ejecuta la aplicación en modo desarrollo. Abre [http://localhost:5173](http://localhost:5173) para verla en el navegador.

Visita el sitio desplegado. (https://compradetodo.netlify.app/)

### `npm run build`

Construye la aplicación para producción en la carpeta `dist`. Empaqueta React en modo de producción y optimiza el build para un mejor rendimiento.

### `npm run preview`

Sirve el build de producción localmente para probarlo.

### `npm run lint`

Ejecuta ESLint para identificar problemas de estilo o errores en el código.

## Dependencias principales

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^7.0.1

## Dependencias de desarrollo

- `@vitejs/plugin-react-swc`: ^3.5.0
- `eslint`: ^9.11.1
- `eslint-plugin-react`: ^7.37.0
- `eslint-plugin-react-hooks`: ^5.1.0-rc.0
- `vite`: ^5.4.8

## Estructura del proyecto

```plaintext
/src
  /assets         # Archivos estáticos como imágenes o fuentes
    /components     # Componentes reutilizables de React
    /context        # Contextos para manejo de estados globales
  main.jsx        # Punto de entrada de la aplicación
```

## Personalización

Puedes ajustar las configuraciones de Vite y ESLint en sus respectivos archivos (`vite.config.js` y `.eslintrc.js`) según las necesidades del proyecto.

## Autor

Proyecto desarrollado por Laureano Correa.
