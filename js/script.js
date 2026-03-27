console.log("Techify ecommerce loaded");

/*----STORAGE-----*/

const CART_KEY = "techifyCart";
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

/*----HELPERS------*/

const qs = (s) => document.querySelector(s);
const qsa = (s) => document.querySelectorAll(s);

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatKr(n) {
    return n + "kr";
}

/*----CART LINK----*/

const cartLink = [...qsa("nav a")].find(a =>
    a.textContent.includes("Cart")
);

function updateCartCount() {
    const count = cart.reduce((t,i)=>t+i.qty,0);
    cartLink.textContent = `Cart (${count})`;
}
updateCartCount();

/*-----DRAWER------*/

const drawer = document.createElement("div");
drawer.id = "cart-drawer";
drawer.innerHTML =`
  <div class="drawer-inner">
    <h2>Your Cart</h2>
    <div id="drawer-items"></div>
    <h3 id="drawer-total"></h3>
    <button id="close-drawer">close</button>
  </div>
  `;
  document.body.appendChild(drawer);


/*-----DRAWER STYLE-----*/

  const style = document.createElement("style");
  style.textContent =`
  #cart-drawer{
    position:fixed;top:0;right:-400px;width:380px;height:100%;
    background:white;box-shadow:-5px 0 15px rgba (0,0,0,.2);
    transition:right .4s;padding:1rem;z-index:9999;overflow:auto;
  }
  #cart-drawer.open{right:0}
  .drawer-inner img{width:70px}
  .drawer-item{display:flex;gap:10px;margin:1rem 0; align-items:center}
  .qty{display:flex;gap:6px;align-items:center}
  .qty button{padding:2px 8px}
  .remove{background:#c0392b;color:white}
  `;
  document.head.appendChild(style);

  /*----OPEN/CLOSE----*/

  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    renderDrawer();
    drawer.classList.add("open");
  });

  qs("#close-drawer").onclick = () =>
     drawer.classList.remove("open");

  /*-----PRODUCTS-----*/

  const productCards = qsa(".product-card");

  productCards.forEach((card, index) =>{
    const id = index + 1;
    const title = card.querySelector("h3").textContent;
    const price = parseInt(card.querySelector(".price").textContent);
    const img = card.querySelector("img").src;
    const button = card.querySelector("button");

    if (cart.find(i => i.id === id)) {
     button.textContent = "Remove from Cart";
    }

    button.addEventListener("click", () => {
        const found = cart.find(i => i.id === id);

        if(found) {
            cart = cart.filter(i => i.id !== id);
            button.textContent = "Add to Cart";
        } else {
            cart.push({ id, title, price, img, qty: 1 });
            button.textContent = "Remove from Cart";
        }

        saveCart();
        updateCartCount();
    });
  });

  /*-------DRAWER RENDER------*/

  function renderDrawer() {
    const container = qs("#drawer-items");
    const totalEl = qs("#drawer-total");

    container.innerHTML = "";

    if (!cart.length) {
      container.innerHTML = "<p>Your cart is empty</p>";
      totalEl.textContent = "";
      return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const el = document.createElement("div");
        el.className = "drawer-item";
        el.innerHTML = `
        <img src="${item.img}">
            <div>
                <h4>${item.title}</h4>
                <p>${formatKr(item.price)}</p>
                <div class="qty">
                    <button class="dec">-</button>
                    <span>${item.qty}</span>
                    <button class="inc">+</button>
                    <button class="remove">x</button>      
                </div>
            </div>
            `;

            el.querySelector(".inc").onclick = () => changeQty(item.id, 1);
            el.querySelector(".dec").onclick = () => changeQty(item.id, -1);
            el.querySelector(".remove").onclick = () => removeItem(item.id);

            container.appendChild(el);
            });

            totalEl.textContent = "Total: " + formatKr(total);
        }

            /*----CART ACTIONS-----*/

            function changeQty(id, delta) {
                const item = cart.find(i => i.id ===id);
                if (!item) return;

                item.qty += delta;
                if (item.qty < 1) item.qty = 1;

                saveCart();
                renderDrawer();
                updateCartCount();
            }

            function removeItem(id) {
                cart = cart.filter(i => i.id !==id);
                saveCart();
                renderDrawer();
                updateCartCount();
                syncButtons();
            }

            function syncButtons() {
                productCards.forEach((card, index) => {
                    const btn = card.querySelector("button");
                    const exists = cart.find(i => i.id === index + 1);
                    btn.textContent = exists ? "Remove from Cart" : "Add to Cart";
                });
            }
              

            /*---SEARCH---*/

            qs("#search")?.addEventListener("input", (e) => {
                const term = e.target.value.toLowerCase();

            productCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(term) ? "flex" : "none";
               });
            });
           
        

            /*----HERO ROTATOR-----*/

            const heroTitle = qs(".hero-content h2");
            const heroText = qs(".hero-content p");

            const heroSlides = [
                ["Upgrade Your Tech. Upgrade Your Life.",
                "Discover the latest laptops, smartphones and smart devices."],

                ["Performance Meets Innovation",
                "Powerful gadgets built for work, gaming and creativity."],

                ["Smarter Living Starts Here",
                "Wearables, audio gear and tech that fits yours lifestyle."],

                ["Next-Gen Smartphones",
                "OLED displays, 5G speed and pro-grade cameras."]
            ];

            let slide = 0;

            setInterval(() => {
                slide = (slide + 1) % heroSlides.length;

                heroTitle.style.opacity = 0;
                heroText.style.opacity = 0;

                setTimeout(() => {
                    heroTitle.textContent = heroSlides[slide][0];
                    heroText.textContent = heroSlides[slide][1];
                    heroTitle.style.opacity = 1;
                    heroText.style.opacity = 1;
                }, 300);

            }, 5000);






                
    
