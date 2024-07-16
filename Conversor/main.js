const exchangeRate = 3.963;

function convertCurrency() {
    const usd = document.getElementById('usd').value;
    const cop = document.getElementById('cop').value;

    if (event.target.id === 'usd') {
        document.getElementById('cop').value = (usd * exchangeRate).toFixed(2);
    } else {
        document.getElementById('usd').value = (cop / exchangeRate).toFixed(2);
    }
}
