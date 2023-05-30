const Options = () => {
  return (
    <div className="checkout-myBucket-wrapper">
      <div className="extrapoints">
        <div>
          <h6 style={{ fontSize: "medium" }}>No Cutlery</h6>
          <p style={{ fontSize: "x-small" }}>We dont bring plastic</p>
        </div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" />
        </label>
      </div>
      <div className="extrapoints">
        <div style={{ width: "80%" }}>
          <h6 style={{ fontSize: "medium" }}>Contact Less delivery</h6>
          <p style={{ fontSize: "x-small" }}>
            The driver will leave your package outside your door (only valid for
            paid orders)
          </p>
        </div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" />
        </label>
      </div>
    </div>
  );
};

export default Options;
