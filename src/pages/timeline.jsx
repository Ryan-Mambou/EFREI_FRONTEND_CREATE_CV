import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import httpService from "../services/httpService";
import CVComponent from "../components/cvComponent";

function Timeline() {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    // Fetch the user's CVs
    httpService
      .get("/cv") // Your API route to fetch the CVs
      .then((response) => {
        setCvs(response.data);
      })
      .catch((err) => {
        console.error("Error fetching CVs", err.response.data);
      });
  }, []);

  return (
    <div>
      <Nav />
      <h1>Your CV Timeline</h1>
      {cvs.length > 0 ? (
        <div>
          {cvs.map((cv) => (
            <CVComponent
              lastname={cv.lastname}
              firstname={cv.firstname}
              description={cv.description}
              id={cv._id}
              key={cv._id}
            />
          ))}
        </div>
      ) : (
        <p>No CVs available. Create your first one!</p>
      )}
    </div>
  );
}

export default Timeline;
