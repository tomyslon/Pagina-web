let list = document.querySelectorAll('.list .item');
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
  })
});

function Remove(key) {
  let listCart = document.querySelectorAll('.cart .item');
  listCart.forEach(item => {
    if (item.getAttribute('data-key') == key) {
      item.remove();
      updateTotal();
      return;
    }
  })
}

function updateTotal() {
  let totalPrice = 0;
  let cartItems = document.querySelectorAll('.cart .item');
  
  cartItems.forEach(item => {
    let priceElement = item.querySelector('.price');
    let price = parseFloat(priceElement.dataset.price); // Usar dataset para obtener el precio
    let countInput = item.querySelector('.count');
    let count = parseInt(countInput.value);
    totalPrice += price * count;
  });

  let totalAmountElement = document.querySelector('.cart .total-amount');
  totalAmountElement.textContent = `$${totalPrice.toFixed(2)}`;
}

let buyButton = document.querySelector('.cart .buy');
buyButton.addEventListener('click', function() {
  alert('¡Gracias por tu compra!');
});

// Desactivar clic en elementos del carrito
let cartItems = document.querySelectorAll('.cart .item');
cartItems.forEach(item => {
  item.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});
