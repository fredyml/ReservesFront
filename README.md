# Sistema de Gestión de Reservas

Este proyecto es una aplicación web diseñada para gestionar reservas de espacios y usuarios. Proporciona una interfaz intuitiva para realizar, editar y eliminar reservas, con funcionalidades adicionales como filtrado y validación.

## Características principales

### Gestión de Reservas
- Crear nuevas reservas seleccionando un espacio, un usuario y un rango de fechas.
- Eliminar reservas.

### Filtros Dinámicos
- Filtrar reservas por ID, nombre del espacio, nombre del usuario o rango de fechas.

### Interfaz de Usuario Intuitiva
- Interfaz estilizada y moderna.
- Modal para la creación y edición de reservas.
- Validaciones visuales para formularios.

### Conexión con API
- Consulta de espacios y usuarios disponibles desde el backend.
- Sincronización en tiempo real de reservas con el servidor.

## Tecnologías utilizadas

### Frontend
- **Angular**: Framework principal utilizado para la construcción de la aplicación.
- **HTML5 y CSS3**: Estructura y estilos de la aplicación.
- **TypeScript**: Lenguaje principal para el desarrollo en Angular.
- **Reactive Forms**: Manejo de formularios reactivos.

### Backend
- **Servicios HTTP**: Conexión con el servidor para gestionar datos de reservas, usuarios y espacios.

### Estilos
- Estilos personalizados con colores y animaciones:
  - Colores principales: Azul oscuro (#1d3557) y blanco.
  - Sombreados y transiciones para botones e inputs.
  - Modal animado con transiciones suaves.

## Estructura de la Aplicación

### Componentes principales

#### `reservations.component.ts`
- Lógica principal de la aplicación.
- Manejo de eventos como creación y eliminación de reservas.

#### `reservations.component.html`
- Vista principal con la tabla de reservas, botones de acción y filtros.

#### `reservations.component.css`
- Estilos personalizados para los componentes y elementos de la UI.

### Servicios

#### `ReservationsService`
- Gestiona las llamadas al backend para:
  - Obtener la lista de reservas.
  - Consultar espacios y usuarios disponibles.
  - Crear nuevas reservas.
  - Eliminar reservas existentes.

## Pruebas

- Unit tests implementados con **Jasmine** para garantizar el correcto funcionamiento de los componentes y servicios.

## Guía de uso

### Instalación
1. Clona el repositorio.
2. Instala las dependencias utilizando `npm install`.

### Ejecución
1. Ejecuta `ng serve` para iniciar el servidor de desarrollo.
2. Abre el navegador en [http://localhost:4200/](http://localhost:4200/).

### Uso de la Aplicación
1. Accede a la tabla principal para ver las reservas existentes.
2. Utiliza los filtros para buscar reservas específicas.
3. Haz clic en "Crear Reserva" para añadir una nueva.
4. Usa el botón de eliminar para cancelar una reserva existente.

## Contribuciones

Si deseas contribuir al desarrollo de esta aplicación:
1. Crea un fork del repositorio.
2. Realiza tus cambios en una rama nueva.
3. Envía un pull request describiendo las modificaciones realizadas.

## Licencia

Este proyecto se encuentra bajo la licencia **MIT**.
