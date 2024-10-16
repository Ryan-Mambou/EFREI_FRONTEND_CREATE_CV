import React, { useEffect, useState } from "react";
import httpService from "../services/httpService";
import { useParams } from "react-router-dom";

function CVPdf() {
  const [pdfUrl, setPdfUrl] = useState("");
  const { cvId } = useParams();

  console.log(cvId);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await httpService.get(`/cv/${cvId}/`, {
          responseType: "blob",
        });

        const url = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setPdfUrl(url);
      } catch (err) {
        console.error("Error fetching CV PDF", err);
      }
    };

    fetchPdf();
  }, [cvId]);

  return (
    <div>
      <h1>CV PDF</h1>
      {pdfUrl ? (
        <iframe src={pdfUrl} width="100%" height="600px"></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CVPdf;
