import { httpClient } from "./httpClient.js";
// Retrieve the payload data from the data attribute

const productListEl = document.getElementById("productListEl");
const prevLinkEl = document.getElementById("prevLink");
const nextLinkEl = document.getElementById("nextLink");
productListEl.classList.add("product-list", "col-xl-9");
const pageLinkEl = document.getElementById("page");
const totalPagesLinkEl = document.getElementById("totalPages");

const cartEl = document.getElementById("cartEl");
cartEl.classList.add("col-xl-2");

const freshResponse = async (page=1) => {
  const productsStream = await httpClient(`/api/products?page=${page}`);
  const products = await productsStream.json();

  let cid = JSON.parse(localStorage.getItem("cart"))._id;
  const cartStream = await httpClient(`/api/carts/${cid}`);
  const cart = await cartStream.json();

  return { products, cart };
};

const freshCart = async ()=>{
  try{
    var page = new URLSearchParams(window.location.search).get("page");
    const cart = (await freshResponse(page)).cart;
    renderTableCart('cart-list-table', cartEl, cart[0].products);
  }catch(error){
    console.log(error.message)
  }
}


const freshProducts = async ()=>{
  try{
    var page = new URLSearchParams(window.location.search).get("page");
    const products = (await freshResponse(page)).products;
    renderTable('product-list-table', productListEl, products.payload);
  }catch(error){
    console.log(error.message)
  }
}


const deleteProductFromCart = async (cid, pid) => {
  const response = await httpClient(
    `/api/carts/${cid}/products/${pid}`,
    "DELETE"
  );
  if (!response.ok) {
    throw new Error("Failed deleting a product");
  }
  await freshCart()

};

const addProductToCart = async (cid, pid) => {
  const response = await httpClient(
    `/api/carts/${cid}/products/${pid}`,
    "POST"
  );
  if (!response.ok) {
    throw new Error("Failed addin a product");
  }
  const cart = await response.json();
};

const handleDeleteProduct = async (e, pid) => {
  e.preventDefault();
  const response = await httpClient(`/api/products/${pid}`, "DELETE");
  if (!response.ok) {
    throw new Error("Failed deleting a product");
  }
  const product = await response.json();
  await freshProducts()
};

const handleDeleteProductFromCart = async (e, pid) => {
  e.preventDefault();
  let cid = JSON.parse(localStorage.getItem("cart"))._id;
  await deleteProductFromCart(cid, pid);
};

const handleADDProductToCart = async (e, pid) => {
  e.preventDefault();
  let cid = JSON.parse(localStorage.getItem("cart"))._id;
  await addProductToCart(cid, pid);
  await freshCart()
};


const makePurchaseTicket = async (cid) => {
  const response = await httpClient(
    `/api/carts/${cid}/purchase`,
    "POST",
  );
  if (!response.ok) {
    throw new Error("Failed buying a product");
  }
  const ticket = await response.json();
};

const handleMakePurchaseTicket = async (e) => {
  e.preventDefault();
  let cid = JSON.parse(localStorage.getItem("cart"))._id;
  await makePurchaseTicket(cid);
  await freshCart()
  await freshProducts()
};

function renderTableHeaders(el, tableClass, headers, additionalCols, colsClass) {
  const table = document.createElement("table");
  table.classList.add(tableClass, colsClass);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });

  additionalCols.map(col=> headerRow.appendChild(col))
   
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create and append tbody
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  el.appendChild(table);
}

function renderTableDataRow(tableClass, product, additionalCols) {
  const tbody = document.querySelector(`.${tableClass} tbody`);
  const productRow = document.createElement("tr");

  Object.entries(product).forEach(([key, val]) => {
    const td = document.createElement("td");
    td.textContent = val;
    productRow.appendChild(td);
  });

  additionalCols.map(col=> productRow.appendChild(col))

  tbody.appendChild(productRow);
}

const renderPagination = (response) => {
  prevLinkEl.href = response.prevLink;
  nextLinkEl.href = response.nextLink;

  pageLinkEl.href = `/products?page=${response.page}`;
  pageLinkEl.innerHTML = response.page;

  totalPagesLinkEl.href = `/products?page=${response.totalPages}`;
  totalPagesLinkEl.innerHTML = response.totalPages;
};

const renderTable = (tableClass, el,table) => {
  el.innerHTML = null;


  const th = document.createElement("th");
  th.textContent = "View";

  const deleteTh = document.createElement("th");
  deleteTh.textContent = "Delete";

  const additionalCols = [th, deleteTh]
  renderTableHeaders(productListEl, tableClass, Object.keys(table[0]),additionalCols, 'test');

  // Render data rows
  table.forEach((product) => {

    const td = document.createElement("td");
    td.innerHTML = `<a href="/products/${product._id}">View</a>`;

    const adminTd = document.createElement("td");
    const cartTd = document.createElement("td");

   
    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", (e) => handleDeleteProduct(e, product._id));
    deleteButton.textContent = "Delete Product";
    deleteButton.classList.add("btn", "btn-danger");

    const addButton = document.createElement("button");
    addButton.addEventListener("click", (e) => handleADDProductToCart(e, product._id));
    addButton.textContent = "Add to Cart";
    addButton.classList.add("btn", "btn-primary");

    const deleteFromKart = document.createElement("button");
    deleteFromKart.addEventListener("click", (e) => handleDeleteProductFromCart(e, product._id));
    deleteFromKart.textContent = "Delete From Kart";
    deleteFromKart.classList.add("btn", "btn-danger");
    
    adminTd.appendChild(deleteButton);

    cartTd.appendChild(addButton);
    cartTd.appendChild(deleteFromKart);


    renderTableDataRow(tableClass, product, [td, adminTd ,cartTd]);
  });
};

const renderTableCart = (tableClass, el,table) => {
  let subTotal = 0
  el.innerHTML = null;


  const priceTh = document.createElement("th");
  priceTh.textContent = "price";

  const deleteTh = document.createElement("th");
  deleteTh.textContent = "delete";

  // const additionalCols = [th, deleteTh]
  const additionalCols = [priceTh, deleteTh]
  renderTableHeaders(cartEl, tableClass, ['product', 'quantity'],additionalCols, 'test');
  // Render data rows
  table.forEach((product) => {
    // const td = document.createElement("td");
    // td.innerHTML = `<a href="/products/${product._id}">View</a>`;

    const priceTd = document.createElement("td");
    priceTd.textContent = product._id.price;

    subTotal = Number(product._id.price)*Number(product.quantity) + subTotal

    const subTotalTd = document.createElement("td");
    subTotalTd.textContent = product._id.price*product.quantity;


    const deleteTd = document.createElement("td");
    const button = document.createElement("button");
    deleteTd.appendChild(button);
    button.addEventListener("click", (e) => handleDeleteProductFromCart(e, product._id._id));
    button.textContent = "Delete";
    button.classList.add("btn", "btn-danger");

    renderTableDataRow(tableClass, {product:product._id.title, quantity: product.quantity},[priceTd, subTotalTd, deleteTd]);
  });

  renderTableDataRow(tableClass, {product:'Total', quantity: '', price:'', subTotal},[]);

  const button = document.createElement('button')
  button.textContent='Comprar'
  button.classList.add('btn','btn-primary')
  button.addEventListener("click", (e) => handleMakePurchaseTicket(e));
  el.appendChild(button)

};


// Function to handle URL changes
async function handleUrlChange() {
  // Get the current URL
  var currentUrl = window.location.href;

  // Check if the URL contains the specified URI
  if (currentUrl.includes("http://localhost:8080/products")) {
    // Extract the page number from the URL
    var page = new URLSearchParams(window.location.search).get("page");

    // Do something with the page number

    const products = (await freshResponse(page)).products;
    const cart = (await freshResponse(page)).cart;

    renderPagination(products)
    renderTable('product-list-table', productListEl, products.payload);
    renderTableCart('cart-list-table', cartEl, cart[0].products);
  }
}

// Attach the handleUrlChange function to the hashchange event
window.addEventListener("hashchange", handleUrlChange);

// Initial check when the page loads
handleUrlChange();
