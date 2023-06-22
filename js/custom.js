// Get necessary DOM elements
const openPopupButton = document.getElementById('open-popup');
const iframe = document.getElementById('website-iframe');

// Open the iframe with the specified website URL
openPopupButton.addEventListener('click', () => {
  const websiteUrl = 'https://external-navigator.carrd.co'; // Replace with the desired website URL
  iframe.src = websiteUrl;
});
