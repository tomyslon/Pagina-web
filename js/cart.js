// Obtener la lista de elementos
let list = document.querySelectorAll('.list .item');

// Agregar evento click a cada elemento de la lista
list.forEach(item => {
  item.addEventListener('click', function(event) {
    if (event.target.classList.contains('add')) {
      let itemNew = item.cloneNode(true);
      let itemId = itemNew.getAttribute('data-key');
      let cartItem = document.querySelector(`.cart .item[data-key="${itemId}"]`);
      
      if (cartItem) {
        let countInput = cartItem.querySelector('.count');
        let count = parseInt(countInput.value);
        countInput.value = count + 1;
      } else {
        document.querySelector('.listCart').appendChild(itemNew);
      }
      
      updateTotal(); // Actualizar el total al agregar un producto
    }
  });
});

// Eliminar un elemento del carrito
function Remove(key) {
  let listCart = document.querySelectorAll('.cart .item');
  
  listCart.forEach(item => {
    if (item.getAttribute('data-key') == key) {
      item.remove();
      updateTotal();
      return;
    }
  });
}

// Actualizar el total del carrito
function updateTotal() {
  let totalPrice = 0;
  let cartItems = document.querySelectorAll('.cart .item');
  
  cartItems.forEach(item => {
    let priceElement = item.querySelector('.price');
    let price = parseFloat(priceElement.dataset.price); // Obtener el precio desde el atributo data-price
    let countInput = item.querySelector('.count');
    let count = parseInt(countInput.value);
    totalPrice += price * count;
  });
  
  let totalAmountElement = document.querySelector('.cart .total-amount');
  totalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Mostrar el formulario de confirmación de compra
let buyButton = document.querySelector('.cart .buyButton');
buyButton.addEventListener('click', function() {
  document.querySelector('.popup').style.display = 'flex';
});

// Cerrar el popup al hacer clic en el botón de cerrar
let closeButton = document.querySelector('.popup .close-button');
closeButton.addEventListener('click', function() {
  document.querySelector('.popup').style.display = 'none';
});


// Manejar el evento click en el botón de confirmar compra
let confirmButton = document.querySelector('.popup .confirm-button');
confirmButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario

  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let termsAccepted = document.getElementById('terms').checked;

  if (firstName && lastName && termsAccepted) {
    let doc = new jsPDF();
    
    // Agregar el nombre y apellido del usuario
    doc.text(`COMPROBANTE COMERCIAL`, 20, 10);
    doc.text(`Nombre: ${firstName}`, 20, 20);
    doc.text(`Apellido: ${lastName}`, 20, 30);
    
    // Agregar el total de la compra
    let totalAmountElement = document.querySelector('.cart .total-amount');
    let totalAmount = totalAmountElement.textContent;
    doc.text(`Total: ${totalAmount}`, 20, 40);

    // Agregar la imagen del logo
    let logoImg = new Image();
    logoImg.src = 'material/LOGO FINAL.png';
    logoImg.onload = function() {
      const logoWidth = 40; // Ancho de la imagen del logo en el PDF
      const logoHeight = (logoImg.height * logoWidth) / logoImg.width; // Mantener la proporción de aspecto

      doc.addImage(logoImg, 'PNG', 150, 10, logoWidth, logoHeight);
      doc.save('comprobante.pdf');
};

    alert('¡Gracias por tu compra!');
    document.querySelector('.popup').style.display = 'none';
  } else {
    alert('Por favor, completa todos los campos y acepta los términos y condiciones.');
  }
});


// Desactivar clic en elementos individuales del carrito
let cartItems = document.querySelectorAll('.cart .item');
cartItems.forEach(item => {
  item.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

