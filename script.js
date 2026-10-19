/* =====================================
   SCRIPT.JS PART 1: ORDER, SEARCH & FILTER
===================================== */

// Apna WhatsApp number country code ke sath
const whatsappNumber = "923701098387";

// Website ke elements
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// WhatsApp par order bhejne ka function
function orderOnWhatsApp(productName, productPrice) {
    const message =
        "Assalam o Alaikum! GN Collection.Pk se mujhe ye watch order karni hai:\n\n" +
        "Product: " + productName + "\n" +
        "Price: Rs. " + productPrice + "\n\n" +
        "Please order details confirm kar dein.";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

// Product cards par WhatsApp order buttons
function setupOrderButtons() {
    const orderButtons = document.querySelectorAll(".order-btn");

    orderButtons.forEach(function (button) {
        // Duplicate event listeners se bachao
        if (button.dataset.orderReady === "true") return;

        button.dataset.orderReady = "true";

        button.addEventListener("click", function () {
            const productName = button.dataset.name;
            const productPrice = button.dataset.price;

            if (!productName || !productPrice) {
                alert("Product details available nahi hain.");
                return;
            }

            orderOnWhatsApp(productName, productPrice);
        });
    });
}

// Search aur category filter
function filterProducts() {
    if (!productsGrid) return;

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "all";

    const productCards =
        productsGrid.querySelectorAll(".product-card");

    let visibleCount = 0;

    productCards.forEach(function (card) {
        const productName =
            card.querySelector("h3")?.textContent.toLowerCase() || "";

        const productDescription =
            card.querySelector("p")?.textContent.toLowerCase() || "";

        const productCategory =
            (card.dataset.category || "").toLowerCase();

        const matchesSearch =
            productName.includes(searchTerm) ||
            productDescription.includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) visibleCount++;
    });

    // No results message
    let noResults = document.getElementById("noProductsMessage");

    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement("p");
            noResults.id = "noProductsMessage";
            noResults.className = "no-products";
            noResults.textContent =
                "Sorry! Is search mein koi watch nahi mili.";

            productsGrid.appendChild(noResults);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Search aur category changes par filter chalao
if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

// Page load hone par functions chalao
setupOrderButtons();
filterProducts();
/* =====================================
   SCRIPT.JS PART 2: SHOPPING CART
===================================== */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Har product par Add to Cart button automatically add karo
function setupAddToCartButtons() {
    const productCards = document.querySelectorAll(
        "#productsGrid .product-card"
    );

    productCards.forEach(function (card) {
        if (card.dataset.cartReady === "true") return;

        const orderButton = card.querySelector(".order-btn");
        if (!orderButton) return;

        const addButton = document.createElement("button");

        addButton.type = "button";
        addButton.className = "gold-btn add-cart-btn";
        addButton.textContent = "Add to Cart";
        addButton.style.marginBottom = "8px";

        orderButton.parentNode.insertBefore(addButton, orderButton);

        addButton.addEventListener("click", function () {
            const name = orderButton.dataset.name;
            const price = Number(orderButton.dataset.price);

            if (!name || !Number.isFinite(price) || price <= 0) {
                alert("Product ki details check karein.");
                return;
            }

            addToCart(name, price);
        });

        card.dataset.cartReady = "true";
    });
}

// Cart mein product add karo
function addToCart(name, price) {
    const existingProduct = cart.find(function (item) {
        return item.name === name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    renderCart();

    alert(name + " cart mein add ho gayi!");
}

// Cart display update karo
function renderCart() {
    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    let total = 0;
    let totalQuantity = 0;

    cart.forEach(function (item, index) {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");
        details.textContent =
            item.name +
            " × " +
            item.quantity +
            " — Rs. " +
            (item.price * item.quantity).toLocaleString("en-PK");

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-item";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            cart.splice(index, 1);
            renderCart();
        });

        row.appendChild(details);
        row.appendChild(removeButton);
        cartItems.appendChild(row);
    });

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = total.toLocaleString("en-PK");
}

// Cart modal open karo
if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", function () {
        renderCart();
        cartModal.style.display = "flex";
        cartModal.setAttribute("aria-hidden", "false");
    });
}

// Cart modal close karo
function closeCartModal() {
    if (!cartModal) return;

    cartModal.style.display = "none";
    cartModal.setAttribute("aria-hidden", "true");
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartModal);
}

if (cartModal) {
    cartModal.addEventListener("click", function (event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
}

// Checkout WhatsApp par bhejo
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Checkout se pehle cart mein watch add karein.");
            return;
        }

        let message = "Assalam o Alaikum! GN Collection.Pk se mera order:\n\n";
        let total = 0;

        cart.forEach(function (item) {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            message +=
                item.name +
                " × " +
                item.quantity +
                " = Rs. " +
                subtotal +
                "\n";
        });

        message += "\nTotal: Rs. " + total;
        message += "\n\nPlease delivery details confirm kar dein.";

        const url =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
    });
}

// Cart buttons initialize karo
setupAddToCartButtons();
renderCart();
/* =====================================
   SCRIPT.JS PART 3: THEME & FINAL SETUP
===================================== */

// DARK / LIGHT MODE
const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
    if (!themeBtn) return;

    themeBtn.textContent = document.body.classList.contains("light-mode")
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";
}

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        const currentTheme =
            document.body.classList.contains("light-mode")
                ? "light"
                : "dark";

        try {
            localStorage.setItem("gnCollectionTheme", currentTheme);
        } catch (error) {
            // Theme save na ho sake to bhi button kaam karega.
        }

        updateThemeButton();
    });
}

// Saved theme load karo
try {
    const savedTheme = localStorage.getItem("gnCollectionTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
} catch (error) {
    // Storage unavailable ho to default dark theme rahegi.
}

updateThemeButton();

// ESCAPE KEY SE MODAL CLOSE KARO
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && cartModal) {
        cartModal.style.display = "none";
        cartModal.setAttribute("aria-hidden", "true");
    }
});

// NAVIGATION LINKS PAR SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// INITIAL SETUP
setupOrderButtons();
setupAddToCartButtons();
filterProducts();
renderCart();

console.log("GN Collection.Pk website ready!");