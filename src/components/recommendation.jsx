import React from "react";

function Recommendation({ firstname, lastname, text }) {
  const profileStyle = {
    backgroundColor: "gray",
    borderRadius: "50%",
    height: "75px",
    width: "75px",
  };
  return (
    <div className="recommendation">
      <div style={profileStyle}></div>
      <div>
        <h4>{`${firstname} ${lastname}`}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Recommendation;
