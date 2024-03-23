const changeGradientButton = document.getElementById('changeGradient');
let isGradientActive = localStorage.getItem('isGradientActive') === 'true';
const themeDropdown = document.getElementById('theme');


// Ensure isGradientActive is initialized to false if it's not saved in localStorage
if (isGradientActive === null) {
    isGradientActive = false;
}

// Function to apply the theme
function applyTheme() {
    if (isGradientActive) {
        document.body.classList.add('gradientBackground');
        changeGradientButton.textContent = "Light Mode"; // Update button text
    } else {
        document.body.classList.remove('gradientBackground');
        changeGradientButton.textContent = "Dark Mode"; // Update button text
    }
}

// Apply the initial theme state
applyTheme();

// Function to toggle the theme
function toggleTheme() {
    isGradientActive = !isGradientActive; // Toggle the state
    localStorage.setItem('isGradientActive', isGradientActive); // Save theme state to localStorage
    applyTheme(); // Apply the theme
}

// Add event listener to the button
changeGradientButton.addEventListener('click', toggleTheme);

// Add event listener to the dropdown
themeDropdown.addEventListener('change', function() {
    // Get the selected value
    const selectedValue = this.value;

    // Update isGradientActive based on the selected value
    isGradientActive = selectedValue === 'true';

    // Update local storage
    localStorage.setItem('isGsradientActive', isGradientActive);

    // Apply the theme
    applyTheme();
});
 
