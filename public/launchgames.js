function launch(val) {
    window.navigator.serviceWorker
        .register("/uv/sw.js", {
            scope: __uv$config.prefix,
        })
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

//then for example to launch you would do
//launch("https://proxiedCDNgame.com");