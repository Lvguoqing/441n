// I am Leo
// Define an empty array to store user information  
var users = [];  
  
// Page initialization function, assuming there are corresponding page elements  
function init() {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
      
    // Display Create User Page 
    showPage('createUserPage');  
}  
  
/**  
 * Display the page with the specified ID and hide all other pages  
 *  
 * @param {string} pageId - The ID of the page to be displayed  
 */  
function showPage(pageId) {  
    // Hide all pages  
    var pages = document.querySelectorAll('.page');  
    for (var i = 0; i < pages.length; i++) {  
        pages[i].style.display = 'none';  
    }  
    // Display the page with the specified ID  
    document.getElementById(pageId).style.display = 'block';  
}  
  
/**  
 * Create a new user and add it to the user array, then jump to the login page  
 */  
function createUser() {  
    // Get the values of the username and password input boxes  
    var username = document.getElementById("username").value;  
    var password = document.getElementById("password").value;  
    // Add new user information to the user array  
    users.push({ username: username, password: password });  
    // Display a prompt for successfully creating a user  
    alert('User ' + username + ' created!');  
    // Jump to login page  
    showPage('loginPage');  
}  
  
/**  
 * Verify login information. If correct, redirect to the shopping page. Otherwise, return to the user creation page  
 */  
function login() {  
    // Obtain the values of the username and password input boxes on the login page  
    var loginUsername = document.getElementById("loginUsername").value;  
    var loginPassword = document.getElementById("loginPassword").value;  
    var found = false; // Mark whether a matching user was found  
    // Traverse user arrays to find matching usernames and passwords  
    for (var i = 0; i < users.length; i++) {  
        if (users[i].username === loginUsername && users[i].password === loginPassword) {  
            found = true; // Found a matching user and set it to true 
            break; // Jump out of loop
        }  
    }  
    // If a matching user is found, redirect to the shopping page  
    if (found) {  
      alert('User ' + loginUsername + ' logged in!');
        showPage('shoppingPage');  
    } else {  
        // If no matching user is found, return to the Create User page  
        showPage('createUserPage');  
        // Display error messages (if needed)  
        alert("Invalid username or password. Please try again.");  
    }  
}  
  
// Assuming that the init function is executed after the page loading is completed  
window.onload = init;  
  
/**  
 * Calculate the total price of items in the shopping cart and display it on the page  
 */  

  
  // script.js  
  document.addEventListener('DOMContentLoaded', () => {    
    const products = document.querySelectorAll('.product');    
    const productTotals = document.getElementById('product-totals');    
    const totalPrice = document.getElementById('total-price');    
    const purchaseButton = document.getElementById('purchase-button');    
    const clearCartButton = document.getElementById('clear-cart-button');    
    
    let cart = [];   
  
    function updateCartSummary() {  
        let total = 0;  
        productTotals.innerHTML = '';  
        cart.forEach((item, index) => {  
            const product = products[item.index];  
            const price = parseFloat(product.getAttribute('data-price'));  
            const quantity = item.quantity;  
            total += price * quantity;  
  
            const productDiv = document.createElement('div');  
            productDiv.innerHTML = `  
                <h3>${product.querySelector('h2').textContent}</h3>  
                <p>Quantity: ${quantity}</p>  
                <p>Price: $${price * quantity}</p>  
                <button class="remove-from-cart" data-cart-index="${index}">Delete</button>  
            `;  
            productTotals.appendChild(productDiv);  
  
            const removeButton = productDiv.querySelector('.remove-from-cart');  
            removeButton.addEventListener('click', () => {  
                cart.splice(index, 1);  
                updateCartSummary();  
            });  
        });  
  
        totalPrice.textContent = total.toFixed(2);  
        purchaseButton.disabled = cart.length === 0;  
    }  
  
    products.forEach((product, index) => {  
        const addToCartButton = product.querySelector('.add-to-cart');  
        const quantityInput = product.querySelector('.quantity');  
        const removeButton = product.querySelector('.remove');  
  
        addToCartButton.addEventListener('click', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity > 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    existingItem.quantity += quantity;  
                } else {  
                    cart.push({ index, quantity });  
                }  
                updateCartSummary();  
                addButton.style.display = 'none';  
                removeButton.style.display = 'block';  
            }  
        });  
  
        quantityInput.addEventListener('input', () => {  
            const quantity = parseInt(quantityInput.value, 10);  
            if (quantity === 0) {  
                const existingItem = cart.find(item => item.index === index);  
                if (existingItem) {  
                    cart.splice(cart.indexOf(existingItem), 1);  
                    updateCartSummary();  
                    addToCartButton.style.display = 'block';  
                    removeButton.style.display = 'none';  
                }  
            }  
        });  



        removeButton.addEventListener('click', () => {  
            const existingItem = cart.find(item => item.index === index);  
            if (existingItem) {  
                cart.splice(cart.indexOf(existingItem), 1);  
                updateCartSummary();  
                addToCartButton.style.display = 'block';  
                removeButton.style.display = 'none';  
            }  
        });  
    });  
      // Add a click event listener for the purchase button 
      purchaseButton.addEventListener('click', () => {  
        if (cart.length > 0) {  
            // Display a successful purchase prompt box  
            alert('Purchase successful! Your items have been processed.');  
              
            // Clear shopping cart (optional, depending on business needs) 
            // cart = [];  
            // updateCartSummary(); // If the shopping cart is cleared, the summary needs to be updated
              
            // Reset the purchase button status (if necessary, such as disabling the button after purchase)
            // purchaseButton.disabled = true; // Determine whether to disable based on actual needs
              
            // Other purchased logic can be added here, such as sending purchase information to the server 
            // ...  
        } else {  
            // Handling when shopping cart is empty (optional)  
            alert('Your cart is empty. Please add items to your cart before purchasing.');  
        }  
    });  
    clearCartButton.addEventListener('click', () => {  
        cart = [];  
        updateCartSummary();  
    });  
});


document.getElementById('contactForm').addEventListener('submit', function(event) {  
    event.preventDefault(); // Block the default submission behavior of forms  
    
    // Clear previous success messages (if any)  
    document.getElementById('successMessage').style.display = 'none';  
    
    // AJAX requests or other backend processing logic can be added here to send data  
    // For demonstration purposes, we will only display a success message  
    
    // Display success message  
    document.getElementById('successMessage').style.display = 'block';  
    
    // Clear form fields (optional)  
    this.reset();  
  });
