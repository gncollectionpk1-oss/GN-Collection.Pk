/* =========================
   GN COLLECTION.PK
   JAVASCRIPT — PART 1
========================= */

const WHATSAPP_NUMBER = "923701098387";

const CART_KEY = "gnCollectionCart";


/* =========================
   HELPER FUNCTIONS
========================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


/* =========================
   MAIN ELEMENTS
========================= */

const themeBtn =
    $("#themeBtn");

const searchInput =
    $("#searchInput");

const categoryFilter =
    $("#categoryFilter");

const productCards =
    $$(".product-card");


/* =========================
   CART ELEMENTS
========================= */

const cartBtn =
    $("#cartBtn");

const cartCount =
    $("#cartCount");

const cartModal =
    $("#cartModal");

const cartItems =
    $("#cartItems");

const cartTotal =
    $("#cartTotal");

const cartOrderBtn =
    $("#cartOrderBtn");


/* =========================
   PRODUCT MODAL ELEMENTS
========================= */

const productModal =
    $("#productModal");

const modalImage =
    $("#modalImage");

const modalBrand =
    $("#modalBrand");

const modalTitle =
    $("#modalTitle");

const modalStars =
    $("#modalStars");

const modalDescription =
    $("#modalDescription");

const modalPrice =
    $("#modalPrice");

const modalCartBtn =
    $("#modalCartBtn");

const modalOrderBtn =
    $("#modalOrderBtn");


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    $("#contactForm");


/* =========================
   OTHER ELEMENTS
========================= */

const noProducts =
    $("#noProducts");


/* =========================
   CART STATE
========================= */

let cart =
    loadCart();

let activeProduct =
    null;
/* =========================
   LOAD CART
========================= */

function loadCart() {

    try {

        const savedCart =
            JSON.parse(
                localStorage.getItem(
                    CART_KEY
                )
            );

        return Array.isArray(savedCart)
            ? savedCart
            : [];

    } catch (error) {

        return [];

    }
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return `Rs. ${Number(price).toLocaleString("en-PK")}`;

}


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

    if (!cartCount) return;

    cartCount.textContent =
        cart.length;

}


/* =========================
   OPEN WHATSAPP
========================= */

function openWhatsApp(message) {

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================
   GET PRODUCT FROM CARD
========================= */

function productFromCard(card) {

    return {

        name:
            card.dataset.product ||
            "GN Collection Watch",

        price:
            Number(
                card.dataset.price || 0
            ),

        image:
            card.dataset.image || "",

        description:
            card.dataset.description || ""

    };

}
/* =========================
   ADD TO CART
========================= */

function addToCart(product) {

    cart.push(product);

    saveCart();

    updateCartCount();

    renderCart();

    alert(
        `${product.name} cart mein add ho gaya.`
    );

}


/* =========================
   REMOVE FROM CART
========================= */

function removeFromCart(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }

    cart.splice(
        index,
        1
    );

    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="cart-empty">Your cart is empty.</p>';

        if (cartTotal) {

            cartTotal.textContent = "";

        }

        return;
    }


    let total = 0;


    /* CART ITEMS */

    cart.forEach(
        (item, index) => {

            total +=
                Number(item.price) || 0;


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "cart-item";


            /* PRODUCT INFO */

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "cart-item-info";


            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "cart-item-name";

            name.textContent =
                item.name;


            const price =
                document.createElement(
                    "div"
                );

            price.className =
                "cart-item-price";

            price.textContent =
                formatPrice(
                    item.price
                );


            info.append(
                name,
                price
            );


            /* REMOVE BUTTON */

            const removeButton =
                document.createElement(
                    "button"
                );

            removeButton.className =
                "remove-btn";

            removeButton.type =
                "button";

            removeButton.textContent =
                "Remove";


            removeButton.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        index
                    );

                }
            );


            row.append(
                info,
                removeButton
            );


            cartItems.appendChild(
                row
            );

        }
    );


    /* CART TOTAL */

    if (cartTotal) {

        cartTotal.textContent =
            `Total: ${formatPrice(total)}`;

    }

}
/* =========================
   OPEN MODAL
========================= */

function openModal(modal) {

    if (!modal) return;

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* =========================
   SHOW PRODUCT DETAILS
========================= */

function showProductDetails(product) {

    activeProduct =
        product;


    if (modalImage) {

        modalImage.src =
            product.image;

        modalImage.alt =
            product.name;

    }


    if (modalBrand) {

        modalBrand.textContent =
            "GN COLLECTION";

    }


    if (modalTitle) {

        modalTitle.textContent =
            product.name;

    }


    if (modalStars) {

        modalStars.textContent =
            "★★★★★";

    }


    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    if (modalPrice) {

        modalPrice.textContent =
            formatPrice(
                product.price
            );

    }


    openModal(
        productModal
    );

}


/* =========================
   ORDER SINGLE PRODUCT
========================= */

function orderProduct(product) {

    const message =

`Assalam o Alaikum GN Collection.Pk!

I want to order:

Product: ${product.name}
Price: ${formatPrice(product.price)}

Please confirm my order and delivery details.`;


    openWhatsApp(
        message
    );

}
/* =========================
   DARK / LIGHT MODE
========================= */

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );

            const lightMode =
                document.body.classList.contains(
                    "light-mode"
                );


            themeBtn.textContent =
                lightMode
                    ? "☾ Dark Mode"
                    : "☀ Dark / Light";


            localStorage.setItem(
                "gnTheme",
                lightMode
                    ? "light"
                    : "dark"
            );

        }
    );

}


/* =========================
   LOAD SAVED THEME
========================= */

if (
    localStorage.getItem(
        "gnTheme"
    ) === "light"
) {

    document.body.classList.add(
        "light-mode"
    );


    if (themeBtn) {

        themeBtn.textContent =
            "☾ Dark Mode";

    }

}


/* =========================
   SEARCH + CATEGORY FILTER
========================= */

function filterProducts() {

    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    let visibleProducts =
        0;


    productCards.forEach(
        card => {

            const productName =
                (
                    card.dataset.name ||
                    ""
                ).toLowerCase();


            const productCategory =
                card.dataset.category ||
                "";


            const searchMatch =
                productName.includes(
                    searchText
                );


            const categoryMatch =
                selectedCategory === "all" ||
                selectedCategory ===
                productCategory;


            const show =
                searchMatch &&
                categoryMatch;


            card.style.display =
                show
                    ? ""
                    : "none";


            if (show) {

                visibleProducts++;

            }

        }
    );


    /* NO PRODUCTS MESSAGE */

    if (noProducts) {

        noProducts.hidden =
            visibleProducts !== 0;

    }

}


/* =========================
   SEARCH INPUT
========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


/* =========================
   CATEGORY FILTER
========================= */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}
/* =========================
   PRODUCT DETAILS BUTTONS
========================= */

$$(".details-btn").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );

                if (!card) return;


                showProductDetails(
                    productFromCard(
                        card
                    )
                );

            }
        );

    }
);


/* =========================
   ADD TO CART BUTTONS
========================= */

$$(".cart-btn").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );

                if (!card) return;


                addToCart(
                    productFromCard(
                        card
                    )
                );

            }
        );

    }
);


/* =========================
   PRODUCT WHATSAPP BUTTONS
========================= */

$$(
    ".product-card .whatsapp-btn"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );

                if (!card) return;


                orderProduct(
                    productFromCard(
                        card
                    )
                );

            }
        );

    }
);


/* =========================
   MODAL ADD TO CART
========================= */

if (modalCartBtn) {

    modalCartBtn.addEventListener(
        "click",
        () => {

            if (activeProduct) {

                addToCart(
                    activeProduct
                );

            }

        }
    );

}


/* =========================
   MODAL WHATSAPP ORDER
========================= */

if (modalOrderBtn) {

    modalOrderBtn.addEventListener(
        "click",
        () => {

            if (activeProduct) {

                orderProduct(
                    activeProduct
                );

            }

        }
    );

}
/* =========================
   OPEN CART
========================= */

if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        () => {

            renderCart();

            openModal(
                cartModal
            );

        }
    );

}


/* =========================
   CLOSE PRODUCT MODAL
========================= */

const closeModalBtn =
    $("#closeModal");

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        () => {

            closeModal(
                productModal
            );

        }
    );

}


/* =========================
   CLOSE CART MODAL
========================= */

const closeCartBtn =
    $("#closeCart");

if (closeCartBtn) {

    closeCartBtn.addEventListener(
        "click",
        () => {

            closeModal(
                cartModal
            );

        }
    );

}


/* =========================
   CLOSE MODAL
   BY CLICKING OUTSIDE
========================= */

[
    productModal,
    cartModal
].forEach(
    modal => {

        if (!modal) return;


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal(
                        modal
                    );

                }

            }
        );

    }
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (productModal) {

                closeModal(
                    productModal
                );

            }


            if (cartModal) {

                closeModal(
                    cartModal
                );

            }

        }

    }
);
/* =========================
   CART → WHATSAPP ORDER
========================= */

if (cartOrderBtn) {

    cartOrderBtn.addEventListener(
        "click",
        () => {

            /* CHECK EMPTY CART */

            if (cart.length === 0) {

                alert(
                    "Cart empty hai."
                );

                return;
            }


            /* CREATE ITEM LIST */

            const items =
                cart
                    .map(
                        (item, index) =>
                            `${index + 1}. ${item.name} - ${formatPrice(item.price)}`
                    )
                    .join("\n");


            /* CALCULATE TOTAL */

            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        Number(
                            item.price || 0
                        ),
                    0
                );


            /* WHATSAPP MESSAGE */

            const message =

`Assalam o Alaikum GN Collection.Pk!

My cart items:

${items}

Total: ${formatPrice(total)}

Please confirm my order and delivery details.`;


            openWhatsApp(
                message
            );

        }
    );

}


/* =========================
   CONTACT FORM → WHATSAPP
========================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#customerName")
                    ?.value
                    .trim() || "";


            const number =
                $("#customerNumber")
                    ?.value
                    .trim() || "";


            const message =
                $("#customerMessage")
                    ?.value
                    .trim() || "";


            const whatsappMessage =

`Assalam o Alaikum GN Collection.Pk!

Name: ${name}

Contact: ${number}

Message:
${message}`;


            openWhatsApp(
                whatsappMessage
            );


            contactForm.reset();

        }
    );

}


/* =========================
   INITIALIZE WEBSITE
========================= */

updateCartCount();

renderCart();

filterProducts();


/* =========================
   GN COLLECTION
   JAVASCRIPT COMPLETE
========================= */