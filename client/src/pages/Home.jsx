import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch"
import '../styles/home.scss'

const Home = () => {
  const [query, setQuery] = useState("");
    const {data, loading} = useFetch(`/restaurants`)

    const keys = ["name", "location"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key] && item[key].toLowerCase().includes(query))
      );
    };
    

  return (
    <div className='home'>
      <Navbar />
      <div className="search">
          <div className="searchBar">
              <h2>Explore Restaurant</h2>
              <div className="searchInput">
                  <input
                    type="text"
                    placeholder="Search here for menu or items"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              </div>
          </div>
      </div>

      <div className="searchedPosts">
        {loading ? (
          <>
            <div className="p" style={{color: "white", "fontFamily": "'Kaushan Script', cursive"}}>Loading...</div>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </div>
  )
}

export default Home