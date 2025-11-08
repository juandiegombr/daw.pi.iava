# Plataforma de Monitoreo de Sensores Industriales

**[Read in English](PROJECT_OVERVIEW.md)**

## Visión del Proyecto

La Plataforma de Monitoreo de Sensores Industriales es un sistema de monitoreo en tiempo real diseñado para proporcionar visibilidad de máquinas industriales y equipos de fábrica a través de la recopilación y visualización de datos de sensores. Esta plataforma permite a gerentes de fábrica, equipos de mantenimiento y personal de operaciones monitorear parámetros críticos de su equipo industrial en un panel centralizado.

## El Problema

Las instalaciones industriales modernas tienen numerosas máquinas y equipos con varios sensores que miden parámetros críticos como temperatura, presión, vibración y otras métricas. Sin embargo, la gestión y el monitoreo de estos sensores suele estar fragmentado:

- **Información Dispersa**: Los datos de sensores a menudo están aislados en máquinas o sistemas individuales
- **Falta de Visibilidad**: No hay una vista centralizada de todos los sensores en la instalación
- **Monitoreo Manual**: Los operadores deben verificar físicamente el equipo o navegar por múltiples sistemas
- **Respuesta Retardada**: Los problemas pueden pasar desapercibidos hasta que ocurre una falla del equipo
- **Silos de Datos**: Diferentes máquinas utilizan diferentes sistemas de monitoreo

## Nuestra Solución

Una plataforma integrada basada en web que proporciona:

### Gestión Centralizada de Sensores

Una interfaz única para ver y gestionar todos los sensores en su instalación industrial. Registre sensores de cualquier máquina o línea de producción, especificando:

- **Alias del Sensor**: Nombre descriptivo (ej: "Temperatura Motor Cinta Transportadora")
- **Tipo de Dato**: Valores enteros, decimales, booleanos o de texto
- **Asociación de Máquina**: A qué equipo o línea de producción pertenece el sensor
- **Metadatos**: Fechas de creación, última actualización y estado del sensor

### Panel de Monitoreo en Tiempo Real

Una interfaz web responsive que muestra:

- **Sensores Activos**: Vista rápida de todos los sensores registrados
- **Estado del Sensor**: Indicadores visuales que muestran la salud y estado actual del sensor
- **Clasificación por Tipo**: Etiquetas con código de color para fácil identificación de tipos de datos
- **Acciones Rápidas**: Editar configuraciones de sensores o eliminar sensores obsoletos

### Recopilación y Gestión de Datos

Construido sobre una arquitectura robusta que soporta:

- **Múltiples Tipos de Datos**: Soporte para lecturas numéricas (int/float), booleanas y de texto
- **Almacenamiento Escalable**: Base de datos MongoDB para almacenamiento y recuperación eficiente
- **API RESTful**: Endpoints HTTP estándar para gestión de sensores
- **Preparado para el Futuro**: Arquitectura diseñada para soportar transmisión de datos en tiempo real

## Casos de Uso

### Monitoreo de Planta de Manufactura

**Escenario**: Una instalación de manufactura con más de 50 máquinas, cada una con múltiples sensores

**Solución**: Los operadores pueden:

- Ver todos los sensores de temperatura en las líneas de producción
- Identificar qué máquinas tienen sensores críticos
- Localizar y gestionar configuraciones de sensores rápidamente
- Preparar la infraestructura para alertas en tiempo real

### Mantenimiento Predictivo

**Escenario**: El equipo de mantenimiento necesita rastrear métricas de salud del equipo

**Solución**: La plataforma proporciona:

- Registro central de todos los sensores de vibración y temperatura
- Seguimiento histórico de instalaciones y cambios de sensores
- Base para futuros algoritmos de mantenimiento predictivo
- Identificación rápida de brechas en cobertura de sensores

### Control de Calidad

**Escenario**: Los equipos de aseguramiento de calidad necesitan monitorear parámetros de producción

**Solución**: Permite:

- Seguimiento de todos los sensores relacionados con calidad (presión, humedad, etc.)
- Verificación de cobertura de sensores en etapas de producción
- Gestión de metadatos de sensores para cumplimiento normativo
- Preparación para monitoreo de calidad en tiempo real

## Audiencia Objetivo

- **Gerentes de Fábrica**: Monitorear salud general de la instalación
- **Equipos de Mantenimiento**: Rastrear sensores de equipo para mantenimiento predictivo
- **Personal de Operaciones**: Ver métricas de producción en tiempo real
- **Aseguramiento de Calidad**: Monitorear sensores relacionados con calidad
- **Ingenieros Industriales**: Analizar datos de sensores para optimización

## Beneficios de Negocio

1. **Reducción de Tiempo de Inactividad**: Detección temprana de problemas de equipo
2. **Ahorro de Costos**: Prevenir fallas costosas de equipo
3. **Eficiencia Mejorada**: Identificación rápida de cuellos de botella
4. **Mejores Decisiones**: Insights basados en datos de analítica de sensores
5. **Cumplimiento**: Registro centralizado para requisitos regulatorios
6. **Escalabilidad**: Crecer desde proyecto piloto a despliegue en toda la instalación

## Métricas de Éxito

- Número de sensores registrados y monitoreados
- Reducción en tiempo de inactividad de equipo
- Tiempo de respuesta más rápido a alertas de sensores
- Adopción de usuarios en equipos de la instalación
- Tiempo de actividad y confiabilidad del sistema
- Tiempos de respuesta de API para operaciones de sensores

## Contribuir

Este es un proyecto educativo desarrollado como parte del curso DAW (Desarrollo de Aplicaciones Web).

## Licencia

ISC

## Contacto

Juan Diego Martín-Blas Ramos
