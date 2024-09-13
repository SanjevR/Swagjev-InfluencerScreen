import PlaceholderContainer from "./placeHolderContainer";
import React from "react";


export default function RecordsContainer({ title, children }) {
  return (
    <article className="recordContainer">
      <h3>{title}</h3>
      <div>
        {React.Children.count(children) > 0 ? (
          children
        ) : (
          <PlaceholderContainer />
          
        )}
      </div>
    </article>
  );
}

