import React from "react";

const Match = ({ recipe }) => {
  return (
    <div className="matchCart">
      <p className="MatchName">{recipe.label}</p>
    </div>
  );
};
export default Match;
