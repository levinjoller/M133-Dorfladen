import { IProduct } from '../../src/IProduct';
import { Cart } from '../../src/Cart';

fetch('/api/basketproducts')
    .then(r => r.json())
    .then((cart: Cart) => {
        let orderList = "";
        cart.products.forEach((product: IProduct) => {
            orderList += `
            <tr>
                <td>
                    <a href="/Details/${product.id}">${product.productName}</a>
                </td>
                <td>
                    <button onclick="location.href='/api/pollproduct/${product.id}'">-</button>
                    CHF ${(product.specialOffer ? product.specialOffer : product.normalPrice).toFixed(2)}
                    <button onclick="location.href='/api/addproduct/${product.id}?isWarenkorb=true'">+</button>
                </td>
                <td>${product.quantity}</td>
                <td>CHF ${(product.quantity * (product.specialOffer ? product.specialOffer : product.normalPrice)).toFixed(2)}</td>
            </tr>
        `;
        });
        document.querySelector('.shop table tbody').innerHTML = orderList;
        document.querySelector('#totalPreis').innerHTML = `Total: CHF ${cart.totalCost.toFixed(2)}`;
    });