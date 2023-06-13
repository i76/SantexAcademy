// Cada producto que vende el super es creado con esta clase
class Producto {
    sku; // Identificador único del producto
    nombre; // Su nombre
    categoria; // Categoría a la que pertenece este producto
    precio; // Su precio
    stock; // Cantidad disponible en stock
  
    constructor(sku, nombre, precio, categoria, stock) {
      this.sku = sku;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
  
      // Si no me definen stock, pongo 10 por defecto
      if (stock) {
        this.stock = stock;
      } else {
        this.stock = 10;
      }
    }
  }
  
  // Creo todos los productos que vende mi super
  const queso = new Producto("KS944RUR", "Queso", 10, "lacteos", 4);
  const gaseosa = new Producto("FN312PPE", "Gaseosa", 5, "bebidas");
  const cerveza = new Producto("PV332MJ", "Cerveza", 20, "bebidas");
  const arroz = new Producto("XX92LKI", "Arroz", 7, "alimentos", 20);
  const fideos = new Producto("UI999TY", "Fideos", 5, "alimentos");
  const lavandina = new Producto("RT324GD", "Lavandina", 9, "limpieza");
  const shampoo = new Producto("OL883YE", "Shampoo", 3, "higiene", 50);
  const jabon = new Producto("WE328NJ", "Jabon", 4, "higiene", 3);
  
  // Genero un listado de productos. Simulando base de datos
  const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];
  
  // Cada cliente que venga a mi super va a crear un carrito
  class Carrito {
    productos; // Lista de productos agregados
    categorias; // Lista de las diferentes categorías de los productos en el carrito
    precioTotal; // Lo que voy a pagar al finalizar mi compra
  
    // Al crear un carrito, empieza vacío
    constructor() {
      this.precioTotal = 0;
      this.productos = [];
      this.categorias = [];
    }
  
    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    agregarProducto(sku, cantidad) {
      console.log(`Agregando ${cantidad} ${sku}`);
  
      // Busco el producto en la "base de datos"
      const producto = productosDelSuper.find(product => product.sku === sku);
  
      if (producto) {
        // Verifico si el producto ya está en el carrito
        const productoEnCarrito = this.productos.find(p => p.sku === sku);
  
        if (productoEnCarrito) {
          // El producto ya está en el carrito, actualizo la cantidad
          productoEnCarrito.cantidad += cantidad;
        } else {
          // El producto no está en el carrito, lo agrego
          const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
          this.productos.push(nuevoProducto);
          this.categorias.push(producto.categoria);
        }
  
        this.precioTotal += producto.precio * cantidad;
      } else {
        console.log(`Error: Producto ${sku} no encontrado`);
      }
    }
  
    /**
     * función que elimina @{cantidad} de productos con @{sku} del carrito
     */
    eliminarProducto(sku, cantidad) {
      return new Promise((resolve, reject) => {
        const productoEnCarrito = this.productos.find(p => p.sku === sku);
  
        if (productoEnCarrito) {
          if (cantidad < productoEnCarrito.cantidad) {
            // Resto la cantidad del producto en el carrito
            productoEnCarrito.cantidad -= cantidad;
          } else {
            // Elimino el producto del carrito
            const index = this.productos.indexOf(productoEnCarrito);
            this.productos.splice(index, 1);
            this.categorias = [...new Set(this.productos.map(p => p.categoria))];
          }
          this.precioTotal -= productoEnCarrito.precio * cantidad;
          resolve();
        } else {
          reject(`Error: Producto ${sku} no encontrado en el carrito`);
        }
      });
    }
  }
  
  // Cada producto que se agrega al carrito es creado con esta clase
  class ProductoEnCarrito {
    sku; // Identificador único del producto
    nombre; 
    cantidad; 
  
    constructor(sku, nombre, cantidad) {
      this.sku = sku;
      this.nombre = nombre;
      this.cantidad = cantidad;
    }
  }
  
  const carrito = new Carrito();
  carrito.agregarProducto("WE328NJ", 2);
  
  // Ejemplo de uso de eliminarProducto utilizando .then() y .catch()
  carrito.eliminarProducto("WE328NJ", 1)
    .then(() => {
      console.log("Producto eliminado del carrito");
    })
    .catch(error => {
      console.log(error);
    });
  