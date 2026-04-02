document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "techifyCart";
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    const qs = s => document.querySelector(s);
    const qsa = s => document.querySelectorAll(s);

    /* CORE */
    const formatPrice = p => p.toLocalString() + "kr";
    
    function save() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function cartCount() {
        return cart.reduce((t, i) => t + i.qty, 0);
    }

    function cartTotal() {
        return cart.reduce((t, i) => t + (i.price * i.qty), 0);
    }
     /* NAV */
    function updateNav() {
        const link = qs("#cartLink") || [...qsa("nav a")].find(a => a.textContent.includes("Cart"));

        if (link) {  
            link.textContent = `Cart (${cartCount()})`;

            link.onclick = (e) => {
                e.preventDefault();
                openSideCart();
            };
        }

    }
    
    /* TOAST */
    function toast(msg) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = msg;
        document.body.appendChild(t);

        setTimeout(() => t.classList.add("show"), 10);
        setTimeout(() => t.remove(), 2000);
    }

/* ADD TO CART */
    function addToCart(product) {
        if (!product) return;
        
        const found = cart.find(i => i.id === product.id);

        if (found) found.qty++;
        else cart.push({ ...product, qty: 1 });

        save();
        updateNav();
        renderSideCart();
        toast(`${product.name} added ✅`);
        openSideCart();
    }

/* SIDE CART */
const sideCart = qs("#sideCart");
const sideCartItems = qs("#sideCartItems");
const sideCartTotal = qs("#sideCartTotal");

function openSideCart(){
    sideCart?.classList.add("open");
    renderSideCart();
}

function closeSideCart(){
    sideCart?.classList.remove("open");
}

qs("#closeCart")?.addEventListener("click", closeSideCart);

qs("#goToCart")?.addEventListener("click", () => {
    window.location.href = "cart.html";
});

function renderSideCart() {
    if (!sideCartItems) return;

    if (cart.length ===0){
        sideCartItems.innerHTML = "<p>Your cart is empty</p>";
        sideCartTotal.textContent = "Total: 0 kr";
        return;
    }

    sideCartItems.innerHTML = cart.map(item => `
        <div class="side-item">
            <span>${item.name} (${item.qty})</span>
            <span>${formatPrice(item.price * item.qty)}kr</span>
        </div>
        `).join("");


        sideCartTotal.textContent = `Total: ${formatPrice(cartTotal())}`;
}

/* CHANGE QTY */
    function changeQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        item.qty += delta;

        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }

        save();
        renderCartPage();
        renderSideCart()
        updateNav();
    }

    function removeFromCart(id) {
        cart = cart.filter(i => i.id !== id);
        save();
        renderCartPage();
        renderSideCart();
        updateNav();
    }

    /* PRODUCT CARDS */
    qsa(".product-card").forEach(card => {
        const id = parseInt(card.dataset.id);
        const product = PRODUCTS.find(p => p.id === id);
        const btn = card.querySelector("button");

        if (!product || !btn) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(product);
        });
    });

    
    /* PRODUCT PAGE */
    const productSection = qs("#productSection");

    if(productSection) {
        const id = parseInt(new URLSearchParams(location.search).get("id"));
        const p = PRODUCTS.find(p => p.id === id);

        if(!p) {
            productSection.innerHTML = "<p>Product not found</p>";
        } else {
            productSection.innerHTML = `
              <div class="product-detail">
                <img src="${p.image}">
                <h2>${p.name}</h2>
                <p>${p.overview}</p>
                <p class="price">${p.price}kr</p>
                <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
                <button id="addBtn">Add to Cart</button>
                </div>
            `;

         qs("#addBtn").onclick = () => addToCart(p);
        }
    }

    /* FILTERS */
    qs(".#applyfilters")?.addEventListener("click", () => {
        const checked = [...qsa(".filters input:checked")].map(i => i.value);
        
        qsa(".product-card").forEach(card => {
          const id = parseInt(card.dataset.id);
          const product = PRODUCTS.find(p => p.id === id);

          const match =
            checked.length === 0 ||
            checked.includes(product.category);

          card.style.display = match ? "flex" : "none";
        });
    });


       /*  CART PAGE  */
       function renderCartPage() {
           const cartSection = qs("#cartSection");
           if(!cartSection) return;

           if(cart.length === 0) {
               cartSection.innerHTML = "<h2>Your cart is empty</h2>";
               return;
           }

           cartSection.innerHTML = ` 
               ${cart.map(item => `
               <div class="cart-item">
                <img src="${item.image}" width="80">
                <div>
                 <h3>${item.name}</h3>

                 <div class="qty">
                     <button class="minus" data-id="${item.id}">-</button>
                     <span>${item.qty}</span>
                     <button class="plus" data-id="${item-id}">+</button>
                 </div>

                 <p>${formatPrice(item.price * item.qty)}</p>
                 <button class="remove" data-id="${item.id}">Remove</button>
              </div>
            </div>
        `).join("")}

        <div class="cart-total">
            <h2>Total: ${formatPrice(cartTotal())}</h2>
            <button class="checkout">Checkout</button>
        </div>
    `;

    qsa(".plus").forEach(b =>
        b.onclick = () => changeQty(parseInt(b.dataset.id), 1)
    );

    qsa(".minus").forEach(b =>
        b.onclick = () => changeQty(parseInt(b.dataset.id), -1)
    );

    qsa(".remove").forEach(b =>
        b.onclick = () => removeFromCart(parseInt(b.dataset.id))
    );

    qs(".checkout").onclick = () => {
        toast("Order placed 🎉");
        cart = [];
        save();
        renderCartPage();
        renderSideCart();
        updateNav();
     };
 }

 renderCartPage();
 renderSideCart();
 updateNav();

});








