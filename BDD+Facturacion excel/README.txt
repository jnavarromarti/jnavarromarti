# Proyecto VBA para Gestión de Clientes y Facturación

Este proyecto VBA está diseñado para gestionar información de clientes y generar facturas de manera eficiente. Incluye funcionalidades para guardar, buscar, actualizar, eliminar clientes y generar facturas automáticamente en Microsoft Excel.

## Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Uso](#uso)

## Características

- **Guardar Cliente:** Guarda la información del cliente en la hoja de datos.
- **Buscar Cliente:** Busca un cliente por clave o nombre y apellidos.
- **Actualizar Cliente:** Actualiza la información del cliente si existen cambios.
- **Eliminar Cliente:** Elimina la información del cliente de la base de datos.
- **Generar Factura:** Crea facturas con la posibilidad de generar números de factura automáticamente.
- **Imprimir Factura:** Imprime la factura generada.
- **Validación de DNI:** Verifica si el DNI ingresado es válido.

## Requisitos

- Microsoft Excel 2010 o superior.

  ## Uso

### Guardar Cliente

1. Completa la información del cliente en las celdas correspondientes de `Hoja1`.
2. Ejecuta la macro `Save` para guardar la información.

### Buscar Cliente

1. Ingresa la clave del cliente o el nombre y apellidos en las celdas correspondientes de `Hoja1`.
2. Ejecuta la macro `Search` para buscar la información del cliente.

### Eliminar Cliente

1. Ingresa la clave del cliente que deseas eliminar en la celda `G9` de `Hoja1`.
2. Ejecuta la macro `Delete` para eliminar la información del cliente.

### Generar Factura

1. Asegúrate de que la información del cliente esté completa en `Hoja1`.
2. Ejecuta la macro `Bill` para generar una factura.
3. Para imprimir la factura, ejecuta la macro `Imprimir`.

### Validar DNI

La función `EsDNIValido` se encarga de validar si el DNI ingresado es correcto.

## Licencia

Este proyecto está no está bajo licencia.
## Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactarme directamente. Puedes descargar el modelo .xlsm desde esta misma carpeta.
