import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import Pagination from "./Pagination";
import * as ReactBootStrap from "react-bootstrap";
import Match from "./Match";

const appId = "45f8d4fc";
const appKey = "98a2d757a26c5e43803f059987a05b50";
export const Recipes = () => {
  const [recipes, setrecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [mealType, setmealType] = useState("Breakfast");
  const [isLoading, setLoading] = useState(true);
  const [foodMatch, setFoodMatch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const urlSearch = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&mealType=${mealType}`;
  const Url =
    "https://api.edamam.com/search?app_id=45f8d4fc&app_key=98a2d757a26c5e43803f059987a05b50&q=chicken&mealType=Breakfast";
  const getRecipe = (URL) => {
    try {
      fetch(URL)
        .then((res) => res.json())
        .then((result) => {
          setrecipes(result.hits);
          console.log(result.hits);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSearch = (e) => {
    let matches = [];
    if (e.length > 0 && query !== "") {
      matches = recipes.filter((rec) => {
        const regex = new RegExp(`${e}`, "gi");
        return rec.recipe.label.match(regex);
      });
    }
    console.log("matches", matches);
    setFoodMatch(matches);

    setQuery(e);
  };

  const OnSubmit = (e) => {
    e.preventDefault();

    if (query) {
      getRecipe(urlSearch);
      setQuery("");
    }
  };
  const onSuggestHandler = (e) => {
    setQuery(e);
    setFoodMatch([]);
  };
  useEffect(() => {
    getRecipe(Url);
  }, []);

  const indexOfLastPage = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPage - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <header>
        <h1 className="title">Food Recipe 🍕 </h1>
        <form className="searchform" onSubmit={OnSubmit}>
          <input
            className="appinput"
            type="text"
            placeholder="Enter Ingridient"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setFoodMatch([]);
              }, 100);
            }}
          />
          <input className="submitinput" type="submit" value="Search" />
          <select className="options">
            <option onClick={() => setmealType("Breakfast")}>Breakfast</option>
            <option onClick={() => setmealType("Lunch")}>Lunch</option>
            <option onClick={() => setmealType("Dinner")}>Dinner</option>
          </select>
        </form>
        <div className="cart">
          {foodMatch &&
            foodMatch.map((match) => {
              return (
                <div onClick={() => onSuggestHandler(match.recipe.label)}>
                  <Match {...match} />
                </div>
              );
            })}
        </div>

        {isLoading && (
          <div className="spinner">
            <ReactBootStrap.Spinner animation="border" variant="info" />
          </div>
        )}
      </header>

      <div className="recipes-container">
        {currentPosts.length > 0 &&
          currentPosts.map((recipe) => {
            return <Recipe {...recipe} />;
          })}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={recipes.length}
        paginate={paginate}
      />
    </>
  );
};
