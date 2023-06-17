import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryInfo = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  const borders = country.map((country) => country.borders);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`${apiURL}/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="country__info__wrapper">
      <button className="mb-3">
        <Link to="/">Back</Link>
      </button>

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country__info__container" key={index}>
          <div className="country__info-img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country__info">
            <h3>{country.name.common}</h3>

            <div className="country__info-left">
              <h2>{country.name.common}</h2>
                <h6> ({country.cca2} ), ({country.cca3}) </h6>
                <h6>{country.altSpellings[1]}</h6>
               <h6>IDD:{country.idd.root}{country.idd.suffixes}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
