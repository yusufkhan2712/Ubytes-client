
const Note = ({setSpecialInstructions}) => {
  return (
    <div className="checkout-myBucket-wrapper">
      <div className="checkout-myBucket-inner">
        <div className="note-header">Leave a note.</div>
        <div className="note-body">
          <textarea
            style={{ width: "100%", outline: "none", color: "black" }}
            name="note"
            onChange={setSpecialInstructions}
            placeholder={"Add a note or any instruction.If you have any food allergies, please contact the restaurant directly."}
            id="chkout-note-body"
          />
        </div>
      </div>
    </div>
  );
}

export default Note;
