import { useState } from "react";
import httpService from "../services/httpService"; // Assurez-vous que ce service fait correctement les appels API
import Recommendation from "./recommendation";

function CVComponent({ firstname, lastname, description, id }) {
  const [recommendations, setRecommendations] = useState([]); // Stocker les recommandations
  const [recommendation, setRecommendation] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false); // Pour gérer l'affichage des recommandations

  // Fonction pour récupérer les recommandations depuis l'API
  const fetchRecommendations = () => {
    httpService
      .get(`/recommendation/${id}`) // Appel à l'API pour récupérer les recommandations du CV
      .then((response) => {
        setRecommendations(response.data);
        setShowRecommendations(true); // Afficher les recommandations après récupération
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error fetching recommendations", err.response.data);
      });
  };

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

        <button onClick={fetchRecommendations} style={{ marginTop: "1rem" }}>
          Voir les recommandations
        </button>
      </div>

      {showRecommendations && recommendations.length > 0 && (
        <div>
          <h2>Recommandations</h2>
          {recommendations.map((rec) => (
            <Recommendation
              key={rec._id}
              firstname={rec.userId.firstname}
              lastname={rec.userId.lastname}
              text={rec.text}
            />
          ))}
        </div>
      )}

      {showRecommendations && recommendations.length === 0 && (
        <p>Aucune recommandation trouvée pour ce CV.</p>
      )}
    </>
  );
}

export default CVComponent;
