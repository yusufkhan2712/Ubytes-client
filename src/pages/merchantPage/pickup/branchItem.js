const BranchItem = ({ branch, merchant }) => {
  return (
    <div className="branch-item-container">
      <div
        className="branch-item-image"
        style={{ backgroundImage: `url(${branch.brandBanner})` }}
      />

      <div className="branch-item-infos">
        <div className="branch-item-name">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {merchant}
            <h6 style={{ marginBottom: "0px", marginTop: "5px" }}>
              {branch.branchName}
            </h6>
          </div>
          <small>{branch.address}</small>
        </div>
        <div className="branch-item-waiting">
          <div>15-25</div>
          <small>min</small>
        </div>
      </div>
    </div>
  );
};

export default BranchItem;
