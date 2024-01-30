import React from "react";
import { Link } from "react-router-dom";

function SingleItem({ galleria: galleria }) {
  return (
    <div className="galleria-item">
      <p className="galleria-name">{galleria.name}</p>
      <Link to={`/dashboard/${galleria.id}`}>
        <img src={galleria.images.thumbnail} className="galleria-image" />
      </Link>
    </div>
  );
}

export default SingleItem;
