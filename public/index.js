"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

const input = document.querySelector("input");

// crypts class definition
class crypts {
  static encode(str) {
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }

  static decode(str) {
    if (str.charAt(str.length - 1) === "/") {
      str = str.slice(0, -1);
    }
    return decodeURIComponent(
      str
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }
}

function search(input) {
  input = input.trim();
  const searchTemplate = localStorage.getItem('engine') || 'https://google.com/search?q=%s';

  try {
    return new URL(input).toString();
  } catch (err) {
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) {
        return url.toString();
      }
      throw new Error('Invalid hostname');
    } catch (err) {
      return searchTemplate.replace("%s", encodeURIComponent(input));
    }
  }
}

if ('serviceWorker' in navigator) {
  var proxySetting = localStorage.getItem('proxy') || 'uv';
  let swConfig = {
    'uv': { file: '/uv/sw.js', config: __uv$config }
  };

  let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

  navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix })
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));
        location.href = encodedUrl;
      });
    })
    .catch((error) => {
      console.error('ServiceWorker registration failed:', error);
    });
}

var proxySetting = 'uv';
let swConfig = {
  'uv': { file: '/uv/sw.js', config: __uv$config }
};

let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

async function registerSW() {
  if (!navigator.serviceWorker)
    throw new Error("Your browser doesn't support service workers.");

  // Ultraviolet has a stock `sw.js` script.
  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  });
}

function launch(val) {
  var proxySetting = 'uv';
  let swConfig = {
    'uv': { file: '/uv/sw.js', config: __uv$config }
  };

  let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

  window.navigator.serviceWorker
      .register(swFile, { scope: swConfigSettings.prefix })
      .then(() => {
          let url = val.trim();
          if (!ifUrl(url)) url = "https://www.google.com/search?q=" + url;
          else if (!(url.startsWith("https://") || url.startsWith("http://")))
              url = "https://" + url;
          var uvUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
          location.href = uvUrl;
      });
}

function ifUrl(val = "") {
  const urlPattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w]{2,}(\/.*)?$/;
  return urlPattern.test(val);
}
