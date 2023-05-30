import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";

import Plus from "../../../assets/icons/plus.png";
import {
  Addquantity,
  cart,
  Decreasequantity,
  Remove,
} from "../../../basketActions";

const Bucket = () => {
  const [basket, setbasket] = useState(cart());
  const [bucketItems, setBucketItems] = useState(cart());
  const history = useHistory();
  const editProduct = (item, index) => {
    let type = window.location.pathname.split("/")[2];
    let path = window.location.pathname;
    let merchant = window.location.pathname.split("/")[1];
    let branch = cart().of;
    let item_ = item;
    item_["index"] = index;
    history.push({
      pathname: `${branch}/item/${item.productId}/edit`,
      state: { product: item_ },
    });
    //window.location = `${window.origin}/${merchant}/${type}/${branch}/item/${item.productId}/edit`;
  };

  const removeProductFromBasket = (item, index) => {
    setbasket(Remove(item, index));
  };

  const increaseBucketItem = (index) => {
    setbasket(Addquantity(index));
  };

  const decreaseBucketItem = (index) => {
    setbasket(Decreasequantity(index));
  };

  return (
    <div className="checkout-myBucket-wrapper">
      <div className="checkout-myBucket-inner">
        <div className="myBucket-header">
          <p>My Bucket</p>
          <div
            className="add-itemss"
            // onClick={this.onAddItems}
            onClick={() => history.goBack()}
          >
            <img src={Plus} alt="plus icon" className="plsicn" />
            <p>Add Items</p>
          </div>
        </div>
        <div className="myBucket-bucketList">
          {basket.items.length === 0 || !basket.items ? (
            <div>No Items Here</div>
          ) : (
            basket.items.map((item, index) => {
              if (item.totalElements === 0) {
              } else {
                return (
                  <div key={item.id}>
                    <div className="bucket-card">
                      <img
                        src={item.productImage}
                        alt="food item"
                        className="img"
                      />

                      <div className="bucket-card-content">
                        <div className="name">{item.productName}</div>
                        <div className="prices">{item.info}</div>
                        <div className="prices">
                          <div className="dp">{item.offerPrice}</div>
                          <div className="mp">{item.initialPrice}</div>
                        </div>
                        {item.additionalItems && item.additionalItems.length > 0
                          ? item.additionalItems.map((item_, index) => (
                              <div>
                                {item_.totalQuantity === 0 ? null : (
                                  <>
                                    <div className="prices">
                                      <div className="dp">
                                        {item_.totalQuantity + " x "}
                                        {item_.name}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))
                          : null}
                      </div>

                      <div className="bucket-card-actions">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "10px",
                            width: "70%",
                            justifyContent: "space-between",
                          }}
                        >
                          <i
                            className="fas fa-pencil-alt"
                            onClick={() => editProduct(item, index)}
                          ></i>
                          <i
                            className="fas fa-times"
                            onClick={() => removeProductFromBasket(item, index)}
                          ></i>
                        </div>
                        <div className="bucket-item-actions">
                          <div
                            className="addsub-item-bckt"
                            onClick={() => decreaseBucketItem(index)}
                          >
                            -
                          </div>
                          <div className="bkt-itm-qnt">
                            {item.totalElements}
                          </div>
                          <div
                            className="addsub-item-bckt"
                            onClick={() => increaseBucketItem(index)}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    <div />
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Bucket;
