import { IProduct } from '../../src/IProduct';

fetch('http://localhost:8080/api/products')
    .then(r => r.json())
    .then((products: IProduct[]) => {
        let goods = "";
        products.forEach(product => {
            goods += `
            <div onclick="location.href='http://localhost:8080/Details/${product.id}'">
                <figure>
                    <img src="/assets/img/${product.imageName}" alt="${product.productName}" />
                    <figcaption>
                        <p>${product.productName}</p>
                        ${product.specialOffer ?
                            `<p>CHF ${product.specialOffer.toFixed(2)}
                                <span>CHF ${product.normalPrice.toFixed(2)}</span></p>` :
                            `<p>CHF ${product.normalPrice.toFixed(2)}</p>`}
                    </figcaption>
                </figure>
            </div>`;
        });
        document.querySelector('.products').innerHTML = goods;
    });