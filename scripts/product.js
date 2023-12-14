// Function to generate a unique ID
function generateProductId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to handle the form submission for adding a new product
function addProduct() {
    // Get input values
    const name = document.getElementById('name').value;
    const productImage = document.getElementById('productImage').value;
    const price = document.getElementById('price').value;
    const rating = document.getElementById('rating').value;
    const description = document.getElementById('description').value;

    // Generate a unique product ID
    const productId = generateProductId();

    // Create a product object
    const product = {
        id: productId,
        name: name,
        productImage: productImage,
        price: price,
        rating: rating,
        description: description
    };

    // Retrieve existing products from local storage
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Add the new product to the existing products array
    existingProducts.push(product);

    // Save the updated products array back to local storage
    localStorage.setItem('products', JSON.stringify(existingProducts));

    document.getElementById('name').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('price').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('description').value = '';

}

// Add an event listener to the form submission
document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    addProduct(); 
    location.reload();
});


function openEditModal(productId) {
    // Get the product data from local storage based on the productId
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
  
    // Check if product data is available
    if (product) {
      // Populate the form fields with the product data
      document.getElementById('editName').value = product.name || '';
      document.getElementById('editProductImage').value = product.productImage || '';
      document.getElementById('editPrice').value = product.price || '';
      document.getElementById('editRating').value = product.rating || '';
      document.getElementById('editDescription').value = product.description || '';
  
      // Show the Edit Product modal
      document.getElementById('crud-modal1').classList.remove('hidden');
    } else {
      console.error(`Product not found for ID: ${productId}`);
      console.log('Available product IDs:', products.map(p => p.id));
    }
  }
  
// Variable to store the current productId
let currentProductId;

// Function to open the Edit Product modal with the product data
function openEditModal(productId) {
    // Set the currentProductId
    currentProductId = productId;

    // Get the product data from local storage based on the productId
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);

    // Populate the form fields with the product data
    document.getElementById('editName').value = product.name;
    document.getElementById('editProductImage').value = product.productImage;
    document.getElementById('editPrice').value = product.price;
    document.getElementById('editRating').value = product.rating;
    document.getElementById('editDescription').value = product.description;

    // Show the Edit Product modal
    document.getElementById('crud-modal1').classList.remove('hidden');
}

// Event listener for form submission
document.querySelector('#crud-modal1 form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the edited product data from the form
    const editedProduct = {
        name: document.getElementById('editName').value,
        productImage: document.getElementById('editProductImage').value,
        price: document.getElementById('editPrice').value,
        rating: document.getElementById('editRating').value,
        description: document.getElementById('editDescription').value,
    };

    // Get the current products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Find the index of the product with the matching ID
    const productIndex = products.findIndex(product => product.id === currentProductId);

    // Update the product data in local storage
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...editedProduct };

        // Save the updated products back to local storage
        localStorage.setItem('products', JSON.stringify(products));

        // Close the Edit Product modal
        document.getElementById('crud-modal1').classList.add('hidden');

        location.reload()
    } else {
        console.error('Product not found for ID:', currentProductId);
    }
});


// Function to delete a product by ID
function deleteProduct(productId) {
    // Get the current products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Find the index of the product with the matching ID
    const productIndex = products.findIndex(product => product.id === productId);

    // Check if the product exists
    if (productIndex !== -1) {
        // Remove the product from the array
        products.splice(productIndex, 1);

        // Save the updated products back to local storage
        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
    } else {
        console.error('Product not found for ID:', productId);
    }
}

// Event listener for delete button
document.querySelector('#crud-modal1 form button[type="button"]').addEventListener('click', function () {
    // Call the deleteProduct function with the currentProductId
    deleteProduct(currentProductId);
    location.reload()
});

// Function to display products in the productGrid div
function displayProducts() {
    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Get the productGrid div
    const productGrid = document.getElementById('productGrid');
  
    // Clear existing content in the productGrid
    productGrid.innerHTML = '';
  
    // Iterate through each product and create a card for it
    products.forEach(function (product, index) {
      // Create a product card
      const card = document.createElement('div');
      card.className = 'w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';
  
      // Set a unique ID for the card based on the index
      card.setAttribute('data-product-id', index);
  
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
      detailsDiv.className = 'px-5 pb-5';
  
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
  
      // Create a div for the price
      const priceDiv = document.createElement('div');
      priceDiv.className = 'flex items-center justify-between';
  
      // Create a span element for the price
      const priceSpan = document.createElement('span');
      priceSpan.className = 'text-xl font-bold text-gray-900 dark:text-white';
      priceSpan.textContent = '$' + product.price; // Set the product price
  
      // Append the price span to the price div
      priceDiv.appendChild(priceSpan);
  
      // Create a div for the "Edit Product" button
      const editButtonDiv = document.createElement('div');
      editButtonDiv.className = 'flex gap-1';
  
        // Create an "Edit Product" button
        const editButton = document.createElement('a');
        editButton.className = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer';
        editButton.textContent = 'Edit Product';
        // Add data attributes to the button
        editButton.setAttribute('data-modal-target', 'crud-modal1');
        editButton.setAttribute('data-modal-toggle', 'crud-modal1');
        // Add a data attribute for the product ID
        editButton.setAttribute('data-product-id', product.id); // Make sure this line is present
        // Add a click event listener to open the modal
        editButton.addEventListener('click', function() {
        openEditModal(product.id);
        });
  
      // Append the button to the button div
      editButtonDiv.appendChild(editButton);
  
      // Append the elements to the price div
      priceDiv.appendChild(priceSpan);
      priceDiv.appendChild(editButtonDiv);
  
      // Append the price div to the details div
      detailsDiv.appendChild(priceDiv);
  
      // Append detailsDiv to the card
      card.appendChild(detailsDiv);
  
      // Append the card to the productGrid
      productGrid.appendChild(card);
    });
  }
  
  // Call the displayProducts function to initially display products
  displayProducts();



