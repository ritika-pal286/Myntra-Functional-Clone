let bagItems;
let bagItemObjects = [];

onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemsObjects() {
  bagItemObjects = bagItems.map(bagItem => {
    const fullItem = items.find(product => product.id === bagItem.id);
    return {
      ...fullItem,
      quantity: bagItem.quantity
    };
  });
}

function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  let innerHTML = "";

  bagItemObjects.forEach(item => {
    innerHTML += generateItemHTML(item);
  });

  containerElement.innerHTML = innerHTML;
}

function generateItemHTML(item) {
  return `
    <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>

        <div class="quantity-control">
          <button onclick="decreaseQuantity('${item.id}')">–</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity('${item.id}')">+</button>
        </div>

        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>
      <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">X</div>
    </div>
  `;
}

function increaseQuantity(itemId) {
  let item = bagItems.find(obj => obj.id === itemId);
  item.quantity += 1;
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  reloadBag();
}

function decreaseQuantity(itemId) {
  let item = bagItems.find(obj => obj.id === itemId);
  if (item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    reloadBag();
  } else {
    removeFromBag(itemId);
  }
}

function reloadBag() {
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(item => item.id !== itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  reloadBag();
}

function displayBagSummary() {
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalAmount = 0;
  let totalItems = 0;

  bagItemObjects.forEach(item => {
    totalItems += item.quantity;
    totalMRP += item.original_price * item.quantity;
    totalAmount += item.current_price * item.quantity;
  });

  totalDiscount = totalMRP - totalAmount;

  document.getElementById("total-mrp").innerText = `Rs ${totalMRP}`;
  document.getElementById("discount").innerText = `-Rs ${totalDiscount}`;
  document.getElementById("total-amount").innerText = `Rs ${totalAmount}`;

  const priceHeader = document.querySelector(".price-header");
  if (priceHeader) {
    priceHeader.innerText = `PRICE DETAILS (${totalItems} item${totalItems > 1 ? 's' : ''})`;
  }
}



element.classList.add("added");
setTimeout(() => element.classList.remove("added"), 400);
