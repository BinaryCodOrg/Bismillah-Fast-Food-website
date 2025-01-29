// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
  $('.filters_menu li').click(function () {
    $('.filters_menu li').removeClass('active');
    $(this).addClass('active');

    var data = $(this).attr('data-filter');
    $grid.isotope({
      filter: data
    })
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all"
    }
  })
});

// nice select
$(document).ready(function () {
  $('select').niceSelect();
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
  ],
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1000: {
      items: 2
    }
  }
});

function toSentenceCase(text) {
  if (!text || typeof text !== "string") {
    return ""; // Return empty string if input is invalid
  }

  // Trim leading/trailing whitespace and convert to sentence case
  return text
    .trim()
    .toLowerCase() // Convert the entire text to lowercase first
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
}

let itemsArray = [{
  "originalPrice": 0, "discountedPrice": 0, "_id":
    "6799cbf89eebe1c74d43987c", "clientFK": "6799cb5d97c3ca61c8a39e3e",
  "category": "pizza", "imgURL": "https://bismillahfastfood.com/images/f1.png", "name": "Tikka Pizza", "description": "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque", "sizes": [{ "name": "Small", "discountedPrice": 340, "originalPrice": 580, "extraToppingPrice": 180, "_id": "6799cbf89eebe1c74d43987d" }, { "name": "Medium", "discountedPrice": 0, "originalPrice": 1150, "extraToppingPrice": 210, "_id": "6799cbf89eebe1c74d43987e" }, { "name": "Large", "discountedPrice": 340, "originalPrice": 1550, "extraToppingPrice": 250, "_id": "6799cbf89eebe1c74d43987f" }], "__v": 0
}, { "_id": "6799d3a62ae55828b5949481", "clientFK": "6799cb5d97c3ca61c8a39e3e", "category": "burger", "imgURL": "https://bismillahfastfood.com/images/f2.png", "name": "Zinger Burger", "description": "Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque", "originalPrice": 350, "discountedPrice": 300, "sizes": [], "__v": 0 }]

async function getItems() {
  try {
    const response = await fetch('http://localhost:3000/api/BismillahAllInOne', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyaW5mbyI6eyJfaWQiOiI2Nzk5YzdhOTRmZTRiZTYwNTg2NjcwNGIiLCJmaXJzdE5hbWUiOiJVc2FtYSIsImxhc3ROYW1lIjoiRmFoZWVtIiwiZW1haWwiOiJ3b3JrQGJpbmFyeWNvZC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRnMTllVHRoNC9vcFptai5OTFBhSUUub2lNd0RlbTVLUkNjY0NiYXBSRXZ2Mk9BbHNCWi8wNiIsImdlbmRlciI6Im1hbGUiLCJwaG9uZSI6IjAzMTIyNDUxMzU3NiIsIlJvbGwiOiJjbGllbnQiLCJzdWJzY3JpcHRpb24iOiJGb3JldmVyIiwicmVmcmVzaFRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SWpZM09UbGpOMkU1TkdabE5HSmxOakExT0RZMk56QTBZaUlzSW1saGRDSTZNVGN6T0RFek1qa3dOaXdpWlhod0lqb3hOek00TlRZME9UQTJmUS5HTlk4V3I0VFpEQ1QxaWFFSFlTWEdsLWVDNGFmbFVlRHFHWFN0VVZNT2YwIiwiX192IjowfSwiaWF0IjoxNzM4MTQyOTE2LCJleHAiOjE3MzgxNTAxMTZ9.tTkVeZZqedqB4fJqgccQwYzz7CWw81foWn0q_Y4qGwg`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(JSON.stringify(data));
    // itemsArray.push(data);
    data.forEach((item) => renderCard(item));
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

getItems();
itemsArray.forEach((item) => renderCard(item));

// Render all items

function renderCard(item) {
  alert("renderCard")
  // Get the container where the cards will be appended
  const container = document.getElementById("CardRender");

  // Create the card structure dynamically
  const card = document.createElement("div");
  card.className = "col-sm-6 col-lg-4 all " + item.category;

  if (item.category === 'pizza') {
    card.innerHTML = `
        <div class="box">
          <div>
            <div class="img-box">
              <img src="${item.imgURL}" alt="${item.name}" />
            </div>
            <div class="detail-box">
              <h5>${item.name}</h5>
              <p>${item.description}</p>
              <div class="options">
                <h6>
                  <span style="font-weight: bold;">PKR ${item.sizes[0].discountedPrice ? item.sizes[0].discountedPrice : item.sizes[0].originalPrice}</span>
                  <sub>
                  ${item.sizes[0].discountedPrice ? `<span style="text-decoration: line-through; color: gray;">PKR ${item.sizes[0].originalPrice}</span>` : ''}
                  </sub>
                </h6>
                <a type="button" id="${item._id}-${item.category}" onclick="openModal(this.id)">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 456.029 456.029"
                    style="enable-background: new 0 0 456.029 456.029"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                               C457.728,97.71,450.56,86.958,439.296,84.91z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
  }
  else {
    card.innerHTML = `
        <div class="box">
          <div>
            <div class="img-box">
              <img src="${item.imgURL}" alt="${item.name}" />
            </div>
            <div class="detail-box">
              <h5>${item.name}</h5>
              <p>${item.description}</p>
              <div class="options">
                <h6>
                  <span style="font-weight: bold;">PKR ${item.discountedPrice}</span>
                  <sub>
                    <span style="text-decoration: line-through; color: gray;">PKR ${item.originalPrice}</span>
                  </sub>
                </h6>
                <a type="button" id="${item._id}-${item.category}" onclick="openModal(this.id)">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 456.029 456.029"
                    style="enable-background: new 0 0 456.029 456.029"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                               C457.728,97.71,450.56,86.958,439.296,84.91z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
  }



  // Append the card to the container
  container.appendChild(card);
}

let AddOnes = [
  {
    id: "12kdjalk",
    category: "Dip",
    name: "Dip souse",
    sizes: 80,
  },
  {
    id: "98712",
    category: "bread",
    name: "Bread",
    sizes: 50,
  },
  {
    id: "98712",
    category: "drink",
    name: "pepsi",
    sizes: [
      { name: "Regular", prize: 70, },
      { name: "Half", prize: 130, },
      { name: "1.5 ltr", prize: 240, },
    ],
  },
  {
    id: "98712",
    category: "drink",
    name: "water",
    sizes: [
      { name: "Half", prize: 70, },
      { name: "Large", prize: 140, },
    ],
  }
]

function openModal(id) {
  // alert(id)

  var parts = id.split('-');
  var category = parts[1];
  var itemId = parts[0];
  console.log('Category:', category);
  console.log('itemId:', itemId);

  let Modal = document.getElementById("modelId");
  const modalTitle = Modal.querySelector('.modal-title'); // Access the title
  modalTitle.textContent = toSentenceCase(category)
  modalTitle.classList.add("font-weight-bold");

  let item = itemsArray.find(item => item._id === itemId);

  if (!item) {
    alert("item not found")
  }

  const modalBody = Modal.querySelector('.modal-body'); // Access the title

  switch (category) {
    case 'pizza':
      pizzaDisplay(item, modalBody);
      break;
    case 'burger':
      burgerDisplay(item, modalBody);
      break;
    case 'drink':
      drinkDisplay(item, modalBody);
      break;
    case 'bread':
      breadDisplay(item, modalBody);
      break;
    case 'dip':
      dipDisplay(item, modalBody);
      break;
    default:
      modalBody.innerHTML = '<p>Item not found</p>';
      console.error('Item not found');
  }

  document.getElementById('launchModalButton').click();
}

function pizzaDisplay(item, modalBody) {
  let sizes = item.sizes;
  let sizesHtml = `
        <div class="row mb-3 align-items-stretch">
            <div class="col-3">
                <img src="${item.imgURL}" alt="${item.name}" class="img-fluid rounded-circle" />
            </div>
            <div class="col-6">
                <div class="row h-100">
                    <div class="col-12">
                        <h5 class="mb-0 font-weight-bold">${item.name} ${sizes[0].name}</h5>
                        <p class="mb-1">1 × <span style="color: orange; font-weight: bold;">PKR ${sizes[0].discountedPrice ? sizes[0].discountedPrice : sizes[0].originalPrice}</span></p>
                    </div>
                    <div class="col-12 mt-auto">
                        <p class="mb-3 font-weight-bold">Sizes</p>
                        <div class="d-flex justify-content-left align-items-center" style="width: 100%; gap: 10px;">
                        ${sizes.map(size => {
    if (size.name === sizes[0].name) {
      return (`<a class="active" type="button">${size.name}</a>`);
    } else {
      return (`<a type="button">${size.name}</a>`);
    }
  }).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row h-100">
                    <div class="col-12 text-center">
                        <p class="font-weight-bold">Quantity</p>
                        <div class="input-group justify-content-center">
                            <div class="input-group-prepend" id="qty-minus-${item.id}">
                                <span class="input-group-text" onclick="Minus('${item.id}')">
                                    <i class=" fa fa-sm fa-solid fa-minus slide-bck-left"></i>
                                </span>
                            </div>
                            <input 
                                class="form-control text-center" 
                                type="text" 
                                value="1" 
                                id="input_${item.id}" 
                                disabled
                            />
                            <div class="input-group-append" id="qty-plus-${item.id}">
                                <span class="input-group-text" onclick="Plus('${item.id}')">
                                    <i class=" fa fa-sm fa-solid fa-plus slide-bck-left"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center mt-3">
                        <p class="font-weight-bold">Extra Toppings
                        <span class="tooltip-container">
                         <i class="fa fa-info-circle" data-toggle="tooltip" title="Chicken Cheese"></i> 
                        <span class="tooltip">Chicken Cheese</span>
                        </span>
                         </p>
                        <button class="btn btn-outline-secondary">
                            + PKR ${sizes[0].extraToppingPrice}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <hr />
    `;

  // Add subtotal
  sizesHtml += `
        <div class="row justify-content-between">
            <div class="col-6">
                <strong>SUBTOTAL:</strong>
            </div>
            <div class="col-3 text-end" style="color: orange; font-weight: bold;">
                PKR  ${sizes[0].discountedPrice ? sizes[0].discountedPrice : sizes[0].originalPrice}
            </div>
        </div>
    `;

  modalBody.innerHTML = sizesHtml;
}

function burgerDisplay(item, modalBody) {
  let sizes = item.sizes;
  let sizesHtml = `
        <div class="row mb-3 align-items-stretch">
            <div class="col-3">
                <img src="${item.imgURL}" alt="${item.name}" class="img-fluid rounded-circle" />
            </div>
            <div class="col-6">
                <div class="row h-100">
                    <div class="col-12">
                        <div class="d-flex flex-column justify-content-center align-items-start h-100">
                             <h5 class="mb-0 font-weight-bold">${item.name} </h5>
                             <p class="mb-1">1 × <span style="color: orange; font-weight: bold;">PKR ${item.discountedPrice ? item.discountedPrice : item.originalPrices}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row h-100">
                    <div class="col-12 text-center">
                        <p class="font-weight-bold">Quantity</p>
                        <div class="input-group justify-content-center">
                            <div class="input-group-prepend" id="qty-minus-${item.id}">
                                <span class="input-group-text" onclick="Minus('${item.id}')">
                                    <i class="fa fa-sm fa-solid fa-minus slide-bck-left"></i>
                                </span>
                            </div>
                            <input 
                                class="form-control text-center" 
                                type="text" 
                                value="1" 
                                id="input_${item.id}" 
                                disabled
                            />
                            <div class="input-group-append" id="qty-plus-${item.id}">
                                <span class="input-group-text" onclick="Plus('${item.id}')">
                                    <i class="fa fa-sm fa-solid fa-plus slide-bck-left"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
    `;

  // Add subtotal
  sizesHtml += `
        <div class="row justify-content-between">
            <div class="col-6">
                <strong>SUBTOTAL:</strong>
            </div>
            <div class="col-3 text-end" style="color: orange; font-weight: bold;">
                PKR ${item.discountedPrice ? item.discountedPrice : item.originalPrices}
            </div>
        </div>
    `;

  modalBody.innerHTML = sizesHtml;
}

let DealsArray = [
  {
    id: "12kdjal",
    category: "burger",
    imgURL: "../images/o1.jpg",
    name: "Deal 1",
    items: ["5 Zinger Burgers", "1 Large Fries", "1 (1.5 liter) Drink"],
    originalPrice: 1000,
  },
  {
    id: "12kdjal89",
    category: "pizza",
    imgURL: "../images/f3.png",
    name: "Deal 2",
    items: ["5 Zinger Burgers", "1 Large Fries", "1 (1.5 liter) Drink"],
    originalPrice: 500,
  },
]

// Get the container where the cards will be rendered
const cardContainer = document.getElementById("DealsRender");

DealsArray.forEach((deal) => renderDeals(deal));

function renderDeals(deal) {
  // Construct the card HTML
  const cardHTML = `
    <div class="col-md-6">
      <div class="box">
        <div class="img-box">
          <img src="${deal.imgURL}" alt="${deal.name}" />
        </div>
        <div class="detail-box">
          <div class="row">
            <div class="col-md-8">
              <h5>${deal.name}</h5>
              <ul class="pl-3">
                ${deal.items.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
            <div class="col-md-4">
              <h6>PKR <span>${deal.originalPrice}</span> Only</h6>
            </div>
          </div>
          <a type='button' class="order-now">
            Order Now
           <svg
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 456.029 456.029"
                      style="enable-background: new 0 0 456.029 456.029"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                     c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                     C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                     c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                     C457.728,97.71,450.56,86.958,439.296,84.91z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                     c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                          />
                        </g>
                      </g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                      <g></g>
                    </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  // Append the card to the container
  cardContainer.innerHTML += cardHTML;
}