const PRODUCTS = [
    {"id": 1, "name": "Monstera Deliciosa", "category": "Cây trong nhà", "price": 289000, "image": "https://images.pexels.com/photos/32293880/pexels-photo-32293880.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/monstera.svg", "desc": "Lá xẻ tinh tế, mang đến vẻ đẹp hiện đại cho phòng khách và bàn làm việc.", "badge": "Bán chạy"},
    {"id": 2, "name": "Cây Lưỡi Hổ", "category": "Cây trong nhà", "price": 219000, "image": "https://images.pexels.com/photos/22863428/pexels-photo-22863428.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/luoi-ho.svg", "desc": "Dáng thanh thoát, lọc không khí vượt trội và cực kỳ dễ chăm sóc.", "badge": "Dễ chăm"},
    {"id": 3, "name": "Cây Kim Tiền", "category": "Cây phong thủy", "price": 329000, "image": "https://images.pexels.com/photos/5533421/pexels-photo-5533421.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/kim-tien.svg", "desc": "Tán lá xanh bóng tràn đầy sức sống, biểu tượng của may mắn và tài lộc.", "badge": "Yêu thích"},
    {"id": 4, "name": "Cây Trầu Bà", "category": "Cây để bàn", "price": 159000, "image": "https://images.pexels.com/photos/20075996/pexels-photo-20075996.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/trau-ba.svg", "desc": "Tán lá rủ mềm mại, phù hợp trang trí bàn học, kệ sách và văn phòng.", "badge": "Dễ chăm"},
    {"id": 5, "name": "Bàng Singapore", "category": "Cây trong nhà", "price": 499000, "image": "https://images.pexels.com/photos/6044736/pexels-photo-6044736.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/bang-singapore.svg", "desc": "Dáng cây vươn cao sang trọng, điểm nhấn kiến trúc cho không gian sống.", "badge": "Nổi bật"},
    {"id": 6, "name": "Cây Kim Ngân", "category": "Cây phong thủy", "price": 279000, "image": "https://images.pexels.com/photos/7047366/pexels-photo-7047366.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/kim-ngan.svg", "desc": "Thân bện độc đáo, mang lại năng lượng tích cực và sự hài hòa.", "badge": "Phong thủy"},
    {"id": 7, "name": "Cây Dương Xỉ", "category": "Cây ngoài trời", "price": 189000, "image": "https://images.pexels.com/photos/322342/pexels-photo-322342.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/duong-xi.svg", "desc": "Tán lá xòe mượt mà, gợi cảm giác xanh mát tự nhiên của rừng nhiệt đới.", "badge": "Dễ chăm"},
    {"id": 8, "name": "Cây Nha Đam", "category": "Cây ngoài trời", "price": 129000, "image": "https://images.pexels.com/photos/7663195/pexels-photo-7663195.jpeg?auto=compress&cs=tinysrgb&w=900", "fallback": "images/nha-dam.svg", "desc": "Cây mọng nước giàu sức sống, thích hợp đặt ban công và cửa sổ sáng.", "badge": "Dễ chăm"}
];

function formatPrice(number) {
    return number.toLocaleString("vi-VN") + "đ";
}

function getCart() {
    return JSON.parse(localStorage.getItem("greenleaf_cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("greenleaf_cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count;
    });
}

function showToastNotification(product, quantity = 1) {
    if (!product) return;

    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-card";
    toast.innerHTML = `
        <div class="toast-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <img src="${product.image}" alt="${product.name}" class="toast-img" onerror="this.onerror=null;this.src='${product.fallback}';">
        <div class="toast-content">
            <strong>Đã thêm vào giỏ hàng!</strong>
            <span>${product.name} (x${quantity})</span>
        </div>
        <a href="cart.html" class="toast-link">Xem giỏ hàng</a>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-hiding");
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 300);
    }, 3500);
}

function addToCart(id, quantity = 1) {
    const cart = getCart();
    const item = cart.find(product => product.id === id);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id, quantity });
    }

    saveCart(cart);

    const product = getProduct(id);
    showToastNotification(product, quantity);
}


function getProduct(id) {
    return PRODUCTS.find(product => product.id === Number(id));
}

function imageWithFallback(product) {
    return `<img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${product.fallback}';">`;
}

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
                    <a href="detail.html?id=${product.id}">${product.name}</a>
                </h3>

                <p>${product.desc}</p>

                <div class="price">${formatPrice(product.price)}</div>

                <div class="card-actions">
                    <a class="btn btn-outline" href="detail.html?id=${product.id}">Chi tiết</a>
                    <button class="btn btn-dark" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                </div>
            </div>
        </article>
    `;
}

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

function initFilters() {
    const grid = document.getElementById("productGrid");

    if (!grid) {
        return;
    }

    let category = "Tất cả";
    let maxPrice = Infinity;

    function applyFilters() {
        const keyword = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();

        const filtered = PRODUCTS.filter(product => {
            const matchCategory = category === "Tất cả" || product.category === category;
            const matchPrice = product.price <= maxPrice;
            const matchSearch = product.name.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword);

            return matchCategory && matchPrice && matchSearch;
        });

        renderProducts(filtered);
    }

    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            category = button.dataset.category;
            applyFilters();
        });
    });

    document.getElementById("priceFilter")?.addEventListener("change", event => {
        maxPrice = event.target.value === "all" ? Infinity : Number(event.target.value);
        applyFilters();
    });

    document.getElementById("searchInput")?.addEventListener("input", applyFilters);

    applyFilters();
}

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
            <div class="detail-price">${formatPrice(product.price)}</div>
            <p>${product.desc}</p>

            <div class="detail-box">
                <strong>Đặc điểm cây</strong>
                <p>Cây có kiểu dáng thanh lịch, màu sắc tươi sáng, được trồng trong đất dinh dưỡng cao cấp giúp cây luôn khỏe mạnh.</p>

                <strong>Hướng dẫn chăm sóc</strong>
                <p>Đặt cây ở nơi có ánh sáng tự nhiên dịu nhẹ, tưới nước 2-3 lần/tuần tùy độ ẩm không khí và kiểm tra đất trước khi tưới.</p>
            </div>

            <div class="quantity">
                <button onclick="changeDetailQuantity(-1)">−</button>
                <span id="detailQuantity">1</span>
                <button onclick="changeDetailQuantity(1)">+</button>
            </div>

            <button class="btn btn-dark" onclick="addDetailToCart(${product.id})" style="padding: 16px 32px; font-size: 16px;">
                Thêm vào giỏ hàng
            </button>
        </div>
    `;

    window.detailQuantity = 1;

    const related = PRODUCTS.filter(item => item.id !== product.id).slice(0, 4);
    renderProducts(related, "relatedGrid");
}

function changeDetailQuantity(amount) {
    window.detailQuantity = Math.max(1, (window.detailQuantity || 1) + amount);
    const target = document.getElementById("detailQuantity");

    if (target) {
        target.textContent = window.detailQuantity;
    }
}

function addDetailToCart(id) {
    addToCart(id, window.detailQuantity || 1);
}

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
                <p>Hãy khám phá bộ sưu tập cây cảnh của GreenLeaf ngay hôm nay.</p>
                <a class="btn btn-dark" href="products.html">Xem sản phẩm</a>
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
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${product.fallback}';">
                <div>
                    <strong>${product.name}</strong>
                    <div class="price" style="font-size: 16px; margin-bottom: 0;">${formatPrice(product.price)}</div>

                    <div class="cart-controls">
                        <button onclick="changeCartQuantity(${product.id}, -1)">−</button>
                        <strong>${item.quantity}</strong>
                        <button onclick="changeCartQuantity(${product.id}, 1)">+</button>
                    </div>
                </div>

                <div class="cart-price">
                    <strong>${formatPrice(itemTotal)}</strong>
                    <br>
                    <button class="remove" onclick="removeFromCart(${product.id})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        Xóa
                    </button>
                </div>
            </div>
        `;
    }).join("");

    totalTarget.textContent = formatPrice(total);
}

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

function removeFromCart(id) {
    const cart = getCart().filter(product => product.id !== id);
    saveCart(cart);
    renderCart();
}

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

function initCheckoutPage() {
    const form = document.getElementById("checkoutPageForm");
    const orderList = document.getElementById("checkoutOrderList");
    const subtotalEl = document.getElementById("checkoutPageSubtotal");
    const totalEl = document.getElementById("checkoutPageTotal");
    const successBox = document.getElementById("checkoutPageSuccess");

    if (!form || !orderList) return;

    const cart = getCart();

    if (cart.length === 0) {
        orderList.innerHTML = '<div class="empty" style="padding:30px 10px;">Giỏ hàng của bạn đang trống.<br><br><a href="products.html" class="btn btn-outline">Chọn sản phẩm</a></div>';
        if (subtotalEl) subtotalEl.textContent = "0đ";
        if (totalEl) totalEl.textContent = "0đ";
        form.querySelectorAll("input, textarea, select, button").forEach(el => el.disabled = true);
        return;
    }

    let total = 0;

    orderList.innerHTML = cart.map(item => {
        const product = getProduct(item.id);

        if (!product) return "";

        const quantity = Number(item.quantity || 1);
        const itemTotal = product.price * quantity;
        total += itemTotal;

        return `
        <div class="checkout-order-item">
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='${product.fallback}';">
            <div>
                <p class="checkout-order-name">${product.name}</p>
                <span class="checkout-order-qty">Số lượng: ${quantity}</span>
            </div>
            <strong class="checkout-order-price">${formatPrice(itemTotal)}</strong>
        </div>`;
    }).join("");

    if (subtotalEl) subtotalEl.textContent = formatPrice(total);
    if (totalEl) totalEl.textContent = formatPrice(total);

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

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    initMobileMenu();
    initFilters();
    initDetail();
    renderCart();
    initCheckoutPage();
});
