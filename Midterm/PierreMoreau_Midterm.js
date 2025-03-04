// Append discontinued products to the product list.
const showDiscontinued = document.getElementById("show-discontinued");
const productsList = document.getElementById("product-list");

const products = ['Treadmill', 'Stationary Bike', 'Rowing Machine', 'Weight Bench'];
showDiscontinued.addEventListener("click", function() {
    const numberOfChildren = productsList.children.length;

    if (numberOfChildren < 10) {
        products.forEach(product => {
            const productName = document.createElement('h3');
            productName.textContent = product;
            productName.style.color = 'red';

            const productSummary = document.createElement('p');
            productSummary.textContent = "This product has been discontinued.";

            const productPrice = document.createElement('p');
            productPrice.textContent = "$0.00";

            const productContainer = document.createElement('div');
            productContainer.appendChild(productName);
            productContainer.appendChild(productSummary);
            productContainer.appendChild(productPrice);
            
            productsList.appendChild(productContainer);
        })
    } else {
        for (let i = 0; i < products.length; i++) {
            productsList.removeChild(productsList.lastElementChild);
        }
    }
});

// Change Mission Statement color to red.
const changeMission = document.getElementById("mission-button");
let alterMission = true;
changeMission.addEventListener("click", function() {
    const missionStatement = document.getElementById("mission-text");
    const missionStatementStoreName = document.getElementById("store-name");
    if (alterMission) {
        missionStatement.style.color = "red";
        missionStatementStoreName.style.color = "black";
        alterMission = false;
    } else {
        missionStatement.style.color = "black";
        alterMission = true;
    }
});

// Introduction Prompt
// const header = document.querySelector("header");
const header = document.getElementById("welcome");
window.addEventListener("load", function () {
    const userName = prompt("Please enter your name:");
    if (userName) {
        const welcomeMessage = document.createElement("h1");
        welcomeMessage.style.fontSize = "36px";
        welcomeMessage.textContent = `Welcome, ${userName}! Stay fit and healthy!`;
        header.append(welcomeMessage);

        // header.append(welcomeMessagePierre);
    }
});