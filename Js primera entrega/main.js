// Simulador de Carrito de compras.

// Declaración de variables:
let opcionesDeInicio;
let cantidadProducto = 0;
let formaDePago;
let continuarCompra = false;
let nuevoUsuario;
let nuevaContraseña;
let nuevoPerfil;

// Array principal de productos:
const listaProductos = [{
        id: 1,
        imagen: "./img/productos/chica/drives/tsunami_9/tsunami_9_frente.png",
        nombre: "Jaminabox-18",
        tipo: "Overdrive",
        precio: 15000,
        desc: "Es un pedal de overdrive...",
        cantidad: 0
    },
    {
        id: 2,
        imagen: "./img/productos/chica/drives/tsunami_9/tsunami_9_frente.png",
        nombre: "Tsunami-9",
        tipo: "Overdrive",
        precio: 15000,
        desc: "Es un pedal de overdrive...",
        cantidad: 0
    },
    {
        id: 3,
        imagen: "./img/productos/chica/drives/dragon_71/the_dragon_71_frente.png",
        nombre: "Dragon-71",
        tipo: "Distorsión",
        precio: 15000,
        desc: "Es un pedal de distorsion...",
        cantidad: 0
    },
    {
        id: 6,
        imagen: "./img/productos/chica/modulaciones/spirit_92/spirit_92_frente.png",
        nombre: "Spirit-92",
        tipo: "Chorus",
        precio: 15000,
        desc: "Es un pedal de chorus...",
        cantidad: 0
    },
    {
        id: 7,
        imagen: "./img/productos/chica/modulaciones/pulstar_43/pulstar_43_frente.png",
        nombre: "Pulstar-43",
        tipo: "Trémolo",
        precio: 15000,
        desc: "Es un pedal de trémolo...",
        cantidad: 0
    },
    {
        id: 8,
        imagen: "./img/productos/chica/modulaciones/cosmos_vibe/cosmos_vibe_13_frente.png",
        nombre: "Cosmovibe-13",
        tipo: "Modulación",
        precio: 15000,
        desc: "Es un pedal de modulación mixto...",
        cantidad: 0
    },
    {
        id: 9,
        imagen: "./img/productos/chica/modulaciones/spiral_48/spiral_48_frente.png",
        nombre: "Spiral-48",
        tipo: "Phaser",
        precio: 15000,
        desc: "Es un pedal de phaser...",
        cantidad: 0
    },
    {
        id: 10,
        imagen: "./img/productos/chica/modulaciones/voices_2/voices_2_frente.png",
        nombre: "Voices-2",
        tipo: "Auto-Wha",
        precio: 15000,
        desc: "Es un pedal de filtro...",
        cantidad: 0
    },
];


// Declaracion de objetos.
class Articulo {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    };
};
/*
a este objeto tuve que declararlo aca arriba porque sino al utilizar el metodo .agregarAlCarrito del objeto
Usuario no me guardaba los objetos Articulos en el array del usuario..
*/

class Usuario {
    constructor(id, pass) {
        this.id = id;
        this.pass = pass;
        this.listaCarrito = [];
        this.subTotal = 0;
    };

    agregarAlCarrito = () => {
        let confirmarProducto = false;

        for (const el of listaProductos) {
            do {
                cantidadProducto = Number(prompt('NOMBRE: ' + el.nombre + '\nTIPO: ' + el.tipo + '\n DESCRIPCION: ' + el.desc + '\n PRECIO: ' + el.precio + '\n Ingrese la cantidad que quiere comprar!'));
                console.log(cantidadProducto);
                if (cantidadProducto > 0) {
                    this.listaCarrito.push(new Articulo(el.nombre, el.precio, cantidadProducto));

                } else if (cantidadProducto === 0) {
                    confirmarProducto = confirm('El producto no a sido agregado\n\n Desea agregarlo?'); //Uso var por conveniencia y evitar una linea de codigo.
                    console.log(confirmarProducto);
                };

            } while (cantidadProducto < 1 && confirmarProducto == true);
        };
        console.log(this.listaCarrito);
    };

    calcularTotal = () => {
        this.subTotal = this.listaCarrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
        console.log(this.subTotal);
        alert('El total de su compra es de: $' + this.subTotal);
    };
};


// Declaracion de funciones:

const seleccionDePago = () => {
    do {
        formaDePago = parseInt(prompt('Como desea pagar?\n1- Contado\n2- 3 cuotas fijas (Sin Interes)\n3- Cancelar Compra'));
        switch (formaDePago) {
            case 1:
                alert('El pago a sido realizado con exito!');
                break;

            case 2:
                let costoEnCuotas = Math.round(nuevoPerfil.subTotal / 3); // ACA TENGO UN PROBLEMA CON OBTENER EL VALOR DEL OBJETO.PROPIEDAD...
                alert('Su pago será de 3 cuotas de $' + costoEnCuotas);
                alert('El pago a sido realizado con exito!');
                break;

            case 3:
                alert('La compra a sido cancelada\n\nGracias por utilizar Tienda Cluster Efectos 1.4.22, BYE!');
                opcionesDeInicio = 2;
                break;

            default:
                alert('Opcion Incorrecta, Intente nuevamente.');
                break;
        }

    } while (formaDePago !== 1 && formaDePago !== 2 && formaDePago !== 3);
}


//Inicio del algoritmo:
alert('Bienvenido a Tienda Cluster Efectos v1.2.22');

opcionesDeInicio = confirm('Desea iniciar una compra?');

if (opcionesDeInicio) {

    alert('MUY BIEN!, Ahora vamos a crear un usuario para usted...');

    // INICIO Etapa de cración de Usuario.
    do {
        nuevoUsuario = prompt('Ingrese un nuevo usuario:'); // COMO PUEDO GUARDAR EL VALOR DE LA ENTRADA EN MAYUSCULAS SIEMPRE AUNQUE INGRESE MINUSCULAS??.

        switch (nuevoUsuario) {
            case "":
                alert('ATENCION!! Debe agregar un usuario para continuar');
                break;
            case null:
                alert('ATENCION!! Debe agregar un usuario para continuar');
                break;
            default:
                break;
        };

    } while (nuevoUsuario == "" || nuevoUsuario == null);

    do {
        nuevaContraseña = prompt('Ingrese su nueva contraseña (debe contener letras y un numeros):');

        switch (nuevaContraseña) {
            case "":
                alert('ATENCION!! Debe agregar una contraseña para continuar');
                break;
            case null:
                alert('ATENCION!! Debe agregar una contraseña para continuar');
                break;
            default:
                break;
        };

    } while (nuevaContraseña == "" || nuevaContraseña == null);

    nuevoPerfil = new Usuario(nuevoUsuario, nuevaContraseña);

    alert('Nuevo Usuario creado!\n' + 'US: ' + nuevoPerfil.id + '\nPASS: ' + nuevoPerfil.pass + '\nRECUERDELOS!');

    console.log(nuevoUsuario);
    console.log(nuevaContraseña);
    console.log(nuevoPerfil);
    // FIN Etapa de cración de Usuario.

    // INICIO Etapa de compra.
    nuevoPerfil.agregarAlCarrito();
    nuevoPerfil.calcularTotal();
    seleccionDePago();
    // FIN Etapa de compra.

} else {
    alert('Gracias por utilizar Tienda Cluster Efectos 1.4.22, BYE!');
};