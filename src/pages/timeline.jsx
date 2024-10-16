import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import httpService from "../services/httpService";
import CVComponent from "../components/cvComponent";

function Timeline() {
  const [cvs, setCvs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCvs, setFilteredCvs] = useState([]);

  useEffect(() => {
    // Fetch the user's CVs
    httpService
      .get("/cv") // Your API route to fetch the CVs
      .then((response) => {
        setCvs(response.data);
        setFilteredCvs(response.data);
      })
      .catch((err) => {
        console.error("Error fetching CVs", err.response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const filtered = cvs.filter(
      (cv) =>
        cv.firstname.toLowerCase().includes(search.toLowerCase()) ||
        cv.lastname.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCvs(filtered);
  }, [search]);

  return (
    <div>
      <Nav />
      <h1>Your CV Timeline</h1>
      <input
        className="search"
        type="text"
        name="search"
        value={search}
        onChange={handleSearchChange}
      />
      {cvs.length > 0 ? (
        <div>
          {filteredCvs.map((cv) => (
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
