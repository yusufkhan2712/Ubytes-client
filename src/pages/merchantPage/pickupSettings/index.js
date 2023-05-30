import { useEffect, useState } from "react";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import PickupTime from "./pickupTime";
import PickupFrom from "./pickupFrom";
import Payment from "./payment";
import Header from "./header";

import "./style.css";
import { cart, filterCart, user, emptyCart } from "../../../basketActions";
import { useHistory } from "react-router";
import firestore from "../../../firebase";
const PickupSetting = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState();
  const [basket, setbasket] = useState(cart());
  const [selectedDay, setSelectedDay] = useState("Today");
  const [selectedHour, setSelectedHour] = useState("ASAP");
  const [products, setProducts] = useState(cart().items);
  const navigation = useHistory();
  const checkout = async () => {
    if (!paymentMethod) {
      NotificationManager.error("Please select a payment method");
      return;
    }
    if (!basket.items || basket.items.length === 0) {
      NotificationManager.error("Add something to cart");
      return;
    }
    let products = filterCart(basket);

    if (!localStorage.getItem("user")) {
      history.push("/login");
      return;
    }
    console.log(basket);
    let payload = {
      merchantId: basket.items[0].merchantId,
      type: basket.type,
      branchId: basket.items[0].branchId,
      at: new Date(),
      products,
      user: user().name,
      useremail: user().email,
      userPhone: user().phone ? user.phone() : "",
      totalPrice: basket.total,
      selectedDay,
      selectedHour,
      paymentMethod,
    };
    firestore
      .collection("orders")
      .add(payload)
      .then((doc) => {
        doc.update({ orderId: doc.id });
        emptyCart();
        navigation.push(
          `/${basket.items[0].merchantId}/pickup/order/${doc.id}`
        );
        //window.location.href = `${basket.items[0].merchantId}/pickup/order/${doc.id}`;
      });
  };

  return (
    <div className="checkout-wrapper">
      <NotificationContainer />
      <Header />
      <div className="page-checkout">
        <div className="bg-black-100">
          {/*  <PickupFrom
            
          /> */}
          <PickupTime
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
        <div className="checkout-wrapper-inner">
          <div className="checkout-myBucket-wrapper">
            <div className="checkout-myBucket-inner">
              <div className="payment-header">
                Basket total
                <small>(Inclusive of VAT)</small>
              </div>
              <div className="checkout-paymemnt-bill-item">
                <div className="item-tit">Item Total</div>
                <div className="item-cost">INR {basket.total}</div>
              </div>
              <div className="checkout-paymemnt-bill-item">
                <div className="item-tit">Original Item Total</div>
                <div className="item-cost">INR {basket.total}</div>
              </div>
              <hr style={{ border: "2px solid rgb(239, 239, 242)" }} />
              <div className="checkout-paymemnt-bill-item">
                <div className="toPay">To Pay</div>
                <div className="payAmount">INR {basket.total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="basket-checkout" style={{ display: "block" }}>
        <div className="basket-checkout-button" onClick={() => checkout()}>
          <div className="basket-checkout-button-inner">
            <div className="name">Make Order</div>
            <div className="amt">INR {basket.total}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PickupSetting;
