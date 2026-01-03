# Dashboard Project - Guía de Estructura Angular

Esta es una guía simple para entender qué debe ir en cada carpeta de tu proyecto Angular 21.

## 📁 ¿Qué va en cada carpeta?

### 📦 **core/** - Cosas que se usan en TODA la aplicación

#### **core/services/**
Servicios que toda la app necesita (solo hay UNA instancia):
- `auth.service.ts` - Maneja login, logout, verificar si está logueado
- `api.service.ts` - Hace las llamadas al backend
- `storage.service.ts` - Guarda datos en localStorage o sessionStorage
- `notification.service.ts` - Muestra mensajes al usuario

#### **core/guards/**
Protegen tus rutas (páginas que requieren estar logueado):
- `auth.guard.ts` - Revisa si el usuario está logueado antes de entrar a una página
- `role.guard.ts` - Revisa si el usuario tiene permisos (admin, user, etc.)

#### **core/interceptors/**
Interceptan las peticiones HTTP antes de enviarlas o recibir respuestas:
- `auth.interceptor.ts` - Añade el token de autenticación a cada petición
- `error.interceptor.ts` - Maneja errores globales (401, 403, 500)
- `loading.interceptor.ts` - Muestra un spinner mientras carga

#### **core/models/**
Clases que representan tus datos:
```typescript
// user.model.ts
export class User {
  id: number;
  name: string;
  email: string;
}
```

#### **core/interfaces/**
Contratos de tipos para TypeScript:
```typescript
// user.interface.ts
export interface IUser {
  id: number;
  name: string;
  email: string;
}
```

#### **core/enums/**
Conjuntos de valores fijos:
```typescript
// user-role.enum.ts
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST'
}
```

#### **core/constants/**
Valores que nunca cambian:
```typescript
// api.constants.ts
export const API_URL = 'http://localhost:3000/api';
export const TOKEN_KEY = 'auth_token';
```

---

### 🔄 **shared/** - Cosas que se REUTILIZAN en varios lugares

#### **shared/components/**
Componentes que usas en muchos sitios:
- `button.component.ts` - Botón personalizado
- `modal.component.ts` - Ventana emergente
- `card.component.ts` - Tarjeta reutilizable
- `table.component.ts` - Tabla genérica
- `spinner.component.ts` - Cargando...

#### **shared/directives/**
Agregan comportamiento a elementos HTML:
```typescript
// highlight.directive.ts - Resalta texto al pasar el mouse
// tooltip.directive.ts - Muestra un tooltip
// click-outside.directive.ts - Detecta clicks fuera de un elemento
```

#### **shared/pipes/**
Transforman datos en las vistas:
```typescript
// date-format.pipe.ts - Formatea fechas: {{ fecha | dateFormat }}
// currency.pipe.ts - Formatea moneda: {{ precio | currency }}
// truncate.pipe.ts - Corta textos largos
```

#### **shared/validators/**
Validaciones personalizadas para formularios:
```typescript
// email-validator.ts - Valida emails personalizados
// password-strength.validator.ts - Verifica contraseñas fuertes
```

---

### 🎯 **features/** - Cada FUNCIONALIDAD de tu app

Cada carpeta aquí es una "sección grande" de tu aplicación:

#### **features/dashboard/**
Todo lo relacionado con el dashboard:
- `components/` - Gráficas, widgets, estadísticas del dashboard
- `services/` - Servicio que trae datos del dashboard
- `dashboard.component.ts` - Página principal del dashboard

#### **features/auth/**
Todo lo de autenticación:
- `components/` 
  - `login.component.ts` - Formulario de login
  - `register.component.ts` - Formulario de registro
  - `forgot-password.component.ts` - Recuperar contraseña
- `services/`
  - `auth.service.ts` - Lógica de login/registro

**Puedes crear más features:**
- `features/users/` - Gestión de usuarios
- `features/products/` - Gestión de productos
- `features/reports/` - Reportes
- etc.

---

### 🎨 **layout/** - La ESTRUCTURA visual de tu app

#### **layout/header/**
La barra superior:
- `header.component.ts` - Logo, menú, perfil del usuario
- `navbar.component.ts` - Links de navegación

#### **layout/sidebar/**
El menú lateral:
- `sidebar.component.ts` - Menú de opciones a la izquierda/derecha

#### **layout/footer/**
El pie de página:
- `footer.component.ts` - Copyright, links, info

---

### 🛠️ **utils/** - Funciones AUXILIARES

Funciones pequeñas que te ayudan:
```typescript
// date.utils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES');
}

// string.utils.ts
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// array.utils.ts
export function removeDuplicates(arr: any[]): any[] {
  return [...new Set(arr)];
}
```

---

### 🖼️ **assets/** - Archivos ESTÁTICOS

#### **assets/images/**
Imágenes de tu app:
- `logo.png`, `banner.jpg`, `profile-default.png`

#### **assets/icons/**
Iconos:
- `menu.svg`, `close.svg`, `search.svg`

#### **assets/fonts/**
Fuentes personalizadas:
- `Roboto.ttf`, `OpenSans.woff`

---

### ⚙️ **environments/** - CONFIGURACIÓN por entorno

#### **environment.ts** (Desarrollo)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Servidor local
};
```

#### **environment.prod.ts** (Producción)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.miapp.com/api'  // Servidor real
};
```

---

## 🎯 Reglas de nombres (importante!)

- **Archivos**: `user-profile.component.ts` (con guiones)
- **Clases**: `UserProfileComponent` (PascalCase)
- **Variables**: `userName` (camelCase)
- **Constantes**: `API_URL` (MAYÚSCULAS)

---

## 💡 Resumen rápido:

- **core/** = Servicios y cosas únicas para toda la app
- **shared/** = Componentes y código que reutilizas
- **features/** = Cada sección grande de tu aplicación
- **layout/** = Header, footer, sidebar (estructura visual)
- **utils/** = Funciones pequeñas de ayuda
- **assets/** = Imágenes, iconos, fuentes
- **environments/** = Configuración de desarrollo y producción

---

## 🚀 Comandos básicos:

```bash
npm install          # Instala dependencias
npm start            # Inicia la app
ng generate component features/users/components/user-list  # Crea componente
ng generate service core/services/api                      # Crea servicio
```
