import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetchData from "../../customHooks/useFetchData";
import "./GalleriaDetail.css";

// import icons
import { nextIcon, backIcon } from "../../icons";

const API = "http://localhost:8001/galleria";

function GalleriaDetail() {
  const navigate = useNavigate();
  const params = useParams();

  const { data: galleriaData, loading } = useFetchData(
    `${API}/${params.galeriaId}`
  );

  useEffect(() => {
    if (galleriaData && params.galeriaId == 0) {
      navigate("/dashboard");
    }
    if (params.galeriaId >= 15) {
      navigate("/dashboard/15");
    }
  }, [galleriaData, navigate]);

  if (loading) {
    return <h1 className="loading-title">Loading...</h1>;
  }

  return (
    <div className="galleria-detail-container">
      <div className="image-container">
        <div className="title-container">
          <h3>{galleriaData.name}</h3>
          <p>{galleriaData.artist.name}</p>
        </div>
        <div className="description">
          <p>{galleriaData.description}</p>
          <a
            href={galleriaData.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>GO TO SOURCE</button>
          </a>
        </div>
        <div className="wrapper">
          <div className="footer">
            <div>
              <h3>{galleriaData.name}</h3>
              <p>{galleriaData.artist.name}</p>
            </div>
            <div className="icon-container">
              <Link to={`/dashboard/${galleriaData.id - 1}`}>
                <img src={backIcon} alt="backIcon" />
              </Link>
              <Link to={`/dashboard/${galleriaData.id + 1}`}>
                <img src={nextIcon} alt="nextIcon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleriaDetail;
