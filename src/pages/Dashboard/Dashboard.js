import "./Dashboard.css";

// import components
import { Galleria } from "../../components";

function Dashboard({ filteredData }) {
  return (
    <div className="container">
      <Galleria filteredData={filteredData} />
    </div>
  );
}

export default Dashboard;
