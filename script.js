const products = [
    { id: 1, type: 'hijab', name: 'Silk Chiffon', price: 850, img: '🧣' },
    { id: 2, type: 'hijab', name: 'Premium Jersey', price: 600, img: '🧣' },
    { id: 3, type: 'hijab', name: 'Medina Silk', price: 1200, img: '🧣' },
    { id: 4, type: 'hijab', name: 'Crinkle Cotton', price: 450, img: '🧣' },
    { id: 5, type: 'hijab', name: 'Satin Instant', price: 950, img: '🧣' },
    { id: 6, type: 'hijab', name: 'Modal Hijab', price: 700, img: '🧣' },
    { id: 7, type: 'hijab', name: 'Luxury Cotton', price: 1100, img: '🧣' },
    { id: 8, type: 'perfume', name: 'Oud Al-Malaki', price: 8500, img: '✨' },
    { id: 9, type: 'perfume', name: 'White Musk', price: 4500, img: '🌸' },
    { id: 10, type: 'perfume', name: 'Amber Night', price: 7200, img: '✨' },
    { id: 11, type: 'perfume', name: 'Rose Arabesque', price: 5800, img: '🌹' },
    { id: 12, type: 'perfume', name: 'Golden Sand', price: 3500, img: '✨' },
    { id: 13, type: 'perfume', name: 'Midnight Oud', price: 9800, img: '🌙' },
    { id: 14, type: 'perfume', name: 'Floral Mist', price: 4200, img: '💐' },
    { id: 15, type: 'clothing', name: 'Classic Madawar', price: 6500, img: '🧥' },
    { id: 16, type: 'clothing', name: 'Luxury Abaya', price: 12500, img: '👗' },
    { id: 17, type: 'clothing', name: 'Daily Kaftan', price: 5500, img: '🧥' },
    { id: 18, type: 'clothing', name: 'Prayer Dress', price: 3200, img: '🕌' },
    { id: 19, type: 'clothing', name: 'Evening Madawar', price: 14000, img: '🧥' },
    { id: 20, type: 'clothing', name: 'Linen Kimono', price: 7800, img: '🧥' }
];

let cart = [];

function renderProducts(items) {
    const list = document.getElementById('product-list');
    list.innerHTML = items.map(item => `
        <div class="card">
            <div class="card-img">${item.img}</div>
            <h4 style="margin:5px 0; font-size:0.85rem;">${item.name}</h4>
            <p class="price">${item.price.toLocaleString()} ETB</p>
            <button class="btn-add" onclick="addToCart(${item.id})">Add to Bag</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    if (navigator.vibrate) navigator.vibrate(50);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div><b>${item.name}</b><br><small>${item.price} ETB</small></div>
            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none;">Remove</button>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total-price').innerText = total.toLocaleString() + " ETB";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function filterShop(category, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = category === 'all' ? products : products.filter(p => p.type === category);
    renderProducts(filtered);
}

function searchProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active-nav'));
    document.getElementById(pageId).classList.add('active');
    document.getElementById('nav-' + pageId).classList.add('active-nav');
    window.scrollTo(0,0);
}

function checkout() {
    if (cart.length === 0) return alert("Your bag is empty!");
    
    // 1. Build the text message
    let message = "New Order from Nexus ET:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price} ETB)%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `%0ATotal: ${total.toLocaleString()} ETB`;

    // 2. Use the 'https://wa.me/' format instead of 'whatsapp://'
    // This works better in Acode and mobile browsers
    const phoneNumber = "251911223344"; // Your number here
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    // 3. Open in a new tab
    window.open(whatsappUrl, '_blank');
}

renderProducts(products);