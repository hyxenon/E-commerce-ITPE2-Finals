// Function to display the total amount in the cart
function displayTotalAmount() {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Get the cart-total-amount span element
    const totalAmountSpan = document.querySelector('.cart-total-amount');

    if (totalAmountSpan) {
        // Calculate the total amount
        const totalAmount = cartItems.reduce((total, cartItem) => {
            const product = products.find(p => p.id === cartItem.id);
            if (product) {
                total += cartItem.quantity * product.price;
            }
            return total;
        }, 0);

        // Update the text content of the span element
        totalAmountSpan.textContent = totalAmount.toFixed(2); // Assuming you want to display the total amount with two decimal places
    }
}

// Call the displayTotalAmount function to initially display the total amount
displayTotalAmount();

// Function to display cart items in the cartlist div
function displayCartItems() {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Get the cartlist div
    const cartList = document.querySelector('.cartlist');

    // Clear existing content in the cartlist
    cartList.innerHTML = '';

    // Iterate through each cart item and create a card for it
    cartItems.forEach(function (cartItem) {
        // Find the corresponding product in the products array based on the cart item id
        const product = products.find(p => p.id === cartItem.id);

        if (product) {
            // Create a cart item card
            const cartItemCard = document.createElement('div');
            cartItemCard.className = 'flex justify-between items-center border border-gray-200 px-4 py-2 rounded';

            // Create a div for the left side of the card
            const leftDiv = document.createElement('div');
            leftDiv.className = 'flex justify-between items-center gap-2';

            // Create an image element for the product image
            const productImage = document.createElement('img');
            productImage.className = 'w-[150px]';
            productImage.src = product.productImage; // Set the product image URL
            productImage.alt = 'Product Image';

            // Create a div for product details
            const productDetailsDiv = document.createElement('div');

            // Create an h1 element for the product name
            const productName = document.createElement('h1');
            productName.className = 'font-bold';
            productName.textContent = product.name; // Set the product name

            // Create a p element for the product ID
            const productId = document.createElement('p');
            productId.className = 'font-semibold';

            // Create a p element for the product price
            const productPrice = document.createElement('p');
            productPrice.className = 'font-semibold';
            productPrice.innerHTML = `$<span>${product.price}</span>`; // Set the product price

            // Append product details to the productDetailsDiv
            productDetailsDiv.appendChild(productName);
            productDetailsDiv.appendChild(productId);
            productDetailsDiv.appendChild(productPrice);

            // Append product image and details to the leftDiv
            leftDiv.appendChild(productImage);
            leftDiv.appendChild(productDetailsDiv);

            // Create a div for the right side of the card
            const rightDiv = document.createElement('div');
            rightDiv.className = 'flex flex-col';

            // Create a p element for the total amount
            const totalAmount = document.createElement('p');
            totalAmount.className = 'font-bold';
            totalAmount.innerHTML = `Total Amount: $<span>${cartItem.quantity * product.price}</span>`; // Set the total amount

            // Create a div for quantity-related elements
            const quantityDiv = document.createElement('div');
            quantityDiv.className = 'flex justify-center gap-2';

            // Create a p element for the quantity
            const quantity = document.createElement('p');
            quantity.className = 'font-semibold';
            quantity.innerHTML = `Quantity <span>${cartItem.quantity}</span>`; // Set the quantity

            // Create buttons for adding and subtracting quantity
            const addButton = document.createElement('button');
            addButton.className = 'px-2 bg-green-500 text-white';
            addButton.textContent = '+';

            const minusButton = document.createElement('button');
            minusButton.className = 'px-2 bg-red-500 text-white';
            minusButton.textContent = '-';

            // Event listener for the "+" button
            addButton.addEventListener('click', function () {
                // Update the quantity in the cart item
                cartItem.quantity += 1;

                // Save the updated cart items back to local storage
                localStorage.setItem('cart', JSON.stringify(cartItems));

                // Update the displayed cart items
                displayCartItems();
                displayTotalAmount()
            });

            // Event listener for the "-" button
            minusButton.addEventListener('click', function () {
                // Ensure the quantity doesn't go below 1
                if (cartItem.quantity > 1) {
                    // Update the quantity in the cart item
                    cartItem.quantity -= 1;

                    // Save the updated cart items back to local storage
                    localStorage.setItem('cart', JSON.stringify(cartItems));

                    // Update the displayed cart items
                    displayCartItems();
                    displayTotalAmount()
                }
            });

            // Append quantity-related elements to the quantityDiv
            quantityDiv.appendChild(quantity);
            quantityDiv.appendChild(addButton);
            quantityDiv.appendChild(minusButton);

            // Append elements to the rightDiv
            rightDiv.appendChild(totalAmount);
            rightDiv.appendChild(quantityDiv);

            // Create a button for deleting the item from the cart
            const deleteButton = document.createElement('button');
            deleteButton.className = 'bg-red-500 mt-2 rounded text-white py-1 text-sm font-light';
            deleteButton.textContent = 'Delete Item';

            // Event listener for the delete button
            deleteButton.addEventListener('click', function () {
                // Remove the cart item from the cart items array
                const updatedCartItems = cartItems.filter(item => item.id !== cartItem.id);

                // Save the updated cart items back to local storage
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));

                // Update the displayed cart items
                displayCartItems();
                displayTotalAmount()
            });

            // Append delete button to the rightDiv
            rightDiv.appendChild(deleteButton);

            // Append leftDiv and rightDiv to the cartItemCard
            cartItemCard.appendChild(leftDiv);
            cartItemCard.appendChild(rightDiv);

            // Append the cartItemCard to the cartlist
            cartList.appendChild(cartItemCard);

            
        }
    });
}


// Function to handle the checkout process
function checkout() {
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Retrieve sales items from local storage
    let salesItems = JSON.parse(localStorage.getItem('sales')) || [];

    // Get the current date and time
    const currentDate = new Date();

    // Check if the cart is empty
    if (cartItems.length === 0) {
        alert('Error: Your cart is empty. Add items to your cart before checking out.');
        return; // Exit the function if the cart is empty
    }

    // Iterate through each cart item
    cartItems.forEach(cartItem => {
        // Find the corresponding product in the products array based on the cart item id
        const product = products.find(p => p.id === cartItem.id);

        if (product) {
            // Check if the product is already in the sales items
            const existingSalesItem = salesItems.find(item => item.id === product.id);

            if (existingSalesItem) {
                // If the product is already in the sales items, update the quantity and total amount
                existingSalesItem.quantity += cartItem.quantity;
                existingSalesItem.totalAmount += cartItem.quantity * product.price;
            } else {
                // If the product is not in the sales items, create a new sales item
                const totalAmount = cartItem.quantity * product.price;
                const newSalesItem = {
                    id: product.id,
                    name: product.name,
                    productImage: product.productImage,
                    price: product.price,
                    quantity: cartItem.quantity,
                    totalAmount: totalAmount,
                    timestamp: currentDate.getTime(), // Use timestamp as a unique identifier
                };
                // Add the new sales item to the salesItems array
                salesItems.push(newSalesItem);
            }
        }
    });

    // Save the updated sales items back to local storage
    localStorage.setItem('sales', JSON.stringify(salesItems));

    // Clear the cart after checkout
    localStorage.removeItem('cart');

    // Display a success message
    alert('Checkout successful! Thank you for your purchase.');
    displayCartItems();
    displayTotalAmount()
}

// Add an event listener to the checkout button
const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
    checkoutButton.addEventListener('click', function () {
        // Call the checkout function when the button is clicked
        checkout();
    });
}






// Call the displayCartItems function to initially display cart items
displayCartItems();
