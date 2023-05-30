export const cart = () => {
  if (sessionStorage.getItem("basket_ubytes")) {
    return JSON.parse(sessionStorage.getItem("basket_ubytes"));
  } else {
    sessionStorage.setItem(
      "basket_ubytes",
      JSON.stringify({ title: "cart", items: [] })
    );
    return JSON.parse(sessionStorage.getItem("basket_ubytes"));
  }
};
export const updateCart = (cart_) => {
  let price = 0;
  cart_.items.forEach((item) => {
    price += item.totalPrice;
  });
  cart_["total"] = price;
  sessionStorage.setItem("basket_ubytes", JSON.stringify(cart_));
  return cart_;
};
export const Add = (product, parsed = false) => {
  let cart_ = cart();
  if (parsed) {
    cart_.items.push(product);
    updateCart(cart_);
    TotalUpdate(product.productPrice);
    return;
  }
  if (cart_["items"].length > 0) {
    for (let index = 0; index < cart_["items"].length; index++) {
      var element = cart_["items"][index];
      if (element.id === product.id) {
        element.quantity = element.quantity + product.quantity;
      } else {
        cart_["items"].push(product);
      }
    }
  } else if (cart_["items"].length == 0) {
    let _ = [];
    _.push(product);
    cart_["items"] = _;
    TotalUpdate(product.productPrice);
  } else {
    let _ = [];
    _.push(product);
    cart_["items"] = _;
    TotalUpdate(product.productPrice);
  }
  updateCart(cart_);
};
export const Addquantity = (index) => {
  let cart_ = cart();
  cart_.items[index]["totalElements"]++;
  cart_.items[index]["totalPrice"] += parseInt(cart_.items[index].productPrice);

  cart_.total += parseInt(cart_.items[index].productPrice);
  return updateCart(cart_);
};
export const Decreasequantity = (index) => {
  let cart_ = cart();
  cart_.items[index]["totalElements"]--;
  cart_.items[index]["totalPrice"] -= cart_.items[index].productPrice;
  cart_.total -= parseInt(cart_.items[index].productPrice);
  if (
    cart_.items[index]["totalElements"] === 0 ||
    cart_.items[index]["totalPrice"] === 0
  ) {
    cart_.items.pop(index);
  }

  return updateCart(cart_);
};
export const TotalUpdate = (price) => {
  let cart_ = cart();
  if (cart_["total"]) {
    cart_["total"] += price;
    return updateCart(cart_);
  } else {
    cart_["total"] = price;
    return updateCart(cart_);
  }
};
export const Remove = (product, i) => {
  let cart_ = cart();

  for (let index = 0; index < cart_["items"].length; index++) {
    if (i === index) {
      cart_["items"].pop(index);
      cart_["total"] =
        cart_["total"] - parseInt(product.productPrice) * product.totalElements;
    }
  }
  if (!cart_["items"]) {
    cart_["items"] = [];
    cart_["total"] = 0;
  }
  return updateCart(cart_);
};
export const user = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const filterCart = (cart) => {
  let products = [];
  cart.items.forEach((item) => {
    products.push({
      productName: item.productName,
      productPrice: item.totalPrice,
      productQuantity: item.totalElements,
      additionalItems: item.additionalItems,
    });
  });

  return products;
};
export const updateBrand = (payload) => {
  let cart_ = cart();
  cart_["area"] = payload.area;
  cart_["branchName"] = payload.branchName;
  cart_["brandName"] = payload.brandName;
  cart_["of"] = payload.of;
  cart_["ofMerchant"] = payload.ofMerchant;
  cart_["address"] = payload.address;
  cart_["type"] = payload.type;
  cart_["branchBanner"] = payload.branchBanner;
  cart_["tableNumber"] = payload.tableNumber;

  updateCart(cart_);
};
export const emptyCart = () => {
  let cart_ = cart();
  cart_.items = [];
  cart.total = 0;
  updateCart(cart_);
};
export const UpdateProduct = (product, index) => {
  let cart_ = cart();
  cart_.items[index] = product;
  updateCart(cart_);
};
