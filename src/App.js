import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { Routes, Route } from "react-router-dom";
import AllCountries from "./my_component/AllCountries/AllCountries";
import CountryInfo from "./my_component/Info/InfoCountry";

function App() {
  return (
    <>
      <div className="header">
        <div className="container-test ">
          <h5 >Countries Of The World</h5>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
