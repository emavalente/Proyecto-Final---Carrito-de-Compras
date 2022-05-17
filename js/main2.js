// DECLARACION DE VARIABLES.
let listaCarrito = [];
let listaProductos = [];
let contador = 0;
let costoEnvio = 0;
let subTotal = 0;
let totalCompra = 0;
let nubeCarrito;
let nubeRecuperada;
//let cantidadCuotas;

// LOADING:
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.classList.toggle("loaderExit");
  }, 3000);
});

// ACCIONES DEL MODAL CARRITO:
const btnModal = document.getElementById("btn-carrito");
const ventanaModal = document.getElementById("modal");

//Mostrar y ocultar el modal Carrito.
btnModal.addEventListener("click", () => {
  ventanaModal.classList.toggle("modal-show"); // toggle intercambia entre clases.
});

//Armado Inicial del Modal.
const div = document.createElement("div");
div.className = "modalCarrito";
div.innerHTML = `
 <div class="titulo-carrito">
     <h3>Lista de Productos</h3>
 </div>
 <hr>
 <div id="contenido-carrito">
     <!-- Aqui se agrega la lista del carrito mediante javascript -->
 </div>
 <p class="precio-total">Subtotal: <i id="subtotal-compra" class="fas fa-dollar-sign">0</i></p>
 <div class="botonesModal">
     <button id="btn-vaciar" class="btn-agregar btn-modal">Vaciar Carrito</button>
     <button id="btn-comprar" class="btn-agregar btn-modal">Comprar</button>
 </div>
`;
ventanaModal.appendChild(div);

const modalCompra = document.createElement("div");
modalCompra.className = "modalCarrito carrito-hide";
modalCompra.innerHTML = `
  <div class="titulo-carrito">
    <h3>Compra a realizar</h3>
  </div>
  <hr>
  <i class="fa-solid fa-truck-fast icono"></i>
  <form class="opcionesEnvio">
    <select id="menu-envio" class"menu-envio" name="envios">
      <option value="0" disabled selected>-- Seleccione tipo de envio --</option>
      <option value="350">Provincia Bs. As.</option>
      <option value="700">Interior del pais</option>
    </select>
  </form>

  <h3 class="subtitulo">¿Cómo quieres pagar?</h3>
  <hr>
  <form class="opcionesPago">
    <div class="pago">
      <label class="opcion">
      <input type="radio" name="pagos" value="fijo" class="radio" id="pago1" checked>
      <i class="fas fa-money-check-alt icono"><span>Pago Virtual</span></i>
    </label>
    <label class="opcion">
      <input type="radio" name="pagos" value="cuotas" class="radio" id="pago2">
      <i class="fas fa-credit-card icono"><span>Tarjeta de crédito</span></i>
    </label>
    </div>
    <div id="cuotas" class="cuotas-hide">
      <label class="opCuotas">
      <input type="radio" name="cuotas" value="3" class="radio">
      3 cuotas
      </label>
      <label class="opCuotas">
      <input type="radio" name="cuotas" value="6" class="radio">
      6 cuotas
      </label>
      <label class="opCuotas">
      <input type="radio" name="cuotas" value="12" class="radio">
      12 cuotas
      </label>
    </div>
  </form>

  <hr>
  <div class="costos">
    <p class="costo-subtotal">Subtotal: <i id="subtotal-carrito" class="fas fa-dollar-sign">0</i></p>
    <p class="costo-envio">Costo envio: <i id="precio-envio" class="fas fa-dollar-sign">0</i></p>
    <p class="precio-total">Costo total: <i id="total-compra" class="fas fa-dollar-sign">0</i><span id="detalle-cuotas"></span></p>
  </div>
  <div class="botonesModal">
    <button id="btn-volver" class="btn-agregar btn-modal">Volver</button>
    <button id="btn-fincompra" class="btn-agregar btn-modal">Finalizar Compra</button>
  </div>
`;
ventanaModal.appendChild(modalCompra);

//Boton Vaciar Carrito.
const btnVaciar = document.getElementById("btn-vaciar");
btnVaciar.addEventListener("click", vaciarCarrito);

//Boton Comprar.
const btnComprar = document.getElementById("btn-comprar");
btnComprar.addEventListener("click", () => {
  if (listaCarrito.length > 0) {
    div.classList.toggle("carrito-hide");
    modalCompra.classList.toggle("carrito-hide");
    calcularTotalCompra();
  } else {
    Swal.fire({
      title: "Ups!",
      text: "Para comprar agrega productos al carrito!",
      icon: "warning",
      showConfirmButton: false,
      timer: "3000",
    });
  }
});

//Boton Volver.
const btnVolver = document.getElementById("btn-volver");
btnVolver.addEventListener("click", () => {
  div.classList.toggle("carrito-hide");
  modalCompra.classList.toggle("carrito-hide");
});

// ACCIONES DEL MODAL DE COMPRA.

//Seleccion de Envio.
const selEnvio = document.getElementById("menu-envio");
selEnvio.addEventListener("change", () => {
  calcularTotalCompra();
  const precioEnvio = document.getElementById("precio-envio");
  precioEnvio.innerText = costoEnvio.toFixed(2);
});

//Seleccion de Pago en cuotas.
const opcionPago = document.getElementsByName("pagos");
const precioCuotas = document.getElementById("detalle-cuotas");

opcionPago.forEach((radio) => {
  radio.addEventListener("change", () => {
    const contCuotas = document.getElementById("cuotas");
    if (radio.checked && radio.value === "cuotas") {
      contCuotas.classList.toggle("cuotas-hide");
    } else {
      contCuotas.classList.toggle("cuotas-hide");
      precioCuotas.innerText = ``;
    }
  });
});

const opcionCuotas = document.getElementsByName("cuotas");

opcionCuotas.forEach((radio) => {
  radio.addEventListener("change", () => {
    switch (radio.value) {
      case "3":
        precioCuotas.innerText = `3 x $${calcularCuotas(totalCompra, 3).toFixed(2)}`;
        break;

      case "6":
        precioCuotas.innerText = `6 x $${calcularCuotas(totalCompra, 6).toFixed(2)}`;
        break;

      case "12":
        precioCuotas.innerText = `12 x $${calcularCuotas(totalCompra, 12).toFixed(2)}`;
        break;

      default:
        break;
    }
  });
});

// MOSTRAR PRODUCTOS EN PANTALLA: Utilizo fetch para llamar al archivo .json y por cada objeto pinto la card dentro del main html.
const contenedor = document.getElementById("contProductos");
const modal = document.getElementById("contenido-carrito");

fetch("./productos.json")
  .then((responce) => responce.json())
  .then((data) => {
    console.log(data);
    listaProductos = data;
    data.forEach((producto) => {
      let { id, imagen, nombre, tipo, precio, desc } = producto;
      //Creo el elemento div para la card.
      const div = document.createElement("div");
      // Le asigno una clase 'product'
      div.classList.add("product");
      // inserto codigo html dentro de ese elemento div.
      div.innerHTML = `
        <div class="prod-image">
            <img src="${imagen}" alt="imagen de ${nombre}">
        </div>
        <div class="prod-details">
            <span>Popular</span>
            <h1>${nombre}</h1>
            <p>${tipo}</p>
            <p>${desc}</p>
            <h4><i class="fas fa-dollar-sign">${precio}</i></h4>
            <div>
                <button id="agregar${id}" class="btn-agregar">Agregar al Carrito</button>
            </div>
        </div>
        `;
      // Asigno el div que cree como hijo del elemento 'contenedor' (contProducts).
      contenedor.appendChild(div);

      // Creo un evento para cada boton Agregar al Carrito.
      const btnAgregar = document.getElementById(`agregar${id}`);
      btnAgregar.addEventListener("click", () => {
        // Llamo a la función agregarAlCarrito.
        agregarAlCarrito(id);
      });
    });
  });

// FINALIZAR LA COMPRA.
const btnFinalizar = document.getElementById("btn-fincompra");

btnFinalizar.addEventListener("click", () => {
  // Validacion de seleccion de envio
  if (selEnvio.value === "0") {
    Swal.fire({
      title: "Ups!",
      text: "Primero seleccione un tipo de envio",
      icon: "warning",
    });
  } else {
    opcionPago.forEach((radio) => {
      //Si se selecciona pago virtual
      if (radio.checked && radio.value === "fijo") {
        (async () => {
          const { value: email } = await Swal.fire({
            title: "Ingrese su dirección de email:",
            input: "email",
            showCancelButton: true,
            confirmButtonColor: "#d63176",
            cancelButtonColor: "#d63176",
            inputPlaceholder: "ejemplo@email.com",
          });
          if (email) {
            Swal.fire({
              icon: "success",
              title: "Felicitaciones!",
              text: "Tu compra a sido exitosa",
              confirmButtonColor: "#d63176",
              footer: "Recibirás el comprobante en " + email,
              customClass: {
                htmlContainer: "sweet-alert",
                container: "sweet-alert_2",
                footer: "sweet-alert",
              },
            });
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
            // Regreso al carrito.
            div.classList.toggle("carrito-hide");
            modalCompra.classList.toggle("carrito-hide");
          }
        })();

        // Si se selecciona pago con tarjeta
      } else if (radio.checked && radio.value === "cuotas") {
        (async () => {
          const { value: formValues } = await Swal.fire({
            title: "Ingrese datos de tarjeta",
            showCancelButton: true,
            confirmButtonColor: "#d63176",
            cancelButtonColor: "#d63176",
            html: `
              <form class="registro">
                  <label>Nº Tarjeta<input id="num-tarjeta" type="number" class="swal2-input" placeholder="XXXX-XXXXXX" required></label>
                  <label>Vencimiento<input id="num-expired" type="date" class="swal2-input" required></label>
                  <label>Nombre Titular<input id="name-us" type="text" class="swal2-input" placeholder="como figura en tarjeta" required></label>
                  <label>E-mail<input id="email-us" type="email" class="swal2-input" placeholder="ejemplo@mail.com" required></label>
              </form>
             `,
            focusConfirm: false,
            preConfirm: () => {
              return [document.getElementById("num-tarjeta").value, document.getElementById("num-expired").value, document.getElementById("name-us").value, document.getElementById("email-us").value];
            },
          });
          console.log(formValues);
          if (formValues.includes("")) {
            Swal.fire({
              title: "Ups!",
              text: "Datos sin completar",
              icon: "warning",
              showConfirmButton: false,
              footer: "Debes completar todos los datos, intenta nuevamente",
              timer: "3000",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Felicitaciones!",
              text: "Tu compra a sido exitosa",
              confirmButtonColor: "#d63176",
              footer: "Recibirás el comprobante en " + document.getElementById("email-us").value,
              customClass: {
                htmlContainer: "sweet-alert",
                container: "sweet-alert_2",
                footer: "sweet-alert",
              },
            });
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
            // Regreso al carrito.
            div.classList.toggle("carrito-hide");
            modalCompra.classList.toggle("carrito-hide");
          }
        })();
      }
    });
  }
});

// RECUPERAR DATOS DE STORAGE. Si storage tiene algo
if (localStorage.getItem("carrito") !== null) {
  recuperarCarrito();
  mostrarEnCarrito();
  contadorCarrito();
  calcularSubTotal();
}
