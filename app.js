var YourApiKeyToken = "YE35I6V67Y7Y9K4AJGUTGCPTR9W4C25QIB";

let request = new Request(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${YourApiKeyToken}`);

fetch(request).then(response => response.json())
.then(data => {
    let res = data.result;
    document.getElementById('priceusd').textContent = res.ethusd;
    document.getElementById('pricebtc').textContent = res.ethbtc;
})