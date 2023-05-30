import firebase from "firebase";
import { useState } from "react";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import { cart } from "../../basketActions";
import firestore, { auth } from "../../firebase";
import React from "react";

import "./style.css";
export default function LoginPage() {
  const [uemail, setuemail] = useState("");
  const [uphone, setuphone] = useState("");
  const [uname, setuname] = useState("");
  const history = useHistory();
  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    await auth.signInWithPopup(provider).then(async (result) => {
      const user = result.user;
      const phone = user.phoneNumber;
      const name = user.displayName;
      const email = user.email;
      const uid = user.uid;

      await firestore
        .collection("clientusers")
        .doc(uid)
        .set({
          phone: phone ? phone : "",
          name,
          email,
          uid,
          of: cart().of,
          ofMerchant: cart().ofMerchant ? cart().ofMerchant : "",
        });
      localStorage.setItem(
        "user",
        JSON.stringify({
          phone: phone,
          name: name,
          email: email,
          uid: uid,
          of: cart().of,
          user: true,
          ofMerchant: cart().ofMerchant,
        })
      );
    });
    history.goBack();
  };
  const loginMannualy = async () => {
    let users = await firestore
      .collection("clientuser")
      .where("email", "==", uemail)
      .get();
    let ulist = [];
    users.forEach((user) => {
      let _ = user.data();
      _["id"] = user.id;
      ulist.push(_);
    });
    if (ulist.length > 0) {
      await firestore
        .collection("clientuser")
        .doc(ulist[0].id)
        .update({
          email: uemail,
          name: uname,
          phone: uphone,
          of: cart().of ? cart().of : "",
          ofMerchant: cart().ofMerchant ? cart().ofMerchant : "",
        })
        .then((k) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              phone: uphone,
              name: uname,
              email: uemail,

              of: cart().of,
              user: true,
              ofMerchant: cart().ofMerchant,
            })
          );
          history.goBack();
        });

      return;
    } else {
      await firestore
        .collection("clientuser")
        .add({
          email: uemail,
          phone: uphone,
          name: uname,
          of: cart().of ? cart().of : "",
          ofMerchant: cart().ofMerchant ? cart().ofMerchant : "",
        })
        .then((k) => {
          localStorage.setItem(
            "user",
            JSON.stringify({
              phone: uphone,
              name: uname,
              email: uemail,
              signupAt: new Date(),
              of: cart().of,
              user: true,
              ofMerchant: cart().ofMerchant,
            })
          );
          history.goBack();
        });
    }
  };

  return (
    <div className="App">
      <div className="login-main-wrapper">
        <div id="recaptcha-container" />
        <div
          className="login-banner-background"
          style={{
            backgroundImage:
              'url("https://i.pinimg.com/originals/cc/24/27/cc242774cb859237135fac4f0218ae51.gif")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="login-bottom-form-holder">
          {/*   <div className="social-media-login-icon">
            <i
              className="fa fa-google"
              aria-hidden="true"
              onClick={loginWithGoogle}
            />
            <i className="fab fa-facebook-f" aria-hidden="true" />
            <i className="fas fa-envelope" aria-hidden="true" />
          </div> */}
          <p>Signup</p>
          <div className="input-holder-login">
            <input
              onchange={(e) => setuname(e.target.value)}
              placeholder="Name"
              className="login-inputs"
            />
            <input
              onchange={(e) => setuemail(e.target.value)}
              placeholder="Email"
              className="login-inputs"
            />
            <input
              onchange={(e) => setuphone(e.target.value)}
              placeholder="Phone Number"
              className="login-inputs"
            />

            <button className="login-button" onClick={loginMannualy}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
