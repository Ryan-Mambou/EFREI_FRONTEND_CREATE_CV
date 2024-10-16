import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import httpService from "../services/httpService";
import CVComponent from "../components/cvComponent";
import { IoMapSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

function Timeline() {
  const [cvs, setCvs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCvs, setFilteredCvs] = useState([]);

  const headingStyle = {
    display: "flex",
    alignItems: "center",
    width: "50%",
    gap: "0.5rem",
    margin: "1rem auto",
    textAlign: "center",
    justifyContent: "center",
  };

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
      <h1 style={headingStyle}>
        Timeline <IoMapSharp />
      </h1>
      <div style={{ position: "relative", width: "50%", margin: "1rem auto" }}>
        <input
          className="search"
          placeholder="Search a CV"
          type="text"
          name="search"
          value={search}
          onChange={handleSearchChange}
          style={{ width: "100%", paddingLeft: "2.5rem" }}
        />
        <FaSearch
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "grey",
            zIndex: 99,
          }}
        />
      </div>
      {cvs.length > 0 ? (
        <div>
          {filteredCvs.map((cv) => (
            <CVComponent
              lastname={cv.lastname}
              firstname={cv.firstname}
              description={cv.description}
              recommendations={cv?.recommendations}
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
