document.addEventListener("DOMContentLoaded", () => {

    const CART_KEY = "techifyCart";
    const WISHLIST_KEY = "techifyWishlist";
    let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];

    function saveWishlist() {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }

    function toggleWishlist(product) {
        const exists = wishlist.find(i => i.id === product.id);

        if (exists) {
            wishlist = wishlist.filter(i => i.id !== product.id);
            showToast("Removed from wishlist ❌");
        } else {
            wishlist.push(productSection);
            showToast("Added to wishlist ❤️");
        }

        saveWishlist();
        renderWishlistIcons();
    }


    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    const qs = s => document.querySelector(s);
    const qsa = s => document.querySelectorAll(s);

    /* CORE */
    const formatPrice = p => p.toLocaleString() + "kr";
    
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

    const searchInput = qs("#search");
    const searchResults = qs("#searchResults");

    if (searchInput && searchResults) { 

    searchInput?.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        if (!value) {
            searchResults.style.display = "none";
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        searchResults.innerHTML = matches.map(p => `
            <div class="search-item" data-id="${p.id}">
                 ${p.name}
            </div>
            `).join("");

            searchResults.style.display = "block";

            qsa(".search-item").forEach(item => {
                item.onclick = () => {
                    window.location.href = `product.html?id=${item.dataset.id}`;
                };
            });
         });  

         document.addEventListener("click", (e) => {
            if (!e.target.closest(".search-container")) {
                searchResults.style.display = "none";
            }
         });
       }
    
    /* TOAST */
   function showToast(message) {
    const toast = document.querySelector('.toast');
    if (!toast) return;

    toast.textContent = message;

    toast.classList.add('show');

    toast.animate([
        { transform: 'translateY(20px)' },
        { transform: 'translateY(0)' }
    ], { duration: 300 });

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
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
        showToast(`${product.name} added ✅`);
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

qs("#continueShopping")?.addEventListener("click", () => {
    closeSideCart();
});

qs("#checkoutNow")?.addEventListener("click", () => {
    window.location.href = "cart.html?step=payment";
});

function renderSideCart() {
    if (!sideCartItems) return;

    if (cart.length ===0){
        sideCartItems.innerHTML = "<p>Your cart is empty</p>";
        sideCartTotal.textContent = "Total: 0 kr";
        return;
    }

    sideCartItems.innerHTML = cart.map(item => `
        <div class="side-cart-item">
          <img src="${item.image}" class="side-img">

          <div class="side-info">
             <h4>${item.name}</h4>
             <p>${formatPrice(item.price)}</p>

             <div class="qty">
                <button class="minus" data-id="${item.id}">-</button>
                <span>${item.qty}</span>
                <button class="plus" data-id="${item.id}">+</button>
            </div>
          </div>

          <button class="remove" data-id="${item.id}">X</button>
        </div>
        `).join("");


        sideCartTotal.textContent = `Total: ${formatPrice(cartTotal())}`;

/* ATTACH EVENTS */
qsa("#sideCartItems .plus").forEach(b =>
    b.onclick = () => changeQty(parseInt(b.dataset.id), 1)
);

qsa("#sideCartItems .minus").forEach(b =>
    b.onclick = () => changeQty(parseInt(b.dataset.id), -1)
);

qsa("#sideCartItems .remove").forEach(b =>
    b.onclick = () => removeFromCart(parseInt(b.dataset.id))
);
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

              <div class="product-top">
              
              <!--LEFT SIDE-->
              <div class="product-main">

                <img src="${p.image}" alt="${p.name}">

                <div class="product-info">
                  <h2>${p.name}</h2>

                  <div class="rating">
                    ${"★".repeat(Math.floor(p.rating || 4))}
                    <span>${p.rating || 4}.0</span>
                  </div>

                  <p class="price">${p.price} kr</p>

                  <p class="overview">${p.overview}</p>

                  <div class="trust-badges">
                    <div>🚚 Free Shipping over 5000kr</div>
                    <div>↩️ 30-Day Easy Returns</div>
                    <div>🛡️ 2-Year Warranty</div>
                  </div>

                 </div>
                </div>

                <!--RIGHT SIDE-->
                <div class="product-side">
                  <div class="buy-box">

                   <h3>${p.price} kr</h3>

                   <p class="stock ${p.stock === 0 ? "out" : ""}">
                      ${p.stock > 0 ? `In stock (${p.stock})` : "Out of stock"}
                    </p>

                    <button id="addBtn">Add to Cart</button>

                  <!--MINI TRUST-->  

                  <div class="mini-trust">
                    <p>🔒 Secure payment (SSL)</p>
                    <p>⚡ Ships within 24hrs</p>
                    <p>📦 Live order tracking</p>
                  </div>

              </div>
             </div>

              <div class="product-features">
                <h3>Key Features</h3>
                <ul>
                  ${p.features?.map(f => `<li>✔${f}</li>`).join("") || ""}
                </ul>
              </div>

              <div class="review-list">
                <div class="review-card">
                  <strong>Alex</strong>
                  <div class="stars">★★★★★</div>
                  <p>Great product, very fast and reliable.</p>
                </div>
              </div>

              <form class="review-form">
                <h4>Write a review</h4>
                <input type="text" placeholder="Your name" required>
                <select required>
                  <option value="">Rating</option>
                  <option>5</option>
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
                <textarea placeholder="Your review..." required></textarea>
                <button type="submit">Submit Review</button>
              </form>

             </div>

            </div>

            <!--WHY BUY-->
            <div class="why-buy">
              <div class="why-item">
              <h4>⚡ Fast Delivery</h4>
              <p>Delivered in 1-3 days across sweden.</p>
            </div>
            
            <div class="why-item">
              <h4>🎯 Premium Quality</h4>
              <p>Carefully selected tech products you can trust.</p>
            </div>

            <div class="why-item">
             <h4>💬 Real Support</h4>
             <p>24/7 customer support for all your needs.</p>
            </div>
           </div>
          `;

              
         qs("#addBtn").onclick = () => addToCart(p);
        }
    }

    /* FILTERS */
    qs("#applyFilters")?.addEventListener("click", () => {
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

    const clearBtn = document.querySelector(".clear-filters");

    clearBtn?.addEventListener("click", () => {

        document.querySelectorAll(".filters input[type='checkbox']")
              .forEach(input => input.checked = false);

        document.querySelectorAll(".product-card")
            .forEach(card => card.style.display = "flex");
    });

    /* SLIDER */
    const track = document.querySelector('.slider-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const slides = document.querySelectorAll('.slider-track .product-card'); 

    if (track && nextBtn && prevBtn) {

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 260, behavior: 'smooth'});
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -260, behavior: 'smooth'});
        });

    function updateActiveSlide() {
        const center = track.scrollLeft + track.offsetWidth / 2;
    

    slides.forEach(slide => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;

        if (Math.abs(center - slideCenter) < slide.offsetWidth / 2) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

track.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveSlide);
});

updateActiveSlide();

let autoSlide;

function startAutoSlide() {
    autoSlide = setInterval(() => {
        track.scrollBy({ left: 260, behavior: 'smooth' });

        if (track.scrollLeft + track.offsetWidth >= track.scrollWidth -10) {
            setTimeout(() => {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            }, 500);
        }
    }, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

startAutoSlide();

track.addEventListener("mouseenter", stopAutoSlide);
track.addEventListener("mouseleave", startAutoSlide);

}


       /*  CART PAGE  */
       function openCart () {
        document.getElementById('sideCart').classList.add('open');
        document.body.classList.add('cart-open');
       }

       function closeCart () {
        document.getElementById('sideCart').classList.remove('open');
        document.body.classList.remove('cart-open');
       }

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
                     <button class="plus" data-id="${item.id}">+</button>
                 </div>

                 <p>${formatPrice(item.price * item.qty)}</p>
                 <button class="remove" data-id="${item.id}">Remove</button>
              </div>
            </div>
        `).join("")}

        <div class="checkout-layout">

          <div class="cart-summary">
            <h2>Order Summary</h2>
            <p>Total: <strong>${formatPrice(cartTotal())}</strong></p>

            <button class="pay-now">Pay Now</button>
        </div>

        <form class="payment-form">
          <h2>Payment Details</h2>

          <input type="text" placeholder="Full Name" required>
          <input type="text" placeholder="Card Number" required>
          <input type="text" placeholder="MM/YY" required>
          <input type="text" placeholder="CVV" required>

          <button type="submit">Complete Payment</button>
          </form>


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

    qs(".pay-now")?.addEventListener("click", () => {
        showToast("Order placed 🎉");
        cart = [];
        save();
        renderCartPage();
        renderSideCart();
        updateNav();
     });
 }

 renderCartPage();
 renderSideCart();
 updateNav();

 document.addEventListener("submit", e => {
    if (e.target.classList.contains("review-form")) {
        e.preventDefault();

        const name = e.target.querySelector("input").value;
        const rating = e.target.querySelector("select").value;
        const text = e.target.querySelector("textarea").value;

        const list = document.querySelector(".review-list");

        list.innerHTML += `
          <div class="review-card">
            <strong>${name}</strong>
            <div class="stars">${"★".repeat(rating)}</div>
            <p>${text}</p>
          </div>
        `;

        e.target.reset();
    }
 })
});




      


          









