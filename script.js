
// ============================================================
// GREENLEAF - JAVASCRIPT
// Toàn bộ chức năng chính của website nằm trong file này.
// ============================================================

const PRODUCTS = [
    {"id": 1, "name": "Monstera", "category": "Cây trong nhà", "price": 289000, "image": "https://images.pexels.com/photos/32293880/pexels-photo-32293880.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/monstera.svg", "desc": "Lá xẻ đẹp, phù hợp phòng khách và góc làm việc.", "badge": "Bán chạy"},
    {"id": 2, "name": "Lưỡi Hổ", "category": "Cây trong nhà", "price": 219000, "image": "https://images.pexels.com/photos/22863428/pexels-photo-22863428.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/luoi-ho.svg", "desc": "Dáng cây gọn, khỏe và dễ chăm sóc.", "badge": "Dễ chăm"},
    {"id": 3, "name": "Kim Tiền", "category": "Cây phong thủy", "price": 329000, "image": "https://images.pexels.com/photos/5533421/pexels-photo-5533421.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/kim-tien.svg", "desc": "Cây xanh bóng, thường được chọn để trang trí nhà ở.", "badge": "Yêu thích"},
    {"id": 4, "name": "Trầu Bà", "category": "Cây để bàn", "price": 159000, "image": "https://images.pexels.com/photos/20075996/pexels-photo-20075996.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/trau-ba.svg", "desc": "Tán lá mềm mại, thích hợp bàn học và bàn làm việc.", "badge": "Dễ chăm"},
    {"id": 5, "name": "Bàng Singapore", "category": "Cây trong nhà", "price": 499000, "image": "https://images.pexels.com/photos/6044736/pexels-photo-6044736.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/bang-singapore.svg", "desc": "Dáng cây sang trọng, tạo điểm nhấn cho không gian.", "badge": "Nổi bật"},
    {"id": 6, "name": "Kim Ngân", "category": "Cây phong thủy", "price": 279000, "image": "https://images.pexels.com/photos/7047366/pexels-photo-7047366.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/kim-ngan.svg", "desc": "Cây thân gỗ nhỏ, thích hợp trang trí phòng khách.", "badge": "Phong thủy"},
    {"id": 7, "name": "Dương Xỉ", "category": "Cây ngoài trời", "price": 189000, "image": "https://images.pexels.com/photos/322342/pexels-photo-322342.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/duong-xi.svg", "desc": "Tán lá xanh dày, tạo cảm giác mát và tự nhiên.", "badge": "Dễ chăm"},
    {"id": 8, "name": "Nha Đam", "category": "Cây ngoài trời", "price": 129000, "image": "https://images.pexels.com/photos/7663195/pexels-photo-7663195.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/nha-dam.svg", "desc": "Cây mọng nước, dễ chăm và hợp nơi có nhiều ánh sáng.", "badge": "Dễ chăm"}
];

// ------------------------------------------------------------
// Hàm định dạng tiền Việt.
// ------------------------------------------------------------
function formatPrice(number) {
    return number.toLocaleString("vi-VN") + "đ";
}

// ------------------------------------------------------------
// Lấy giỏ hàng từ trình duyệt.
// ------------------------------------------------------------
function getCart() {
    return JSON.parse(localStorage.getItem("greenleaf_cart") || "[]");
}

// ------------------------------------------------------------
// Lưu giỏ hàng.
// ------------------------------------------------------------
function saveCart(cart) {
    localStorage.setItem("greenleaf_cart", JSON.stringify(cart));
    updateCartCount();
}

// ------------------------------------------------------------
// Cập nhật số lượng trên biểu tượng giỏ hàng.
// ------------------------------------------------------------
function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count;
    });
}

// ------------------------------------------------------------
// Thêm sản phẩm vào giỏ hàng.
// ------------------------------------------------------------
function addToCart(id, quantity = 1) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id, quantity });
    }

    saveCart(cart);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// ------------------------------------------------------------
// Lấy thông tin sản phẩm theo ID.
// ------------------------------------------------------------
function getProduct(id) {
    return PRODUCTS.find(product => product.id === Number(id));
}

// ------------------------------------------------------------
// Xử lý ảnh: nếu ảnh thật lỗi thì dùng ảnh fallback local.
// ------------------------------------------------------------
function imageWithFallback(product) {
    return `
        <img
            src="${product.image}"
            alt="${product.name}"
            onerror="this.onerror=null;this.src='${product.fallback}';"
        >
    `;
}

// ------------------------------------------------------------
// Tạo card sản phẩm.
// ------------------------------------------------------------
function productCard(product) {
    return `
        <article class="product-card">
            <div class="product-visual">
                <a href="detail.html?id=${product.id}" class="product-image">
                    ${imageWithFallback(product)}
                </a>
                <span class="product-badge">${product.badge || "GreenLeaf"}</span>
            </div>

            <div class="product-body">
                <h3>
                    <a href="detail.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>

                <p>${product.desc}</p>

                <div class="price">
                    ${formatPrice(product.price)}
                </div>

                <div class="card-actions">
                    <a
                        class="btn btn-outline"
                        href="detail.html?id=${product.id}"
                    >
                        Xem chi tiết
                    </a>

                    <button
                        class="btn btn-dark"
                        onclick="addToCart(${product.id})"
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </article>
    `;
}

// ------------------------------------------------------------
// Render danh sách sản phẩm.
// ------------------------------------------------------------
function renderProducts(list, targetId = "productGrid") {
    const target = document.getElementById(targetId);

    if (!target) {
        return;
    }

    if (list.length === 0) {
        target.innerHTML = `
            <div class="empty">
                <h3>Không tìm thấy cây phù hợp</h3>
                <p>Hãy thử chọn danh mục hoặc mức giá khác.</p>
            </div>
        `;
        return;
    }

    target.innerHTML = list.map(productCard).join("");
}

// ------------------------------------------------------------
// Bộ lọc sản phẩm.
// ------------------------------------------------------------
function initFilters() {
    const grid = document.getElementById("productGrid");

    if (!grid) {
        return;
    }

    let category = "Tất cả";
    let maxPrice = Infinity;

    function applyFilters() {
        const keyword =
            (document.getElementById("searchInput")?.value || "")
                .trim()
                .toLowerCase();

        const filtered = PRODUCTS.filter(product => {
            const matchCategory =
                category === "Tất cả" ||
                product.category === category;

            const matchPrice =
                product.price <= maxPrice;

            const matchSearch =
                product.name.toLowerCase().includes(keyword) ||
                product.category.toLowerCase().includes(keyword);

            return matchCategory && matchPrice && matchSearch;
        });

        renderProducts(filtered);
    }

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");
            category = button.dataset.category;
            applyFilters();
        });
    });

    document
        .getElementById("priceFilter")
        ?.addEventListener("change", event => {
            maxPrice = event.target.value === "all"
                ? Infinity
                : Number(event.target.value);

            applyFilters();
        });

    document
        .getElementById("searchInput")
        ?.addEventListener("input", applyFilters);

    applyFilters();
}

// ------------------------------------------------------------
// Trang chi tiết sản phẩm.
// ------------------------------------------------------------
function initDetail() {
    const target = document.getElementById("detailContent");

    if (!target) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id")) || 1;
    const product = getProduct(id) || PRODUCTS[0];

    target.innerHTML = `
        <div class="detail-photo">
            ${imageWithFallback(product)}
        </div>

        <div class="detail-info">
            <span class="tag">${product.category}</span>

            <h1>${product.name}</h1>

            <div class="detail-price">
                ${formatPrice(product.price)}
            </div>

            <p>${product.desc}</p>

            <div class="detail-box">
                <strong>Đặc điểm cây</strong>
                <p>
                    Cây có hình dáng đẹp, phù hợp làm điểm nhấn cho
                    không gian sống và góc làm việc.
                </p>

                <strong>Cách chăm sóc</strong>
                <p>
                    Đặt cây ở nơi phù hợp với nhu cầu ánh sáng,
                    tưới vừa đủ và kiểm tra đất trước mỗi lần tưới.
                </p>
            </div>

            <div class="quantity">
                <button onclick="changeDetailQuantity(-1)">−</button>
                <span id="detailQuantity">1</span>
                <button onclick="changeDetailQuantity(1)">+</button>
            </div>

            <button
                class="btn btn-dark"
                onclick="addDetailToCart(${product.id})"
            >
                Thêm vào giỏ hàng
            </button>
        </div>
    `;

    window.detailQuantity = 1;
    window.detailProductId = product.id;

    const related = PRODUCTS
        .filter(item => item.id !== product.id)
        .slice(0, 4);

    renderProducts(related, "relatedGrid");
}

// ------------------------------------------------------------
// Tăng/giảm số lượng ở trang chi tiết.
// ------------------------------------------------------------
function changeDetailQuantity(amount) {
    window.detailQuantity = Math.max(
        1,
        (window.detailQuantity || 1) + amount
    );

    const target = document.getElementById("detailQuantity");

    if (target) {
        target.textContent = window.detailQuantity;
    }
}

// ------------------------------------------------------------
// Thêm số lượng tùy chỉnh từ trang chi tiết.
// ------------------------------------------------------------
function addDetailToCart(id) {
    addToCart(id, window.detailQuantity || 1);
}

// ------------------------------------------------------------
// Render giỏ hàng.
// ------------------------------------------------------------
function renderCart() {
    const target = document.getElementById("cartList");
    const totalTarget = document.getElementById("cartTotal");

    if (!target || !totalTarget) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {
        target.innerHTML = `
            <div class="empty">
                <h3>Giỏ hàng đang trống</h3>
                <p>Hãy chọn một vài chậu cây xinh xắn nhé 🌿</p>
                <a class="btn btn-dark" href="products.html">
                    Xem sản phẩm
                </a>
            </div>
        `;

        totalTarget.textContent = "0đ";
        return;
    }

    let total = 0;

    target.innerHTML = cart.map(item => {
        const product = getProduct(item.id);

        if (!product) {
            return "";
        }

        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        return `
            <div class="cart-item">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.onerror=null;this.src='${product.fallback}';"
                >

                <div>
                    <strong>${product.name}</strong>
                    <div class="price">${formatPrice(product.price)}</div>

                    <div class="cart-controls">
                        <button onclick="changeCartQuantity(${product.id}, -1)">
                            −
                        </button>

                        <strong>${item.quantity}</strong>

                        <button onclick="changeCartQuantity(${product.id}, 1)">
                            +
                        </button>
                    </div>
                </div>

                <div class="cart-price">
                    <strong>${formatPrice(itemTotal)}</strong>
                    <br>

                    <button
                        class="remove"
                        onclick="removeFromCart(${product.id})"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        `;
    }).join("");

    totalTarget.textContent = formatPrice(total);
}

// ------------------------------------------------------------
// Tăng/giảm số lượng trong giỏ hàng.
// ------------------------------------------------------------
function changeCartQuantity(id, amount) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        const newCart = cart.filter(product => product.id !== id);
        saveCart(newCart);
    } else {
        saveCart(cart);
    }

    renderCart();
}

// ------------------------------------------------------------
// Xóa sản phẩm khỏi giỏ hàng.
// ------------------------------------------------------------
function removeFromCart(id) {
    const cart = getCart()
        .filter(product => product.id !== id);

    saveCart(cart);
    renderCart();
}

// ------------------------------------------------------------
// Menu mobile.
// ------------------------------------------------------------
function initMobileMenu() {
    const button = document.getElementById("mobileMenu");
    const links = document.getElementById("navLinks");

    if (!button || !links) {
        return;
    }

    button.addEventListener("click", () => {
        links.classList.toggle("open");
    });
}

// ------------------------------------------------------------
// Chạy các chức năng khi trang đã tải xong.
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initMobileMenu();
    initFilters();
    initDetail();
    renderCart();
    initCheckoutPage();
});


/* ============================================================
   THANH TOÁN: HIỆN BẢNG NHẬP THÔNG TIN KHÁCH HÀNG
   ============================================================ */
(function initCheckoutModal() {
    const overlay = document.getElementById("checkoutOverlay");
    const openBtn = document.getElementById("checkoutButton");
    const closeBtn = document.getElementById("checkoutClose");
    const doneBtn = document.getElementById("checkoutDone");
    const form = document.getElementById("checkoutForm");
    const success = document.getElementById("checkoutSuccess");
    const totalEl = document.getElementById("checkoutTotal");

    if (!overlay || !openBtn) return;

    function getCartTotal() {
        // Hỗ trợ các tên biến giỏ hàng thường dùng trong project.
        try {
            if (typeof cart !== "undefined" && Array.isArray(cart)) {
                return cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
            }
            if (typeof cartItems !== "undefined" && Array.isArray(cartItems)) {
                return cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
            }
        } catch (e) {}
        return 0;
    }

    function formatVND(value) {
        return new Intl.NumberFormat("vi-VN").format(value) + "đ";
    }

    function openCheckout() {
        const total = getCartTotal();
        totalEl.textContent = formatVND(total);
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        if (form) form.style.display = "grid";
        if (success) success.classList.remove("active");
    }

    function closeCheckout() {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    openBtn.addEventListener("click", function (event) {
        event.preventDefault();
        openCheckout();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeCheckout);
    if (doneBtn) doneBtn.addEventListener("click", closeCheckout);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) closeCheckout();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && overlay.classList.contains("active")) {
            closeCheckout();
        }
    });

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Lưu tạm thông tin đơn trong trình duyệt để demo.
            const order = {
                name: document.getElementById("customerName").value.trim(),
                phone: document.getElementById("customerPhone").value.trim(),
                email: document.getElementById("customerEmail").value.trim(),
                address: document.getElementById("customerAddress").value.trim(),
                note: document.getElementById("customerNote").value.trim(),
                payment: document.getElementById("paymentMethod").value,
                total: getCartTotal(),
                createdAt: new Date().toISOString()
            };

            localStorage.setItem("greenleaf_last_order", JSON.stringify(order));

            form.style.display = "none";
            success.classList.add("active");
        });
    }
})();


/* ===== TRANG CHECKOUT.HTML ===== */
function formatMoneyVND(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

function initCheckoutPage() {
    const form = document.getElementById("checkoutPageForm");
    const orderList = document.getElementById("checkoutOrderList");
    const subtotalEl = document.getElementById("checkoutPageSubtotal");
    const totalEl = document.getElementById("checkoutPageTotal");
    const successBox = document.getElementById("checkoutPageSuccess");

    if (!form || !orderList) return;

    const cart = getCart();

    if (cart.length === 0) {
        orderList.innerHTML = '<div class="checkout-empty">Giỏ hàng của bạn đang trống.<br><a href="products.html">Quay lại chọn cây</a></div>';
        subtotalEl.textContent = "0đ";
        totalEl.textContent = "0đ";
        form.querySelectorAll("input, textarea, select, button").forEach(el => el.disabled = true);
        return;
    }

    let total = 0;

    orderList.innerHTML = cart.map(item => {
        const quantity = Number(item.quantity || 1);
        const price = Number(item.price || 0);
        const itemTotal = price * quantity;
        total += itemTotal;

        return `
        <div class="checkout-order-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p class="checkout-order-name">${item.name}</p>
                <span class="checkout-order-qty">Số lượng: ${quantity}</span>
            </div>
            <strong class="checkout-order-price">${formatMoneyVND(itemTotal)}</strong>
        </div>`;
    }).join("");

    subtotalEl.textContent = formatMoneyVND(total);
    totalEl.textContent = formatMoneyVND(total);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const order = {
            name: document.getElementById("customerName").value.trim(),
            phone: document.getElementById("customerPhone").value.trim(),
            email: document.getElementById("customerEmail").value.trim(),
            address: document.getElementById("customerAddress").value.trim(),
            payment: document.getElementById("paymentMethod").value,
            note: document.getElementById("customerNote").value.trim(),
            products: cart,
            total: total,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem("greenleaf_last_order", JSON.stringify(order));
        localStorage.removeItem("greenleaf_cart");

        form.style.display = "none";
        const intro = document.querySelector(".checkout-intro");
        if (intro) intro.style.display = "none";
        successBox.classList.add("active");
        updateCartCount();
    });
}
