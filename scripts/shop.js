function addToCart(productId) {
    // Retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingCartItem = cartItems.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        // If the product is not in the cart, add it
        cartItems.push({
            id: productId,
            quantity: 1,
        });
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

}



// Function to display products in the productGrid div
function displayProducts() {
    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Get the productGrid div
    const productGrid = document.getElementById('productGrid');

    // Clear existing content in the productGrid
    productGrid.innerHTML = '';

    // Iterate through each product and create a card for it
    products.forEach(function (product) {
        // Create a product card
        const card = document.createElement('div');
        card.className = 'w-full max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';

        // Create a link for the product image
        const imageLink = document.createElement('a');
        imageLink.href = '#';

        // Create an image element
        const image = document.createElement('img');
        image.className = 'p-8 rounded-t-lg';
        image.src = product.productImage; // Set the product image URL
        image.alt = 'product image';

        // Append the image to the link
        imageLink.appendChild(image);

        // Append the link to the card
        card.appendChild(imageLink);

        // Create a div for product details
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'px-5 pb-5 flex-1';

        // Create a link for the product name
        const nameLink = document.createElement('a');
        nameLink.href = '#';

        // Create an h5 element for the product name
        const productName = document.createElement('h5');
        productName.className = 'text-lg font-semibold tracking-tight text-gray-900 dark:text-white';
        productName.textContent = product.name; // Set the product name

        // Append the product name to the link
        nameLink.appendChild(productName);

        // Append the link to the details div
        detailsDiv.appendChild(nameLink);

        // Create a div for product description
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'flex flex-col';

        // Create a p element for product description
        const description = document.createElement('p');
        description.textContent = product.description; // Set the product description

        // Append description to the description div
        descriptionDiv.appendChild(description);

        // Append descriptionDiv to the details div
        detailsDiv.appendChild(descriptionDiv);

        // Create a div for rating
        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'flex font-semibold items-center mt-2.5 mb-5';

        // Create a p element for the "Rating:" text
        const ratingText = document.createElement('p');
        ratingText.textContent = 'Rating: ';

        // Create a span element for the actual rating value
        const ratingValue = document.createElement('span');
        ratingValue.textContent = product.rating; // Set the product rating

        // Append elements to the rating div
        ratingDiv.appendChild(ratingText);
        ratingDiv.appendChild(ratingValue);

        // Append the rating div to the details div
        detailsDiv.appendChild(ratingDiv);

        // Append detailsDiv to the card
        card.appendChild(detailsDiv);

        // Create a div for the price
        const priceDiv = document.createElement('div');
        priceDiv.className = 'flex items-center justify-between mt-auto py-4 px-5';

        // Create a span element for the price
        const priceSpan = document.createElement('span');
        priceSpan.className = 'text-xl font-bold text-gray-900 dark:text-white';
        priceSpan.textContent = '$' + product.price; // Set the product price

        // Append the price span to the price div
        priceDiv.appendChild(priceSpan);

        // Create a div for the "Add To Cart" button
        const addToCartDiv = document.createElement('div');
        addToCartDiv.className = 'flex gap-1';

        // Create an "Add To Cart" button
        const addToCartButton = document.createElement('a');
        addToCartButton.className = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer';
        addToCartButton.textContent = 'Add To Cart';

        // Append data attributes to the button
        addToCartButton.setAttribute('data-product-id', product.id);

        // Add an event listener for the "Add To Cart" button
        addToCartButton.addEventListener('click', function () {
            const productId = addToCartButton.getAttribute('data-product-id');
            addToCart(productId);
        });

        // Append the button to the button div
        addToCartDiv.appendChild(addToCartButton);

        // Append the elements to the price div
        priceDiv.appendChild(priceSpan);
        priceDiv.appendChild(addToCartDiv);

        // Append the price div to the card
        card.appendChild(priceDiv);

        // Append the card to the productGrid
        productGrid.appendChild(card);
    });
}

// Call the displayProducts function to initially display products
displayProducts();