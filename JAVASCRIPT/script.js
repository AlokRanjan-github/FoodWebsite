let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times')
  navbar.classList.toggle('avtive')
}

// NAV SLIDER ACTIVE PAGE

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};


document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}

// swiper javascript for home page

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

// swiper page for review section

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});

// PRINT BILL SCRIPT

document.getElementById("printButton").addEventListener("click", function () {
  var newWindow = window.open('', '_blank');

  newWindow.document.write('<h1>Bill Summary</h1>');
  newWindow.document.write('<h2>---------------------------</h2>');
  newWindow.document.write('<p>Total Bill: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ₹' + (total).toFixed(2) + '</p>');
  newWindow.document.write('<p>At 10% Off:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹' + (total - (total * 0.1)).toFixed(2) + '</p>');
  newWindow.document.write('<h2>---------------------------</h2>');
  newWindow.document.write('<h2>You need to pay: ₹ ' + (total - (total * 0.1)).toFixed(2) + '</h2>');
  newWindow.document.close();
  newWindow.print();
});

// THANK YOU FUNCTION

function thankYou() {
  document.getElementById('message').innerHTML = `Thankyou for choosing us.!! Your booking is confirmed now.`
}


// CART AND FAVOURITES

let cart = [];
let like = [];
let total = 0;
let previousCart = [];
let previousLike = [];

function addToCart(item, price) {
  cart.push({ item: item, price: price });
  total += price;
  updateCartUI();
}

function addToLike(item, price) {
  like.push({ item: item, price: price });
  updateLikeUI();
}

function updateCartUI() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  cartItemsElement.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.item} - ₹ ${item.price}`;
    li.setAttribute("style", "color: var(--black); border: 2px solid black; list-style: none; width: 95%; border-radius:.5rem; margin: 1rem; box-shadow:  .5rem .5rem .5rem rgba(0, 0, 0, .5); height:3.8rem; font-size: 2rem; display:flex; justify-content:center; align-items: center;background-color:#b2f3b2; font-weight:bold");
    cartItemsElement.appendChild(li);
  });

  totalElement.textContent = `Your total bill = ₹ ${(total).toFixed(2)}`;
  document.getElementById('disctotal').innerHTML = `Flat 10% discount offer Total = ₹ (${(total - (total * 0.1)).toFixed(2)})`;
  document.getElementById('length').innerHTML = `(${cart.length})`;
}

function updateLikeUI() {
  const likeItemsElement = document.getElementById('like-items');

  likeItemsElement.innerHTML = '';
  like.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.item} - ₹ ${item.price}`;

    li.setAttribute("style", "color: var(--black); border: 2px solid black; list-style: none; width: 95%; border-radius:.5rem; margin: 1rem; box-shadow:  .5rem .5rem .5rem rgba(0, 0, 0, .5); height:3.8rem; font-size: 2rem; display:flex; justify-content:center; align-items: center;background-color:#b2f3b2; font-weight:bold");

    likeItemsElement.appendChild(li);
    document.getElementById('lengthOfLike').innerHTML = `(${like.length})`;
  });
}

function showDescription(id) {
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach(description => {
    if (description.id === id) {
      description.style.display = 'block';
    } else {
      description.style.display = 'none';
    }
  });

  if (id === 'description1') {
    previousLike = [...like]; 
  } else {
    previousCart = [...cart]; 
  }
}

function closeDescription(id) {
  document.getElementById(id).style.display = 'none';
  
  if (id === 'description1') {
    like = [...previousLike];
    updateLikeUI();
  } else {
    cart = [...previousCart];
    updateCartUI();
  }
}