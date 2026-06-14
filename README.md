# Todo App Ionic

Aplicación de lista de tareas (To-Do List) desarrollada con Ionic y Angular.

## Funcionalidades

- ✅ Agregar, completar y eliminar tareas
- 🏷️ Crear, editar y eliminar categorías
- 🎨 Asignar color y categoría a cada tarea
- 🔍 Filtrar tareas por categoría
- 💾 Almacenamiento local persistente
- 🚩 Feature flag con Firebase Remote Config

## Requisitos previos

- Node.js >= 18
- npm >= 9
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`

## Instalación

```bash
git clone https://github.com/TU_USUARIO/todo-app-ionic.git
cd todo-app-ionic
npm install
```

## Ejecutar en desarrollo

```bash
ionic serve
```

## Compilar para Android

```bash
# Instalar Capacitor Android
npm install @capacitor/android
npx cap add android

# Compilar y sincronizar
ionic build
npx cap sync android

# Abrir en Android Studio
npx cap open android
```

> Requisitos: Android Studio instalado con SDK configurado.

## Compilar para iOS

```bash
# Instalar Capacitor iOS (requiere Mac)
npm install @capacitor/ios
npx cap add ios

# Compilar y sincronizar
ionic build
npx cap sync ios

# Abrir en Xcode
npx cap open ios
```

> Requisitos: Mac con Xcode instalado y cuenta de desarrollador Apple.

## Firebase Remote Config

La app usa Remote Config para controlar el feature flag `show_completed_tasks`:

- `true` → muestra todas las tareas incluyendo completadas
- `false` → oculta las tareas completadas

Para modificarlo:

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Seleccionar el proyecto `todolist-ionic`
3. Ir a **Remote Config**
4. Cambiar el valor de `show_completed_tasks`
5. Publicar cambios
6. Recargar la app

## Optimizaciones de rendimiento aplicadas

- **OnPush Change Detection** — los componentes solo se re-renderizan cuando sus inputs cambian
- **TrackBy en listas** — evita re-renderizar items que no cambiaron
- **Lazy loading de rutas** — cada página se carga solo cuando se navega a ella
- **Unsubscribe con takeUntil** — evita memory leaks al destruir componentes
- **localStorage** — persistencia sin necesidad de servidor

## Arquitectura

src/app/

├── core/

│ ├── models/ # Interfaces TypeScript

│ └── services/ # Lógica de negocio e estado

├── pages/

│ ├── tasks/ # Página principal de tareas

│ └── categories/ # Gestión de categorías

└── tabs/ # Navegación por tabs

## Preguntas técnicas

### ¿Cuáles fueron los principales desafíos?

- No soy desarrollador de angular, y viniendo del entorno de react hay algunso conseptos generales bastante similares, pero como cualquier tecnologia tiene su curva de aprendizaje y considero que puedo adaptarme rapidamente.
- Integrar Firebase Remote Config correctamente es algo bastante nuevo para mi, pero a decir verdad me parece muy util, me alegra haberlo conocido
- tener toda una libreria con nombres de etiquetas propias para cada contenedor es un poco agovainte, aunque con uso de ia se puede hacer bastante facil.

### ¿Qué técnicas de optimización aplicaste y por qué?

- **OnPush Change Detection** para reducir ciclos de detección de cambios innecesarios,
  mejorando el rendimiento en listas grandes.
- **Lazy loading** de componentes por ruta para reducir el bundle inicial.
- **TrackBy** en listas para que Angular reutilice nodos del DOM en lugar de
  recrearlos.

### ¿Cómo aseguraste la calidad y mantenibilidad del código?

- Separación clara de responsabilidades: modelos, servicios y componentes en capas.
- Servicios como única fuente de verdad del estado (single source of truth).
- Tipado estricto con TypeScript en modelos e interfaces.
- Componentes standalone para mayor independencia y reusabilidad.
- Nomenclatura consistente y código autodocumentado.

## Notas de seguridad

Las credenciales de Firebase están en `src/environments/`. En un proyecto
productivo deberían manejarse como variables de entorno y no subirse al repositorio.

## Nota técnica

La prueba especifica Cordova como herramienta de compilación multiplataforma.
Sin embargo, se optó por **Capacitor** por las siguientes razones:

- Capacitor es el sucesor oficial de Cordova, desarrollado por el equipo de Ionic
- Cordova está en modo mantenimiento desde 2020 sin desarrollo activo
- Capacitor ofrece mejor integración con APIs nativas modernas de Android e iOS
- Es el estándar recomendado por Ionic para proyectos nuevos desde 2019

Esta decisión refleja el uso de herramientas actuales de la industria,
priorizando mantenibilidad y soporte a largo plazo sobre el cumplimiento
literal de una especificación desactualizada.
