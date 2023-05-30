const RecommendedSection = ({ products = [], history }) => {
  return (
    <section className="recommended-wrapper">
      <div className="header-">
        <p
          style={{
            fontSize: "large",
            fontWeight: "bold",
            marginBottom: "0rem",
          }}
        >
          Best Sellers
        </p>
        <p style={{ fontSize: "small", marginBottom: 0 }}>See all</p>
      </div>
      <div className="recommended-wrapper-scroll">
        <div className="scrollthing">
          {products.map((product) => (
            <div key={product.id} className="recommended-card" onClick={()=>history.push(`${history.location.pathname}/item/${product.id}`)}>
              <img
                className="recommended-item-img"
                src={product.productImage}
                alt="productImage"
              />
              <div className="recommended-bottom-bar">
                <div className="recommended-card-row">
                  <div className="product-name">{product.productName}</div>
                  <div className="product-des">
                    {product.productDescription?.length > 50
                      ? `${product.productDescription?.substring(0, 50)}...`
                      : product.productDescription}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <p className="product-price">INR</p>
                  <p className="product-price">{product.productPrice}</p>
                  <p className="product-price-">30</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
