import React from "react";
import Backdrop from "./backdrop";

function DeleteModal({ isOpen, cvId, deleteCV }) {
  const annulerStyle = {
    background: "white",
    color: "red",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    outline: "none",
    textTransform: "uppercase",
  };

  const supprimerStyle = {
    background: "red",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    outline: "none",
    textTransform: "uppercase",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: "white",
    width: "50%",
    margin: "1rem auto",
  };
  if (!isOpen) return null;
  return (
    <Backdrop>
      <div style={containerStyle}>
        <p>Etes vous sur de vouloir supprimer ce CV ?</p>
        <div>
          <button style={annulerStyle}>Annuler</button>
          <button style={supprimerStyle}>Supprimer</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default DeleteModal;
