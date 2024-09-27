let express = require("express");
let app = express();
let cors = require("cors")
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

function addNewItem(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity 
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseInt(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItem(cart, productId, name, price, quantity);
  res.json(result);
});

function editItemQunatity(cart, productId, quantity){
  for(let i=0; i<cart.length; i++){
     if(cart[i].productId === productId){
        cart[i].quantity = quantity;
        break;
     }
  }
  return cart;
}

app.get('/cart/edit', (req, res)=>{
 let productId = parseInt(req.query.productId);
 let quantity = parseInt(req.query.quantity);
 let result = editItemQunatity(cart, productId, quantity);
 res.json(result);
});

function cartDeleteItem(cart, productId) {
  return cart.filter(item => item.productId !== productId);
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cartDeleteItem(cart, productId);
  cart = result;
  res.json(cart);
});

app.get('/cart', (req, res)=>{
  res.json({cartItems: cart});
});

function cartTotalQuantity(cart){
  let totalQuantity = 0;
  for(let i=0; i<cart.length; i++){
    totalQuantity =  totalQuantity + cart[i].quantity;
   }
  return totalQuantity; 
}

app.get('/cart/total-quantity', (req, res)=>{
 let result = cartTotalQuantity(cart);
 res.json({'totalQuantity' : result});
});

function cartTotalPrice(cart){
  let totalPrice = 0;
  for(let i=0; i<cart.length; i++){
    totalPrice = totalPrice + cart[i].price*cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res)=>{
  let result = cartTotalPrice(cart);
  res.json({'totalPrice': result});
});

PORT = 3000;
app.listen(PORT, ()=>{
 console.log("Server is running on https://localhost" + PORT);
});

