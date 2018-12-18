# BaratonApp

Test elaborado por `Cesar Artezan`

## Pasos para compilar

### Hay dos formas de correr el programa

1. **Ir directo a este github pages** [https://artezan.github.io/rappi-test/](https://artezan.github.io/rappi-test/)
2. Con un servidor NodeJS
   1. Instalar Node https://nodejs.org/en/
   2. Descargar el proyecto con `git clone https://github.com/artezan/rappi-test.git` y luego `npm i`
   3. ir a `cd rappi-test`
   4. Ejecutar el servidor con `node server.js` el cual iniciará un servidor nodejs en http://localhost:3000/ apuntando hacia el proyecto compilado.

## Datos del proyecto

- Esta realizado con Angular 7+ (framework de JavaScript que trabaja con TypeScript 3.2)
- Se utilizó https://material.angular.io/ para algunos componentes y además se implementó CSS
- Se creó un servidor nodeJS para facilitar su testing

## Resolución del problema

Se siguió la siguiente metodología basado en estándares de PSP y TSP:

1. Se entendió y se leyó a detalle la hoja de requerimientos
2. Se analizó profundamente el modelo de datos
   - en esta parte cabe destacar que se detectó defectos en los datos más no en el modelo de datos, es decir, el modelo hablando de una base de datos NoSQL sigue este esquema

```typescript
interface CategoryModel {
  img: string;
  id: number;
  name: string;
  sublevels?: SublevelModel[];
}
interface SublevelModel {
  img?: string;
  id: number;
  name: string;
  sublevels?: SublevelModel[];
}
interface ProductModel {
  quantity: number;
  price: string;
  available: boolean;
  sublevel_id: number; // <-- relación con un sublevel
  name: string;
  id: string;
}
```

Por lo tanto algunos productos en el archivo adjunto tenían un ID de Categoría y no de Sublevel, dado que en las instrucciones dice que " se puede modificar los datos sin cambiar la estructura de los archivos", se editó los prodcutos con un id de categoría a un id de sublevel.

Para recuperar los productos guardados en el carrito de compras se utilizó una Api Html `window.localStorage`, después se convirtió en un observable para detectar los cambios en tiempo real

Para los filtros y ordenamientos se implementó arreglos de JavaScript.
