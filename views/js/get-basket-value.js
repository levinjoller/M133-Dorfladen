fetch('http://localhost:8080/api/totalcost')
    .then(x => x.json())
    .then(x => {
        let basketbtn = document.querySelector('.basket button');
        basketbtn.innerHTML = 'Warenkorb: CHF ' + x.toFixed(2);
    });