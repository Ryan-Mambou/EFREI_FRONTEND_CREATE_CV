import { useState } from "react";
import Recommendation from "./recommendation";
import httpService from "../services/httpService";
import { toast } from "react-toastify";

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
        toggleSetRecommendations();
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error fetching recommendations", err.response.data);
      });
  };

  const toggleSetRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  const handleChange = (event) => {
    setRecommendation(event.target.value);
  };

  const addRecommendation = async () => {
    const data = {
      cvId: id,
      text: recommendation,
    };
    try {
      await httpService.post(`/recommendation`, data);
      setRecommendation("");
      toast.success("Recommendation added successfully!");
    } catch (error) {
      console.error("Error adding recommendation", error.response.data);
    }
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
          <button onClick={addRecommendation}>Submit</button>
        </div>

        {showRecommendations ? (
          <button onClick={fetchRecommendations} style={{ marginTop: "1rem" }}>
            Cacher le recommandation
          </button>
        ) : (
          <button
            onClick={toggleSetRecommendations}
            style={{ marginTop: "1rem" }}
          >
            Voir les recommandation
          </button>
        )}
        {showRecommendations && recommendations.length > 0 && (
          <div>
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
      </div>
    </>
  );
}

export default CVComponent;
