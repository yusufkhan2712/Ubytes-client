import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { Add, cart, UpdateProduct } from "../../../basketActions";

import "./product.css";

const ProductPage = (props) => {
  const [additionalItems, setAdditionalItems] = useState([]);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [currentProduct, setcurrentProduct] = useState(
    props.location.state.product
  );
  const [basket, setbasket] = useState(cart());
  const history = useHistory();
  const navigation = useHistory();
  useEffect(() => {
    let edit = window.location.href.split("/")[8];
    if (edit) {
      console.log("edit", props.location);
      setTotalElements(props.location.state.product.totalElements);
      setTotalPrice(props.location.state.product.totalPrice);
      setAdditionalItems(props.location.state.product.additionalItems);
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [currentProduct.id]);

  useEffect(() => {
    calculePrice();
  }, [
    currentProduct.productId,
    additionalItems,
    totalElements,
    additionalItems,
  ]);

  const calculePrice = () => {
    let total = totalElements * parseFloat(currentProduct.productPrice);
    for (let i = 0; i < additionalItems.length; i++) {
      if (!isNaN(additionalItems[i].totalPrice)) {
        total += additionalItems[i].totalPrice;
      }
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    if (currentProduct.additionalItems) {
      const items = [];
      currentProduct.additionalItems.map((item) =>
        items.push({
          ...item,
          totalPrice: item.totalPrice ? item.totalPrice : 0,
          totalQuantity: item.totalQuantity ? item.totalQuantity : 0,
        })
      );
      setAdditionalItems(items);
    } else {
      setAdditionalItems([]);
    }
  }, [currentProduct.productId]);

  const increaseTotalElemets = () => {
    const total = totalElements + 1;
    setTotalElements(total);
  };

  const decreaseTotalElemets = () => {
    if (totalElements === 1) {
      return;
    }
    const total = totalElements - 1;
    setTotalElements(total);
  };

  const addAdditionnalItem = (item, index) => {
    let items = additionalItems;
    let t = totalPrice;
    items[index]["totalQuantity"]++;
    items[index]["totalPrice"] += parseInt(item.price);

    setAdditionalItems(items);
    setTotalPrice(t + parseInt(item.price));
    /*  const items = [...additionalItems];
    const findIndex = items.findIndex((a) => (a.name = item.name));
    const tp = item.totalPrice
      ? item.totalPrice + parseFloat(item.price)
      : parseFloat(item.price);
    const tq = item.totalQuantity ? item.totalQuantity + 1 : 1;
    items[findIndex].totalPrice = tp;
    items[findIndex].totalQuantity = tq;
    setAdditionalItems(items); */
  };

  const descreaseAdditionnalItem = (item, index) => {
  /*   let items = additionalItems;

    items[index]["totalQuantity"]--;
    items[index]["totalPrice"] -= parseInt(item.price);

    setAdditionalItems(items); */
  if (item.totalQuantity > 0) {
      const items = [...additionalItems];
      const findIndex = items.findIndex((a) => (a.name = item.name));
      const tp = item.totalPrice - parseFloat(item.price);
      const tq = item.totalQuantity - 1;
      items[findIndex].totalPrice = tp;
      items[findIndex].totalQuantity = tq;
      setAdditionalItems(items);
    } 
  };

  const addToCart = () => {
    // 1 thing is to check if the product already exist in the basket
    const type = ""; //match.path.includes("/pickup/") ? "pickup" : "delivery";
    let prdct = cart()[currentProduct.productId];
    if (prdct) {
      // check total elements,
      prdct.totalElements += totalElements;
      prdct.totalPrice += totalPrice;
      if (prdct.additionalItems?.length > 0) {
        for (let i = 0; i < prdct.additionalItems.length; i++) {
          const item = prdct.additionalItems[i];
          const findIndex = additionalItems.findIndex(
            (a) => a.name === item.name
          );
          item.totalPrice += additionalItems[findIndex].totalPrice;
          item.totalQuantity += additionalItems[findIndex].totalQuantity;
          prdct.additionalItems[i] = item;
        }
      }
    } else {
      prdct = {
        ...currentProduct,
        id: currentProduct.productId,
        totalPrice,
        totalElements,
        additionalItems,
      };
    }
    if (isEdit) {
      //   E(prdct, true);
      UpdateProduct(prdct, props.location.state.product.index);
      navigation.goBack();
      window.location =
        window.origin +
        "/" +
        prdct.merchantId +
        "/" +
        basket.type +
        "/" +
        prdct.branchId;
      return;
    }

    Add(prdct, true);
    window.location =
      window.origin +
      "/" +
      prdct.merchantId +
      "/" +
      basket.type +
      "/" +
      prdct.branchId;
  };

  const editCart = () => {
    const { branchId } = ""; //match.params;
    let prdct = basket[currentProduct.id];
    const type = ""; //match.path.includes("/pickup/") ? "pickup" : "delivery";
    prdct = {
      ...currentProduct,
      branchId,
      id: currentProduct.id,
      totalPrice,
      totalElements,
      additionalItems,
      type,
    };
    basket[currentProduct.id] = prdct;
    window.sessionStorage.setItem("basket", JSON.stringify(basket));

    window.location =
      window.origin +
      "/" +
      basket.ofMerchant +
      "/" +
      basket.type +
      "/" +
      basket.of;
  };

  const submitCart = () => {
    const path = ""; //match.path;
    //const { productId } = match.params;
    const currentProduct1 = ""; // basket[productId];
    if (path?.endsWith("/edit") && currentProduct1?.id) {
      editCart();
    } else {
      addToCart();
    }
  };

  return (
    <div className="product-info-page-wrapper">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAsCAYAAAAjFjtnAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJNSURBVHgB7ZhPbtNAFMa/FweFBUI5QpDSyLAqN2hugE/Q9ggmBYkVZoUEBcMJak5QbhDfgK6olVTCR+iiCyJsP2acChI7WTTzp5v5SZHGM5L93kxmvm8e4HA4HA4FCJZ59mG2X3Uplu2y4HD+enQBBbqwiP9xfsAenQPcl89etyPaeAIFOrCE//nqEB6mfBu8hFbau2IlAT+evxWznjT7mfEVihjfA3XwjKg1wHiXTfYiKGI0ge3B03E2GSbQgLFN7MezMxH80WqfmK1rLhFkr4YpNKF9BQbRj/7Dx4/k6XKwPsJ5hxD8DNWOzSZaE/DfXw641z0XL91fH+EcVI6z8GkOzWhLQAaP3oOpCHawPmIueImWY3Rb8AxcmAxeopyAtAabZx7pgm6MBi9ROoWa1uA//C17OTqCBXZegU3WoEYKlKXgJSp/oajVo0ld78LOCYjjq7/hbQzL7JwAcxW2OxEtjZs9lHRgdHr1wuvgrL0PKBFe5xgWUBay5Q0L4iSiQWMo/U03QR4+v4ZBtCixHwshY2/aTEIKGS2KIHtjTgv0WYktSYjnHIs/Y1NJaLuR1YorbENtH9bg2mbUdsMA+u10/Kvf42LadqSUl0UVqFYhmhi7kfmnswQdOmx87PZCs5dCE8Yu9dmJsBNCmVf7WIqfsB+1DdGE0apEbSsaSSzhRJfgWanM+Z/mkfhSK2DiMryc+F+ggJW60HIluK3M5CmvgrXKXDYZJVVFAYH+KbOwIMoqbS0Byexk+J2KaiyaqfzJKgUcDofDcZ/8BbSb4PscOSWIAAAAAElFTkSuQmCC"
        alt="back icon"
        className="bckicn"
        onClick={() => history.goBack()}
      />
      <div
        className="pip-banner"
        style={{
          backgroundImage: `url(${currentProduct.productImage})`,
        }}
      />
      <div className="pip-inner">
        <div className="prdctname">{currentProduct.productName}</div>
        <div className="prdct-desc">{currentProduct.productDescription}</div>
        <div className="prdct-desc">
          INR <b style={{ fontWeight: 600 }}>{currentProduct.productPrice}</b>
        </div>
        <div className="note-wrapper">
          <div className="note-header">Special Instructions.</div>
          <div className="note-body">
            <textarea
              name="note"
              placeholder="Send any Special Instruction with the order."
              id="chkout-note-body"
              style={{ width: "100%", outline: "none", color: "black" }}
              defaultValue={""}
            />
          </div>
        </div>
        <div className="pip-adtnlitms">
          <div className="pip-adtnlitms-tit">Customization</div>
          <div className="pip-adtnlitms-list">
            {additionalItems.map((item, index) => (
              <div className="adtnlitms-item">
                <div style={{ maxWidth: "70%" }}>
                  <div
                    className="item-name"
                    onClick={() => addAdditionnalItem(item, index)}
                  >
                    {item.totalQuantity > 0 && <sup>{item.totalQuantity}x</sup>}
                    {item.name}
                  </div>
                </div>
                <div className="item-prc">
                  INR {item.price}
                  {item.totalQuantity > 0 ? (
                    <div onClick={() => descreaseAdditionnalItem(item, index)}>
                      <i className="far fa-trash-alt delicon"></i>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-btwn-secs" />
        <div className="pip-quant-sec">
          <div className="quant-tit">Quantity.</div>
          <div className="quant-butts">
            <div className="addsubbutt">
              <div className="circle" onClick={decreaseTotalElemets}>
                -
              </div>
            </div>
            <div className="quantno">{totalElements}</div>
            <div className="addsubbutt">
              <div className="circle" onClick={increaseTotalElemets}>
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="basket">
        <div className="basket-button" onClick={submitCart}>
          <div className="basket-button-inner">
            <div className="items-quant" />
            <div className="name">
              {isEdit ? "Edit Product" : "Add to basket"}
            </div>
            <div className="amt">INR {totalPrice}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
