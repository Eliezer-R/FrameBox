# UnPlashBox

UnPlashBox es una aplicación web desarrollada con **React** en el frontend y **Express** + **MySQL** en el backend. Permite a los usuarios crear colecciones de imágenes, agregar imágenes a sus colecciones y visualizar sus colecciones de manera sencilla y rápida.
![image1](https://csyxkpbavpcrhwqhcpyy.supabase.co/storage/v1/object/public/challenges/59/Search%20-%20Default%20Page/desktop)

![image1](https://csyxkpbavpcrhwqhcpyy.supabase.co/storage/v1/object/public/challenges/59/Add%20new%20collection/desktop)

## Estructura del Proyecto

- **Frontend** (`/Frontend`):  
  - Construido con React y Vite.
  - Permite la gestión visual de colecciones e imágenes.
  - Incluye componentes modales para agregar y visualizar colecciones.
  - Utiliza hooks personalizados y contexto para el manejo de estado global.

- **Backend** (`/Backend`):  
  - API REST con Express.
  - Base de datos MySQL para almacenar usuarios, colecciones e imágenes.
  - Autenticación mediante JWT y cookies.
  - Endpoints para crear, consultar y agregar imágenes a colecciones.

## Principales Funcionalidades

- Crear usuario anónimo y gestionar sesión con JWT.
- Crear nuevas colecciones.
- Agregar imágenes a colecciones existentes.
- Visualizar todas las colecciones y sus imágenes.
- Modal para agregar colecciones y visualizar imágenes.

## Instalación y Ejecución

1. Clona el repositorio.
2. Configura los archivos `.env` en **Frontend** y **Backend** con tus variables necesarias (puertos, claves, credenciales de DB).
3. Instala dependencias con `pnpm install` en ambos directorios.
4. Inicia el backend:  
   ```bash
   pnpm start
   ```
5. Inicia el frontend:  
   ```bash
   pnpm dev
   ```
6. Accede a la app en [http://localhost:5173](http://localhost:5173).

## Futuros Cambios y Mejoras

- **Eliminar colecciones e imágenes:**  
  Agregar endpoints y botones en la interfaz para borrar colecciones o imágenes específicas.

- **Mejor modularidad:**  
  Separar la lógica de rutas, controladores y helpers en el backend para facilitar el mantenimiento y escalabilidad.

- **Validaciones avanzadas:**  
  Mejorar la validación de datos tanto en frontend como en backend para evitar errores y mejorar la experiencia de usuario.

- **Gestión de usuarios:**  
  Permitir registro y login de usuarios, así como la edición de perfil.

- **Mejor feedback de errores:**  
  Mostrar mensajes de error más claros y amigables en la interfaz.

- **Optimización de rendimiento:**  
  Implementar paginación y lazy loading para colecciones e imágenes.

- **Pruebas unitarias y de integración:**  
  Añadir tests para asegurar la calidad y robustez del código.

## Contribuciones

Las contribuciones son bienvenidas. Puedes abrir issues para sugerencias o reportar bugs, y enviar pull requests con mejoras.