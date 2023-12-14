// Function to display sales items in the sales div
function displaySales() {
    // Retrieve sales items from local storage
    const salesItems = JSON.parse(localStorage.getItem('sales')) || [];

    // Get the sales div
    const salesDiv = document.querySelector('.sales');

    // Clear existing content in the sales div
    salesDiv.innerHTML = '';

    // Check if there are sales items to display
    if (salesItems.length > 0) {
        // Iterate through each sales item and create a card for it
        salesItems.forEach(salesItem => {
            // Create a sales item card
            const salesItemCard = document.createElement('div');
            salesItemCard.className = 'flex justify-between items-center border border-gray-200';

            // Create a div for the left side of the card
            const leftDiv = document.createElement('div');
            leftDiv.className = 'flex items-center gap-4';

            // Create an image element for the product image
            const productImage = document.createElement('img');
            productImage.className = 'w-[150px]';
            productImage.src = salesItem.productImage; // Set the product image URL
            productImage.alt = 'Product Image';

            // Create a div for product details
            const productDetailsDiv = document.createElement('div');
            productDetailsDiv.className = 'flex flex-col';

            // Create a p element for the product name
            const productName = document.createElement('p');
            productName.className = 'font-bold';
            productName.textContent = salesItem.name; // Set the product name

            // Create a p element for the product price
            const productPrice = document.createElement('p');
            productPrice.className = 'font-semibold';
            productPrice.innerHTML = `$<span>${salesItem.price}</span>`; // Set the product price

            // Append product details to the productDetailsDiv
            productDetailsDiv.appendChild(productName);
            productDetailsDiv.appendChild(productPrice);

            // Append product image and details to the leftDiv
            leftDiv.appendChild(productImage);
            leftDiv.appendChild(productDetailsDiv);

            // Create a div for the right side of the card
            const rightDiv = document.createElement('div');
            rightDiv.className = 'px-8';

            // Create a p element for the total amount
            const totalAmount = document.createElement('p');
            totalAmount.className = 'font-semibold';
            totalAmount.innerHTML = `$<span>${salesItem.totalAmount}</span>`; // Set the total amount

            // Append total amount to the rightDiv
            rightDiv.appendChild(totalAmount);

            // Append leftDiv and rightDiv to the salesItemCard
            salesItemCard.appendChild(leftDiv);
            salesItemCard.appendChild(rightDiv);

            // Append the salesItemCard to the salesDiv
            salesDiv.appendChild(salesItemCard);
        });
    } else {
        // If there are no sales items, display a message
        const noSalesMessage = document.createElement('p');
        noSalesMessage.textContent = 'No sales items available.';
        salesDiv.appendChild(noSalesMessage);
    }
}



// Call the displaySales function to initially display sales items
displaySales();


// Function to calculate and display the total sales amount
function displayTotalSales() {
    // Retrieve sales items from local storage
    const salesItems = JSON.parse(localStorage.getItem('sales')) || [];

    // Calculate the total sales amount
    const totalSalesAmount = salesItems.reduce((total, item) => total + item.totalAmount, 0);

    // Get the h1 element for total sales
    const totalSalesElement = document.querySelector('.total-sales h1 span');

    // Update the content of the span with the total sales amount
    totalSalesElement.textContent = `$${totalSalesAmount}`;
}

// Call the displayTotalSales function to initially display the total sales amount
displayTotalSales();

