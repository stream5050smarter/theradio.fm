window.onload = function() {
  // Get the iframe element
  var iframe = document.querySelector('.responsive-iframe');

  // Function to get query string parameters
  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  // Get the dynamic source URL from the 'url' query string parameter
  var dynamicURL = getParameterByName('url');

  // Check if the URL parameter is present and not empty
  if (dynamicURL) {
    // Assign the dynamic URL to the iframe's src attribute
    iframe.src = dynamicURL;
  }
}
