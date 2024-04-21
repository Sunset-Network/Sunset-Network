const changeGradientButton = document.getElementById('changeGradient');
let isGradientActive = localStorage.getItem('isGradientActive') === 'true';

const themeDropdown = document.getElementById('theme');

if (isGradientActive === null) {
    isGradientActive = false;
}

function applyTheme() {
    if (isGradientActive) {
        document.body.classList.add('gradientBackground');
        changeGradientButton.textContent = "Light Mode";
    } else {
        document.body.classList.remove('gradientBackground');
        changeGradientButton.textContent = "Dark Mode";
    }
}

applyTheme();

function toggleTheme() {
    isGradientActive = !isGradientActive;
    localStorage.setItem('isGradientActive', isGradientActive);
    applyTheme();
}

changeGradientButton.addEventListener('click', toggleTheme);


const presetSelect = document.getElementById('presetSelect');
const faviconInput = document.getElementById('faviconInput');
const faviconPreview = document.getElementById('faviconPreview');
const customTitleInput = document.getElementById('customTitleInput');

const presetImages = {
    google: '/Icons/cloak/google.png',
    gmail: '/Icons/cloak/gmail.png',
    classroom: '/Icons/cloak/classroom.png',
    drive: '/Icons/cloak/drive.png'
};

function loadCloak() {
    const savedPreset = localforage.getItem('preset');
    const savedCustomTitle = localforage.getItem('customTitle');
    const savedFavicon = localforage.getItem('favicon');

    if (savedPreset) {
        presetSelect.value = savedPreset;
        if (presetImages[savedPreset]) {
            changeFavicon(presetImages[savedPreset]);
        }
    }
    if (savedCustomTitle) {
        customTitleInput.value = savedCustomTitle;
        document.title = savedCustomTitle;
    }
    if (savedFavicon) {
        changeFavicon(savedFavicon);
    }
}

loadCloak();

presetSelect.addEventListener('change', () => {
    if (presetSelect.value === 'custom') {
        customTitleInput.style.display = 'block';
    } else {
        customTitleInput.style.display = 'none';
        document.title = presetSelect.options[presetSelect.selectedIndex].text;
        const presetImage = presetImages[presetSelect.value];
        if (presetImage) {
            changeFavicon(presetImage);
            localforage.setItem('favicon', presetImage);
        }
        localforage.setItem('preset', presetSelect.value);
    }
});

customTitleInput.addEventListener('input', () => {
    const customTitle = customTitleInput.value.trim();
    document.title = customTitle;
    localforage.setItem('customTitle', customTitle);
});

faviconInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            faviconPreview.src = e.target.result;
            changeFavicon(e.target.result);
            localforage.setItem('favicon', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function changeFavicon(imageSrc) {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL();
        document.head.appendChild(link);
    };
    img.src = imageSrc;
}


var searchStored = localStorage.getItem("engine")
var searchSel = document.getElementById("searchtype")

function switchSearch() {
  const selecter = document.getElementById("searchtype");
  const selectedOption = selecter.value;
  localStorage.setItem("engine", selectedOption);
};
