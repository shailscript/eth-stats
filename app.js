var YourApiKeyToken = "YE35I6V67Y7Y9K4AJGUTGCPTR9W4C25QIB";

let request = new Request(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${YourApiKeyToken}`);

fetch(request).then(response => response.json())
.then(data => {

    let res = data.result;
    document.getElementById('priceusd').textContent = res.ethusd;
    document.getElementById('pricebtc').textContent = res.ethbtc;

});

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

// interactivity and UX scripts

var show = function (elem) {

    var getHeight = function () {
		elem.style.display = 'block';
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = '';
		return height;
    };

    var height = getHeight(); // Get the natural height
	elem.classList.add('is-visible');
	elem.style.height = height; // Update the max-height

	window.setTimeout(function () {
		elem.style.height = '';
	}, 350);

};

var hide = function (elem) {

    elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, 350);

};

var toggle = function (elem, timing) {

    if (elem.classList.contains('is-visible')) {
		hide(elem);
		return;
	}

	show(elem);
	
};

document.getElementById('moreLink').addEventListener('click', function (event) {

    if (!event.target.classList.contains('toggle')) return;

	event.preventDefault();

	var content = document.querySelector(event.target.hash);
	if (!content) return;

	toggle(content);

}, false);


document.getElementById('links').addEventListener('click', function(e){
    
    console.log(event);
    if(e.target.tagName === 'A') {
        if(e.target.hash === '#home') {

            document.querySelector('#about').classList.add('hidden');
            document.querySelector('#home').classList.remove('hidden');
            
            document.querySelector('#homeLink').classList.add('active');
            document.querySelector('#aboutLink').classList.remove('active');
            console.log('about uda?')

        }
        if(e.target.hash === '#about') {

            document.querySelector('#home').classList.add('hidden');
            document.querySelector('#about').classList.remove('hidden');
            
            document.querySelector('#aboutLink').classList.add('active');
            document.querySelector('#homeLink').classList.remove('active');
            console.log('home uda?')

        }
    }
});