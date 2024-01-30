import "./Galleria.css";

// import components
import { SingleItem } from "../../components";

function Galleria({ filteredData }) {
  if (filteredData.length === 0) {
    return <h1 className="zero-title">Whoops... 0 results found</h1>;
  }

  return (
    <div className="galleria-container">
      {filteredData.map((galleria) => {
        return <SingleItem key={galleria.id} galleria={galleria} />;
      })}
    </div>
  );
}

export default Galleria;
