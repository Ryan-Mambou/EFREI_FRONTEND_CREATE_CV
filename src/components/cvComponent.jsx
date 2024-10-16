import React from "react";

function CVComponent({ firstname, lastname, description, id }) {
  return (
    <div className="cv-item">
      <h2>{`${firstname} ${lastname}`}</h2>
      <p>{description}</p>
      <a href={`/resume/${id}`} target="_blank" rel="noopener noreferrer">
        Download PDF
      </a>
    </div>
  );
}

export default CVComponent;
