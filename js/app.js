//this will show the shopping Cart

(function() {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function() {
    cart.classList.toggle('show-cart');
  });
})();

//add products to the cart

(function() {

  const cartBtn = document.querySelectorAll('.store-item-icon');

  cartBtn.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
      //console.log(event.target);

      if (event.target.parentElement.classList.contains('store-item-icon')) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let pos = fullPath.indexOf('img') + 3;
        let partPath = fullPath.slice(pos);

        const item = {}; //item is an object which will be added to the shopping cart
        item.img = `img-cart${partPath}`; //path of the image from the partPath, adding small version of the image to the shopping cart
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent; //getting name from the content on the page
        item.name = name; // name of the image generated from the last variable
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;  //getting price from the content, later it will be converted from the string to the float so we can calculate total

        let finalPrice = price.slice(1).trim();

        item.price = finalPrice;

        //  console.log(item);

//this will add html content into the shopping cart
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');

        cartItem.innerHTML = `
  <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
  <div class="item-text">

    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
    <span>£</span>
    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
  </div>
  <a href="#" id='cart-item-remove' class="cart-item-remove">
    <i class="fas fa-trash"></i>
  </a>
</div>
`;

//this will calculate total sales with the total function
const cart = document.getElementById('cart');
const total = document.querySelector('.cart-total-container');

cart.insertBefore(cartItem, total);
alert('item added to the cart'); // item added to the cart message
showTotals()

      }
    });
  });

//total function
function showTotals(){

  const total = [];   //empty array to store the selected items from the customer
  const items = document.querySelectorAll('.cart-item-price');

  items.forEach(function(item){
    total.push(parseFloat(item.textContent));   //changing text string to the float number so we can calculate the total
  });

  const totalMoney = total.reduce(function(total, item){
    total +=item;
    return total;
  },0)
  const finalMoney = totalMoney.toFixed(2);

document.getElementById('cart-total').textContent = finalMoney;
document.querySelector('.item-total').textContent = finalMoney;
document.getElementById('item-count').textContent = total.length;

}
})();