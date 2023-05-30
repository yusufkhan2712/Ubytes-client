import { useEffect, useState } from "react";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import PickupFrom from "../pickupSettings/pickupFrom";
import Payment from "../pickupSettings/payment";
import Header from "../pickupSettings/header";

import "../pickupSettings/style.css";
import { cart, filterCart, user, emptyCart } from "../../../basketActions";
import { useHistory } from "react-router";
import firestore from "../../../firebase";
import Select from "react-select";
const DeliverySetting = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState();
  const [basket, setbasket] = useState(cart());
  const [selectedDay, setSelectedDay] = useState("Today");
  const [showarea, setshowarea] = useState(false);
  const [selectedHour, setSelectedHour] = useState("ASAP");
  const [products, setProducts] = useState(cart().items);
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState(null);
  const [Pincode, setPincode] = useState("");
  const checkout = async () => {
    if (!paymentMethod) {
      NotificationManager.error("Please select a payment method");
      return;
    }
    if (!basket.items || basket.items.length === 0) {
      NotificationManager.error("Add something to cart");
      return;
    }
    if (Address == null || Pincode === "" || PhoneNumber === "") {
      NotificationManager.error("Please Type your address");
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
      user: user().name,
      useremail: user().email,
      userPhone: user().phone ? user.phone() : "",
      branchName: basket.branchName,
      merchantName: basket.brandName,
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
        let type = window.location.href.split("/")[4];
        window.location =
          window.origin + "/" + `${basket.ofMerchant}/${type}/order/${doc.id}`;
      });
  };
  const showAreas = async () => {
    let areas = await firestore.collection("Branches").doc(basket.of).get();
    areas = areas.data();
    console.log(areas);
  };
  return (
    <div className="checkout-wrapper">
      <NotificationContainer />
      <Header />
      <div className={showarea ? "del-area-popup-vis" : "del-area-popup-hid"}>
        <input
          style={{ height: "5rem" }}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        ></input>
        <input
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter your pincode"
        ></input>
        <input
          placeholder="Enter your phone number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
      </div>
      <div className="page-checkout">
        <div className="bg-black-100">
          <PickupFrom
            delivery={true}
            setshowarea={setshowarea}
            showarea={Address}
            pincode={Pincode}
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
              <div className="checkout-paymemnt-bill-item">
                <div className="item-tit">Delivery Fee</div>
                <div className="item-cost">INR {basket.deliveryFee}</div>
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
        <div
          className="basket-checkout-button"
          onClick={() => (showarea ? setshowarea(false) : checkout())}
        >
          {showarea ? (
            <div className="basket-checkout-button-inner">
              <div className="name">Save Address</div>
            </div>
          ) : (
            <div className="basket-checkout-button-inner">
              <div className="name">Make Order</div>
              <div className="amt">INR {basket.total}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DeliverySetting;
