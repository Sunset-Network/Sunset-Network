document.addEventListener("DOMContentLoaded", function() {
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

    themeDropdown.addEventListener('change', function() {
        const selectedValue = this.value;
        isGradientActive = selectedValue === 'true';
        localStorage.setItem('isGradientActive', isGradientActive);
        applyTheme();
    });
});
