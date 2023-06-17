import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";

import SearchInput from "../Search/SearchCountries";
//import FilterCountry from "../FilterCountry/FilterCountry";

import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      console.log(data);

      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);

      if (!res.ok) throw new Error("Not found any country!");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);

      if (!res.ok) throw new Error("Failed..........");

      const data = await res.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="all__country__wrapper">
      <div className="country__top">
        <div className="search ">
          <SearchInput onSearch={getCountryByName} />
        </div>
        

        {/* <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div> */}
      </div>
      <div className="mb-3">
        <div class="dropdown">
    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
      Sort By
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">ASC</a></li>
      <li><a class="dropdown-item" href="#">DESC</a></li>
      
    </ul>
  </div>
        </div>


      <div className="country__bottom">
        {isLoading && !error && <h4>Loading........</h4>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="country__card">
              <div className="country__img">
                <img src={country.flags.png} alt="" />
              </div>

              <div className="country__data">
                <h3>{country.name.common}</h3>
                <h6> ({country.cca2} ), ({country.cca3}) </h6>
                <h6>{country.altSpellings[1]}</h6>
               <h6>IDD:{country.idd.root}{country.idd.suffixes}</h6>
                
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className=" d-flex justify-content-center my-4">
        <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
      </div>
      
    </div>
  );
};

export default AllCountries;
