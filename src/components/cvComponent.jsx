import React, { useState } from "react";
import Recommendation from "./recommendation";

function CVComponent({
  firstname,
  lastname,
  description,
  id,
  recommendations,
}) {
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (event) => {
    setRecommendation(event.target.value);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    outline: "none",
    marginTop: "1rem",
  };

  return (
    <>
      <div className="cv-item">
        <h2>{`${firstname} ${lastname}`}</h2>
        <p>{description}</p>
        <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer">
          View details in PDF
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Enter a recommendation"
            value={recommendation}
            onChange={handleChange}
          />
          <button>Submit</button>
        </div>
      </div>
      {/* {recommendations.length > 0 ? (
        <div>
          <h2>Recommendations</h2>
          {recommendations?.map((recommendation) => (
            <Recommendation
              firstname={recommendation.firstname}
              lastname={recommendation.lastname}
              text={recommendation.text}
            />
          ))}
        </div>
      ) : null} */}
    </>
  );
}

export default CVComponent;
