import { IProduct } from '../../src/IProduct';

fetch('/api/products')
    .then(r => r.json())
    .then((products: IProduct[]) => {
        let shop = "";
        products.forEach(product => {
            shop += `
            <div onclick="location.href='/Details/${product.id}'">
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
        document.querySelector('.products').innerHTML = shop;
    });