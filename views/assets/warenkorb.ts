import { IProduct } from '../../src/IProduct';

fetch('http://localhost:8080/api/basketproducts')
    .then(r => r.json())
    .then(basketProducts => {
        let orderList = "";
        basketProducts.forEach((product: IProduct) => {
            orderList += `
            <tr>
                <td>
                    <a href="http://localhost:8080/Details/${product.id}">${product.productName}</a>
                </td>
                <td>
                    <button onclick="location.href='http://localhost:8080/api/pollproduct/${product.id}'">-</button>
                    CHF ${(product.specialOffer ? product.specialOffer : product.normalPrice).toFixed(2)}
                    <button onclick="location.href='http://localhost:8080/api/addproduct/${product.id}?isWarenkorb=true'">+</button>
                </td>
                <td>${product.quantity}</td>
                <td>CHF ${(product.quantity * (product.specialOffer ? product.specialOffer : product.normalPrice)).toFixed(2)}</td>
            </tr>
        `;
        });
        document.querySelector('.shop table tbody').innerHTML = orderList;
    });
fetch('http://localhost:8080/api/totalcost')
    .then(r => r.json())
    .then(totalcost => {
        document.querySelector('#totalPreis').innerHTML = `Total: CHF ${totalcost.toFixed(2)}`;
    });