//DECLARACION DE FUNCIONES.

// Creo una función agregarAlCarrito que busca el producto por su id y lo agrega al array del carrito.
const agregarAlCarrito = (id) => {
  // Recorre el array y trae el elemento que tenga un id que coincida con el id del producto seleccionado.
  let item = listaProductos.find((producto) => producto.id === id);
  // Busco en el carrito si existe un elemento de id igual al que saque de listaProductos.
  let itemCarrito = listaCarrito.find((producto) => producto.id === item.id);
  // Si el elemento existe en el carrito, solo cambia su cantidad y sino agrega uno nuevo.
  if (itemCarrito) {
    itemCarrito.cantidad++;
    actualizarCarrito();
  } else {
    // Agrega el item nuevo al array del carrito y sumo 1 a la cantidad del producto.
    listaCarrito.push(item);
    // Busco el producto que se agrego en la listaCarrito y pongo su cantidad en 1.
    itemCarrito = listaCarrito.find((producto) => producto.id === id);
    itemCarrito.cantidad = 1;
    // Muestro el item en el modal.
    mostrarEnCarrito();
  }
  // Muestro la cantidad de productos.
  contadorCarrito();
  calcularSubTotal();
  guardarCarrito();
};

// Creo una función que cuenta la cantidad de items agregados al carrito.
const contadorCarrito = () => {
  const contadorItems = document.getElementById("contador");
  //Recorro el array del carrito y sumo todas las cantidades.
  contador = listaCarrito.reduce((acc, el) => acc + el.cantidad, 0);
  contadorItems.innerText = contador;
};

// Creo una Funcion para mostrar los items que existen en el array del carrito dentro del modal.
const mostrarEnCarrito = () => {
  // Borro el modal para evitar duplicados.
  modal.innerHTML = ``;
  // Recorro el array listaCarrito y pinto cada elemento.
  listaCarrito.forEach((producto) => {
    let { id, imagen, nombre, precio, cantidad } = producto;
    const div = document.createElement("div");
    div.className = "item-carrito";
    div.setAttribute("id", `item${id}`); // setAttribute(type, value) me permite asignarle un atributo.
    div.innerHTML = `
                    <div class="img-item">
                        <img src="${imagen}">
                    </div>
                    <div class="desc-item">
                        <p>${nombre}</p>
                        <p>Precio: <i class="fas fa-dollar-sign">${precio}</i></p>
                        <p>Cantidad: <span id="cantidad">${cantidad}</span></p>
                    </div>
                    <div class="btn-item">
                        <button id= "btn-eliminar${id}" class="btn-eliminar"><i class="far fa-minus-square"></i></button>
                    </div>
                `;

    modal.appendChild(div);

    // Le asigno un evento al boton eliminar de cada elemento.
    const btneliminar = document.getElementById(`btn-eliminar${id}`);
    btneliminar.addEventListener("click", () => {
      eliminarDelCarrito(id);
      calcularSubTotal();
    });
  });
};

// Creo una función eliminarDelCarrito que busca el producto por su id y lo elimina del array del carrito.
const eliminarDelCarrito = (id) => {
  let item = listaCarrito.find((producto) => producto.id === id);
  let indiceDeItem = listaCarrito.indexOf(item);
  // Si el producto tiene una cantidad mayor a 1 solo se resta -1 en su cantidad.
  if (item.cantidad > 1) {
    // resto -1 a la cantidad.
    item.cantidad -= 1;
    actualizarCarrito();
  } else {
    // reinicio la cantidad a 0 y elimino el item total indicado en el array del carrito.
    item.cantidad = 0;
    listaCarrito.splice(indiceDeItem, 1);
    const itemHtml = document.getElementById(`item${id}`);
    itemHtml.remove();
    actualizarCarrito();
  }
  // Muestro la cantidad de productos.
  contadorCarrito();
  guardarCarrito();
};

// Creo una función que actualiza el carrito de ser necesario.
const actualizarCarrito = () => {
  modal.innerHTML = ``;
  listaCarrito.forEach((producto) => {
    mostrarEnCarrito();
  });
};

// Creo una función que calcula el costo del Subtotal del carrito.
const calcularSubTotal = () => {
  subTotal = listaCarrito.reduce((acc, el) => acc + el.cantidad * el.precio, 0);
  console.log(subTotal);
  const subtotalCarrito = document.getElementById("subtotal-compra");
  subtotalCarrito.innerText = subTotal.toFixed(2);
};

// Creo una función para calcular el total de la compra.
const calcularTotalCompra = () => {
  const subtotal = document.getElementById("subtotal-carrito");
  subtotal.innerText = subTotal.toFixed(2);

  const selEnvio = document.getElementById("menu-envio");
  costoEnvio = Number(selEnvio.value);
  totalCompra = subTotal + costoEnvio;

  const precioTotal = document.getElementById("total-compra");
  precioTotal.innerText = totalCompra.toFixed(2);
};

// Creo una función que calcula las cuotas.
const calcularCuotas = (total, cuotas) => {
  return total / cuotas;
};

// Creo una función para vaciar el carrito.
const vaciarCarrito = () => {
  // Condiciono el estado del array listaCarrito.
  if (listaCarrito.length > 0) {
    // Reinicio el array del carrito.
    listaCarrito = [];
    // Actualizo el modal del carrito.
    actualizarCarrito();
    // Reinicio el contador del carrito.
    contadorCarrito();
    // Reinicio el subTotal
    calcularSubTotal();
    // Limpio el localStorage.
    localStorage.clear();
    //Muestro mensaje de listo.
    Swal.fire({
      title: "Vaciaste el Carrito",
      text: "Todos tus productos se han quitado",
      icon: "success",
      backdrop: true,
      allowOutsideClick: false,
      confirmButtonText: "OK",
    });
    console.log(listaCarrito);
  } else {
    // Muestro mensaje de advertencia.
    Swal.fire({
      title: "Atención",
      text: "El carrito no contiene productos",
      icon: "warning",
      showConfirmButton: false,
      timer: "3000",
    });
  }
};

// GUARDAR Y RECUPERAR DATOS DEL STORAGE
// Creo una funcion que guarda el carrito en Storage.
const guardarCarrito = () => {
  nubeCarrito = JSON.stringify(listaCarrito);
  localStorage.setItem("carrito", nubeCarrito);
};

// Creo una función que recupera los datos del Storage.
const recuperarCarrito = () => {
  nubeRecuperada = localStorage.getItem("carrito");
  console.log(nubeRecuperada);
  listaCarrito = JSON.parse(nubeRecuperada);
};
