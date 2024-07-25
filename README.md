# Agenda de citas
Este proyecto es una aplicación de agenda virtual que permite gestionar citas de manera eficiente. La aplicación está construida con React, Tailwind CSS y utiliza Zustand para la gestión del estado y Zod para la validación de datos.


## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js
- npm

## Instalación

1. Clona el repositorio a tu máquina local:

    ```bash
    git clone https://github.com/agustinfraile/calendar-bilog.git
    cd calendar-bilog
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

## Ejecución

1. Inicia la aplicación en modo desarrollo:

    ```bash
    npm run dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Componentes Principales

1. **CalendarSection**: Este componente muestra el calendario semanal y permite la navegación entre semanas. También muestra las citas programadas y permite abrir modales para crear o editar citas.

2. **NewAppointmentModal**: Este componente es un modal que permite crear una nueva cita. Incluye un formulario para seleccionar la fecha, hora y nombre del paciente.

3. **EditAppointmentModal**: Este componente es un modal que permite editar una cita existente. Incluye un formulario para actualizar la fecha, hora y nombre del paciente, así como un botón para eliminar la cita.

4. **UI Components**: Componentes reutilizables como botones y tarjetas.

5. **Store**: Gestión del estado global utilizando Zustand.
