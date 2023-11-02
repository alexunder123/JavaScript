'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

//добавляем действие на кнопки

document.querySelector('.featuredItems').addEventListener('click', event => {
    if(!event.target.tagName === "BUTTON") {
		return;
	}
	const featuredEl = event.target.closest('.featuredItem');
	const id = +featuredEl.dataset.id;
	const nameEl = featuredEl.dataset.name;
	const priceEl = +featuredEl.dataset.price;

	addToBasket(id, nameEl, priceEl);
});

//добавляем товары в корзину

let basket = {};
let basketAmount = document.querySelector('.amount');
let basketTotalPrice = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

function addToBasket(id, nameEl, priceEl) {
	if (!(id in basket)) {
		basket[id] = {id: id, name: nameEl, price: priceEl, amount: 0};
	}
	basket[id].amount++;
	basketAmount.textContent = total();
	basketTotalPrice.textContent = totalPrice();
	renderProductInBasket(id);
}

function total() {
	return Object.values(basket).reduce((accum, basket) => accum + basket.amount, 0);
}

function totalPrice() {
	return Object.values(basket)
		.reduce((accum, basket) => accum + basket.price*basket.amount, 0);
}

//Обновляем количество товаров в строке корзины

function renderProductInBasket(productId) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }
  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.amount;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.amount).toFixed(2);
}

//Добавляем строку с новым товаром
  
  function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].amount}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].amount).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}