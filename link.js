document.addEventListener('DOMContentLoaded', function() {
    const favBtn = document.getElementById('favBtn');
    const cartBtn = document.getElementById('cartBtn');
    const favSidebar = document.getElementById('favSidebar');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    const closeBtns = document.querySelectorAll('.close-btn');

    function openSidebar(sidebar) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        favSidebar.classList.remove('active');
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    favBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openSidebar(favSidebar);
    });

    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openSidebar(cartSidebar);
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeSidebar);
    });

    overlay.addEventListener('click', closeSidebar);
});

function addToCart(button) {
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');
    const format = button.getAttribute('data-format');

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-details">
            <h4>${title}</h4>
            <p>${format}</p>
            <p>${price}</p>
        </div>
        <button class="remove-item" onclick="removeFromCart(this)">×</button>
    `;

    const cartItems = document.getElementById('cartItems');
    cartItems.appendChild(cartItem);

    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');

    updateCartTotal();
}

function removeFromCart(button) {
    button.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('p:last-of-type').textContent;
        const price = parseInt(priceText.replace('Rp', '').replace('.', ''));
        total += price;
    });

    document.getElementById('cartTotal').innerHTML = `
        <p>Total: Rp${total.toLocaleString('id-ID')}</p>
    `;
}

function toggleFavorite(button) {
    button.classList.toggle('active');
    
    const productData = {
        title: button.dataset.title,
        author: button.dataset.author,
        price: button.dataset.price,
        image: button.dataset.image
    };

    const favoritesContainer = document.querySelector('#favSidebar .sidebar-content');
    
    if (button.classList.contains('active')) {
        const favoriteItem = `
            <div class="favorite-item" data-title="${productData.title}">
                <img src="${productData.image}" alt="${productData.title}">
                <div class="favorite-item-details">
                    <h4>${productData.title}</h4>
                    <p>${productData.author}</p>
                    <p>${productData.price}</p>
                </div>
            </div>
        `;
        favoritesContainer.innerHTML = favoriteItem + favoritesContainer.innerHTML;
    } else {
        const itemToRemove = favoritesContainer.querySelector(`[data-title="${productData.title}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
    }
}












// Add this to your existing JavaScript
document.getElementById('checkoutBtn').addEventListener('click', function() {
    const cartItems = document.getElementById('cartItems');
    const total = document.querySelector('#cartTotal p').textContent;
    
    if (cartItems.children.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Here you can add your checkout logic
    alert(`Proceeding to checkout!\n${total}`);
    
    // Clear cart after successful checkout
    cartItems.innerHTML = '';
    document.querySelector('#cartTotal p').textContent = 'Total: Rp0';
});









function toggleDescription() {
    const modal = document.getElementById('descriptionModal');
    const modalBody = modal.querySelector('.modal-body');
    const fullDescription = document.getElementById('bookDescription').textContent;
    
    modalBody.textContent = fullDescription;
    modal.style.display = 'block';

    // Close modal when clicking the close button
    modal.querySelector('.close-modal').onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}






