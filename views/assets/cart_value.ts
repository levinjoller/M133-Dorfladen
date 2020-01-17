import { Cart } from '../../src/Cart';

fetch('/api/cart')
    .then(r => r.json())
    .then((cart: Cart) => {
        let basketbtn = document.querySelector('.basket button span');
        basketbtn.innerHTML = cart.totalCost.toFixed(2);
    });