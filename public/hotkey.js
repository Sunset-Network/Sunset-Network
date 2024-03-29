var defaultHotkey = localStorage.getItem('hotkey') || 'k';
var redirectURL = localStorage.getItem('redirectURL') || 'https://google.com'; // Default redirect URL

window.addEventListener('DOMContentLoaded', function() {
    console.log('Hotkey script loaded successfully');
    var hotkeyInput = document.getElementById('hotkey-input');
    var redirectURLInput = document.getElementById('redirect-url-input');

    if (hotkeyInput) {
        hotkeyInput.value = defaultHotkey;

        var changeHotkeyButton = document.getElementById('change-hotkey-btn');
        changeHotkeyButton.addEventListener('click', function() {
            var newHotkey = hotkeyInput.value.trim();

            if (newHotkey) {
                defaultHotkey = newHotkey;
                localStorage.setItem('hotkey', defaultHotkey);
                alert('Hotkey changed successfully to: ' + defaultHotkey);
            } else {
                alert('Please select a hotkey.');
            }
        });
    }

    if (redirectURLInput) {
        redirectURLInput.value = redirectURL;

        var changeURLButton = document.getElementById('change-URL-btn');
        changeURLButton.addEventListener('click', function() {
            var newURL = redirectURLInput.value.trim();

            // Check if the URL starts with "http://" or "https://", if not, prepend "https://"
            if (newURL && !newURL.match(/^https?:\/\//i)) {
                newURL = 'https://' + newURL;
            }

            // Check if the URL ends with ".com", if not, append ".com"
            if (newURL && !newURL.match(/\.com$/i)) {
                newURL += '.com';
            }

            if (newURL) {
                redirectURL = newURL;
                localStorage.setItem('redirectURL', redirectURL);
                alert('Redirect URL changed successfully to: ' + redirectURL);
            } else {
                alert('Please enter a valid URL.');
            }
        });
    }

    window.addEventListener('keydown', function(event) {
        if (event.key === defaultHotkey) {
            window.location.href = redirectURL;
        }
    });
});
