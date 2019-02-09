var YourApiKeyToken = "YE35I6V67Y7Y9K4AJGUTGCPTR9W4C25QIB";

let request = new Request(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${YourApiKeyToken}`);

fetch(request).then(response => response.json())
.then(data => {
    let res = data.result;
    document.getElementById('priceusd').textContent = res.ethusd;
    document.getElementById('pricebtc').textContent = res.ethbtc;
})

fetch(`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${YourApiKeyToken}`)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        document.getElementById('lastBlock').textContent = parseInt(response.result);
        return response.result;
    })
    .then(data => {
        return fetch(`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${data}&boolean=true&apikey=${YourApiKeyToken}`)
    })
    .then(response => response.json())
    .then(data => {
        var result = data.result;
        document.getElementById('blockSize').textContent = `${parseInt(result.size)} Bytes`;
        document.getElementById('blockDifficulty').textContent = parseInt(result.difficulty);
        document.getElementById('transactions').textContent = result.transactions.length;
        var str = `${parseInt(result.gasUsed)} (${(parseInt(result.gasUsed)*100)/parseInt(result.gasLimit)}%)`;
        document.getElementById('gasUsed').textContent = str;
        document.getElementById('gasLimit').textContent = parseInt(result.gasLimit);
        console.log(result);
    });
