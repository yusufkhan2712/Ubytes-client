import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "./header";
import Bucket from "./bucket";
import Note from "./note";
import Options from "./options";
import Payment from "./payment";
import firestore, { auth } from "../../../firebase";
import "./style.css";
import { cart, emptyCart, filterCart, user } from "../../../basketActions";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const CheckoutPage = ({ history, match }) => {
  const [basket, setbasket] = useState(cart());
  const [specialInstruction, setSpecialInstructions] = useState("");
  const [totalItems, setTotalItems] = useState(cart().items.length);
  const [totalAmount, setTotalAmount] = useState(cart().total);
  const [update, setupdate] = useState(0);
  const onChangeSpectInstr = (e) => {
    setSpecialInstructions(e.target.value);
  };
  useEffect(() => {
    setbasket(cart());
  });
  const checkout = async () => {
    if (!localStorage.getItem("user")) {
      history.push("/login");
      return;
    }
    if (basket.type === "dine-in") {
      checkoutCart();
      return;
    }
    const { path } = match;
    const array = path.split("/");
    const merchantId = array[1];
    console.log(merchantId);
    let type = path.split("/")[2];
    history.push(`/${merchantId}/${type}/checkout`);
  };
  const checkoutCart = async () => {
    if (!basket.items || basket.items.length === 0) {
      NotificationManager.error("Add something to cart");

      return;
    }
    let products = filterCart(basket);

    if (!localStorage.getItem("user")) {
      history.push("/login");
      return;
    }
    let payload = {
      ofMerchant: basket.ofMerchant,
      type: basket.type,
      of: basket.of,
      at: new Date(),
      products,
      tableNumber: basket.tableNumber,
      user: user().name,
      useremail: user().email,
      userPhone: user().phone ? user.phone() : "",
      branchName: basket.branchName,
      merchantName: basket.brandName,
      totalPrice: basket.total,
    };

    await firestore
      .collection("orders")
      .add(payload)
      .then((doc) => {
        doc.update({ orderId: doc.id });
        emptyCart();
        let type = window.location.href.split("/")[4];
        window.location =
          window.origin + "/" + `${basket.ofMerchant}/${type}/order/${doc.id}`;
      });
  };
  return (
    <div className="checkout-wrapper">
      <NotificationContainer></NotificationContainer>
      <Header />
      <div className="checkout-wrapper-inner">
        <Bucket />
        <Note setSpecialInstructions={onChangeSpectInstr} />
        {basket.type === "dine-in" ? null : <Options />}
        <Payment
          dine={basket.type === "dine-in" ? true : false}
          totalAmount={basket.total}
        />
      </div>
      <section className="basket-checkout" style={{ display: "block" }}>
        <div className="basket-checkout-button" onClick={checkout}>
          <div className="basket-checkout-button-inner">
            <div className="name">Checkout</div>
            <div className="amt">INR {basket.total}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
