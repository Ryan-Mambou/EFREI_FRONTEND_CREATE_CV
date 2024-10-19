import { useState } from "react";
import Recommendation from "./recommendation";
import ModifyModal from "./modifyModal";
import httpService from "../services/httpService";
import { FaRegPenToSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Tooltip } from "react-tippy";

function CVComponent({
  firstname,
  lastname,
  description,
  company,
  institution,
  startDate,
  endDate,
  visible,
  role,
  degree,
  graduationYear,
  id,
  userId,
  toggleShowModal,
  isOpen,
  updateCV,
}) {
  const [recommendation, setRecommendation] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const fetchRecommendations = () => {
    httpService
      .get(`/recommendation/${id}`)
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

  const topStyle = {
    textAlign: "center",
  };

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { id: decodedUserId } = decodedToken;

  return (
    <>
      <div className="cv-item">
        <div style={topStyle}>
          <h2 style={{ textAlign: "center" }}>{`${firstname} ${lastname}`}</h2>
          {decodedUserId === userId && (
            <Tooltip title="Modify cv">
              <FaRegPenToSquare
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
                onClick={() => toggleShowModal(id)}
              />
            </Tooltip>
          )}
        </div>
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
      <ModifyModal
        isOpen={isOpen}
        firstname={firstname}
        lastname={lastname}
        description={description}
        degree={degree}
        graduationYear={graduationYear}
        company={company}
        institution={institution}
        startDate={startDate}
        endDate={endDate}
        role={role}
        visible={visible}
        closeModal={toggleShowModal}
        cvId={id}
        onSave={updateCV}
      />
    </>
  );
}

export default CVComponent;
