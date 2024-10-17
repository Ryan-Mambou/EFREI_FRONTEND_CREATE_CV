import React from "react";

function Recommendation({ firstname, lastname, text }) {
  const profileStyle = {
    backgroundColor: "gray",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
  };

  const textStyle = {
    borderRadius: "5px",
    padding: "0.5rem",
    backgroundColor: "gray",
    alingItems: "flex-start",
  };

  return (
    <div className="recommendation">
      <div style={profileStyle}></div>
      <div style={textStyle}>
        <h4>{`${firstname} ${lastname}`}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Recommendation;
