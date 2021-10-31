import React from "react";

const Recipe = ({ recipe }) => {
  const getUrl = () => {
    window.open(recipe.url);
  };
  return (
    recipe.image.match(/\.(jpeg|jpg|gif|png)$/) != null && (
      <div className="recipecart">
        <img
          className="recipeimage"
          onClick={getUrl}
          src={recipe.image}
          alt={recipe.label}
        />
        <p className="recipename">{recipe.label}</p>
        <button className="submitbutton" onClick={getUrl}>
          More Information
        </button>
      </div>
    )
  );
};
export default Recipe;
