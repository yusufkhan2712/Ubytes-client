import React, { useEffect, useState } from "react";
import firestore from "../../firebase";
import "../../App.css";
import coverHome from "../../assets/coverhome.jpg";
import { FastfoodOutlined } from "@material-ui/icons";
import { useHistory } from "react-router";
export default function MerchantList() {
  const [merchantlist, setmerchantlist] = useState([]);
  const history = useHistory();
  useEffect(async () => {
    let mlist = [];
    let m = await firestore.collection("Merchant").get();
    m.forEach((merchant) => {
      mlist.push({
        uid: merchant.id,
        ...merchant.data(),
      });
    });
    setmerchantlist(mlist);
  }, [merchantlist]);
  return (
    <div className="merchant-list-body">
      <div className="merchant-list-top">
        <img src={coverHome}></img>
      </div>
      <div className="merchant-list-bottom">
        <p
          style={{
            marginBottom: "5px",
            fontSize: "medium",
            fontWeight: "bold",
          }}
        >
          Ubytes
        </p>
        <small
          style={{
            fontSize: "small",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Our Merchants
        </small>
        <div className="merchant-list">
          {merchantlist.map((merchant) => (
            <div
              className="merchant-list-item"
              onClick={() => history.push(`${merchant.uid}/delivery`)}
            >
              
              <FastfoodOutlined></FastfoodOutlined>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <small style={{ marginBottom: "5px" }}>
                  {" "}
                  {merchant.brandName}
                </small>
                <small style={{ fontSize: "x-small", color: "grey" }}>
                  {merchant.brandAddress}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
