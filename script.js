// Class representing a product
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Class representing an item in the shopping cart
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to get the total price of this item
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Class representing the shopping cart
class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    // Initialize event listeners
    init() {
        this.bindEvents();
        this.updateTotalPrice();
    }

    // Add an item to the cart
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCart();
    }

    // Remove an item from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Update the quantity of an item
    updateItemQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.displayCart();
            }
        }
    }

    // Get the total price of all items in the cart
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Display the cart items on the page
    displayCart() {
        const cartContainer = document.querySelector('.list-products');
        cartContainer.innerHTML = ''; // Clear existing items

        this.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card-body';
            card.innerHTML = `
                <div class="card" style="width: 18rem">
                    <img src="/${item.product.name.toLowerCase()}.png" class="card-img-top" alt="${item.product.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${item.product.name}</h5>
                        <p class="card-text">This is a ${item.product.name.toLowerCase()}</p>
                        <h4 class="unit-price">${item.product.price} $</h4>
                        <div>
                            <i class="fas fa-plus-circle" data-id="${item.product.id}"></i>
                            <span class="quantity">${item.quantity}</span>
                            <i class="fas fa-minus-circle" data-id="${item.product.id}"></i>
                        </div>
                        <div>
                            <i class="fas fa-trash-alt" data-id="${item.product.id}"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(card);
        });

        // Update total price display
        const totalElement = document.querySelector('.total');
        totalElement.textContent = `${this.getTotalPrice().toFixed(2)} $`;

        // Bind events
        this.bindEvents();
    }

    // Bind event listeners to the elements
    bindEvents() {
        // Add event listeners for plus and minus buttons
        document.querySelectorAll('.fas.fa-plus-circle').forEach(button => {
            
            button.addEventListener('click', () => {

                const productId = button.getAttribute('data-id');
                const item = this.items.find(item => item.product.id === productId);
                if (item) {
                    this.updateItemQuantity(productId, item.quantity + 1);
                }
            });
        });

        document.querySelectorAll('.fas.fa-minus-circle').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const item = this.items.find(item => item.product.id === productId);
                if (item && item.quantity > 1) {
                    this.updateItemQuantity(productId, item.quantity - 1);
                } else if (item && item.quantity === 1) {
                    this.removeItem(productId);
                }
            });
        });

        document.querySelectorAll('.fas.fa-trash-alt').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                this.removeItem(productId);
            });
        });

        document.querySelectorAll('.fas.fa-heart').forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('text-danger');
            });
        });
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    // Create sample products
    const basket = new Product(1, 'Baskets', 100);
    const socks = new Product(2, 'Socks', 20);
    const bag = new Product(3, 'Bag', 50);

    // Initialize the shopping cart
    const cart = new ShoppingCart();

    // Example: Adding items to the cart
    cart.addItem(basket, 1);
    cart.addItem(socks, 2);
    cart.addItem(bag, 1);
});
