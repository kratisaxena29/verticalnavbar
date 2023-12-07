const allItems = document.querySelectorAll(".navmenu ul li a");
const contentContainer = document.createElement("div");
contentContainer.classList.add("content-container");
document.body.appendChild(contentContainer);

function updateContent(itemName) {
    let inputFields = '';

    // Determine the number of input fields based on the clicked item
    switch (itemName.toLowerCase()) {
        case 'services':
            inputFields = `
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName">
            `;
            break;
        case 'works':
            inputFields = `
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName">
                <label for="email">Email:</label>
                <input type="text" id="email" name="email">
            `;
            break;
        // Add more cases for other navigation items as needed
        default:
            // Display a default message if no valid item is selected
            inputFields = '<p>Please select a valid item.</p>';
            break;
    }

    contentContainer.innerHTML = `<h1>${itemName}</h1>${inputFields}`;
}

allItems.forEach(item => {
    item.addEventListener("click", function (e) {
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove("active");
        }
        this.classList.add("active");

        // Update content in the middle of the website
        const itemName = this.innerText;
        updateContent(itemName);
    });
});
let scrollDirection = 0;
let scrolling = false;

window.addEventListener("wheel", function (e) {
    if (!scrolling) {
        scrolling = true;

        setTimeout(function () {
            if (scrollDirection < 0) {
                // Scroll down, simulate a click on the next item
                simulateClick('down');
            } else {
                // Scroll up, simulate a click on the previous item
                simulateClick('up');
            }

            scrolling = false;
        }, 500); // Adjust the timeout as needed to control the scroll sensitivity
    }

    // Update the scroll direction based on the current scroll movement
    scrollDirection = e.deltaY;
});

function simulateClick(direction) {
    const activeItem = document.querySelector(".navmenu ul li a.active");

    if (activeItem) {
        const index = Array.from(allItems).indexOf(activeItem);
        let nextIndex;

        if (direction === 'down') {
            nextIndex = (index + 1) % allItems.length;
        } else {
            nextIndex = (index - 1 + allItems.length) % allItems.length;
        }

        allItems[nextIndex].click();
    }
}