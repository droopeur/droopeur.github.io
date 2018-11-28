"use strict";

(function () {

var loadScript = function loadScript(url, callback) {

var script = document.createElement("script");
script.type = "text/javascript";

// If the browser is Internet Explorer.
if (script.readyState) {
script.onreadystatechange = function () {
if (script.readyState == "loaded" || script.readyState == "complete") {
script.onreadystatechange = null;
callback();
}
};
// For any other browser.
} else {
script.onload = function () {
callback();
};
}

script.src = url;
document.getElementsByTagName("head")[0].appendChild(script);
};

var trackProductPageView = function trackProductPageView($, shop, handle) {
$.post('https://neattracker.com/api/trackProductPageView', { 'shop': shop, 'action': 'productPageView', 'handle': handle }, function (data) {
return data.true;
});
};

var neatTrack = function neatTrack($) {
// grab the test products from neatab
var shop = 'cop-room.myshopify.com';

// if this is a product page, track it
var genericProductPageRegex = 'products\\/';
if (window.location.pathname.match(new RegExp(genericProductPageRegex))) {
var handleRegex = 'products\\/(.*)';
var handle = window.location.pathname.match(new RegExp(handleRegex));
trackProductPageView($, shop, handle[1]);
}
};

/* If jQuery has not yet been loaded or if it has but it's too old for our needs,
we will load jQuery from the Google CDN, and when it's fully loaded, we will run
our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
loadScript('//cdn.jsdelivr.net/js-cookie/2.2.0/js.cookie.js', function () {
if (typeof jQuery === 'undefined' || parseFloat(jQuery.fn.jquery) < 1.7) {
loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
var jQuery191 = jQuery.noConflict(true);
neatTrack(jQuery191);
});
} else {
neatTrack(jQuery);
}
});
})();
