import axios from "axios";
import Noty from "noty";
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cartCounter");

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e);
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      debugger;
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Item added to cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Something went wrong!",
      }).show();
    });
}
