const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_BdawtoXe7gKZNtYULmE4L9qdVGh7Q53a1NsnKu03";

const fetchCurrency = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data.data; // Adjust this based on the actual structure of the API response
    } catch (error) {
        console.log(error);
    }
};

const flagUrls = {
    USD: 'https://flagsapi.com/US/shiny/64.png',
    EUR: 'https://flagsapi.com/EU/shiny/64.png',
    JPY: 'https://flagsapi.com/JP/shiny/64.png',
    GBP: 'https://flagsapi.com/GB/shiny/64.png',
    AUD: 'https://flagsapi.com/AU/shiny/64.png',
    PKR: 'https://flagsapi.com/PK/shiny/64.png',
    AFN: 'https://flagsapi.com/AF/shiny/64.png',
    ALL: 'https://flagsapi.com/AL/shiny/64.png',
    BHD: 'https://flagsapi.com/BH/shiny/64.png',
    BGN: 'https://flagsapi.com/BG/shiny/64.png',
    BRL: 'https://flagsapi.com/BR/shiny/64.png',
    

    CAD: 'https://flagsapi.com/CA/shiny/64.png',
    CHF: 'https://flagsapi.com/CH/shiny/64.png',
    CNY: 'https://flagsapi.com/CN/shiny/64.png',
    CZK: 'https://flagsapi.com/CZ/shiny/64.png',
    DKK: 'https://flagsapi.com/DK/shiny/64.png',
    HKD: 'https://flagsapi.com/HK/shiny/64.png',
    HRK: 'https://flagsapi.com/HR/shiny/64.png',
    HUF: 'https://flagsapi.com/HU/shiny/64.png',
    IDR: 'https://flagsapi.com/ID/shiny/64.png',
    ILS: 'https://flagsapi.com/IL/shiny/64.png',
    INR: 'https://flagsapi.com/IN/shiny/64.png',
    ISK: 'https://flagsapi.com/IS/shiny/64.png',

    KRW: 'https://flagsapi.com/KR/shiny/64.png',
    MXN: 'https://flagsapi.com/MX/shiny/64.png',

};

const populateDropdowns = async () => {
    const rates = await fetchCurrency();
    const dropdowns = document.querySelectorAll('.dropdowns select');
    const currencies = Object.keys(rates);

    dropdowns.forEach(dropdown => {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            option.style.backgroundImage = `url(${flagUrls[currency]})`;
            option.style.backgroundRepeat = 'no-repeat';
            option.style.backgroundPosition = 'left center';
            option.style.paddingLeft = '25px';
            dropdown.appendChild(option);
        });
    });
};

const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    const rates = await fetchCurrency();
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount.toFixed(2);
};

document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();

    const form = document.getElementById('currency-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('from').value;
        const toCurrency = document.getElementById('to').value;
        const resultField = document.getElementById('result');
        const fromFlag = document.getElementById('from-flag');
        const toFlag = document.getElementById('to-flag');

        if (isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);
        resultField.value = `${convertedAmount} ${toCurrency}`;

        // Update flag images
        fromFlag.src = flagUrls[fromCurrency];
        fromFlag.style.display = 'inline';
        toFlag.src = flagUrls[toCurrency];
        toFlag.style.display = 'inline';
    });
});