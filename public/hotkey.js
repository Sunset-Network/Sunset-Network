var defaultHotkey = localStorage.getItem('hotkey') || 'k';

window.addEventListener('DOMContentLoaded', function() {
    console.log('Hotkey script loaded successfully');
    var hotkeyInput = document.getElementById('hotkey-input');

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

        window.addEventListener('keydown', function(event) {
            if (event.key === defaultHotkey) {
                window.location.href = 'https://google.com';
            }
        });
    } else {
        window.addEventListener('keydown', function(event) {
            if (event.key === defaultHotkey) {
                window.location.href = 'https://google.com';
            }
        });
    }
});
