fetch('/api/getAlert')
    .then(r => r.json())
    .then(getAlert => {
        if (getAlert.showAlert && getAlert.isSuccess) {
            alert('Ihre Bestellung war erfolgreich.');
        } else if (getAlert.showAlert && !getAlert.isSuccess) {
            alert('Bestellung fehlgeschlagen: \nFehlerhafte Eingabe!');
        }
    });