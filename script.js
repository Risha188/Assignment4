let formInputs = document.querySelectorAll("#right2 input");
let bookMsg = document.getElementById('notify');

let addedItems = [];

formInputs.forEach(input => {
    input.addEventListener('click', function () {
        if (addedItems.length === 0) {
            let bookMsg = document.getElementById("notify");
            bookMsg.style.display = "block";
            bookMsg.style.color = "red";
        }
        else {
            bookMsg.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let itemsBlack = document.querySelectorAll(".items .black");
    let itemsRed = document.querySelectorAll(".items .red");
    let right1 = document.getElementById("right1");

    function renderItems() {
        //form structure
        right1.innerHTML = `
        <h3>Added Items</h3>
        <br>
        <div class='header'>
            <p>S.No</p>
            <p>Service Name</p>
            <p>Price</p>
        </div>
        <br>
        <div class='item-list'></div>
        <br><br>
         <div class="footer">
            <p>Total Amount</p>
            <p class='total'>₹0</p>
        </div>
    `;


        let itemList = right1.querySelector('.item-list');
        let totalEl = right1.querySelector('.total');


        if (addedItems.length === 0) {
            itemList.innerHTML = `
            <div class="no-item">
                <div class="emptyI">
                    <ion-icon name="information-circle-outline"></ion-icon>
                    <h3>No Items Added</h3>
                    <p>Add items to the cart from the services bar</p>
                </div>
            </div>
        `;
            totalEl.textContent = "₹0";
            return;
        }

        addedItems.forEach((item, i) => {
            const div = document.createElement("div");
            div.classList.add("added-row");
            div.innerHTML = `
            <p>${i + 1}</p>
            <p>${item.name}</p>
            <p>${item.price}</p>
        `;
            itemList.appendChild(div);
        })
        //Calculate total
        const total = addedItems.reduce((sum, item) => sum + item.price, 0);
        totalEl.textContent = `₹${total}`;

    }


    itemsBlack.forEach((black, index) => {
        const red = itemsRed[index];
        const itemText = black.closest(".items").querySelector(".item-left p").textContent.trim();
        const name = itemText.replace(/^[^\w]+|\s*[•.₹].*$/g, ""); // removes emojis, dots, and prices
        const price = parseFloat(
            black.closest(".items").querySelector(".item-left span").textContent.replace("₹", "")
        );

        red.style.display = "none";

        black.addEventListener('click', () => {
            addedItems.push({ name, price });
            renderItems();
            red.style.display = "block";
            black.style.display = "none";
            let bookMsg = document.getElementById('notify');
            bookMsg.style.display = "none";
        });

        red.addEventListener('click', () => {
            addedItems = addedItems.filter(item => item.name !== name);
            renderItems();
            black.style.display = "block";
            red.style.display = "none";
            bookMsg.style.display = "block";
        });
    })
    renderItems();
})
