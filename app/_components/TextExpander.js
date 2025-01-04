"use client";
import React, { useState } from "react";

// function TextExpander({ children, NumberOfWords = 40 }) {
//   console.log(children);

//   const [isExpanded, setIsExpanded] = useState(false);
//   const displayText = isExpanded
//     ? children
//     : children.split(" ").slice(0, NumberOfWords).join(" ") + "...";

//   return (
//     <span>
//       {displayText}{" "}
//       <button
//         className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         {isExpanded ? "Show less" : "Show more"}
//       </button>
//     </span>
//   );
// }

// export default TextExpander;

function TextExpander({ children, NumberOfWords }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert React children (nodes) to plain text
  const plainText = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : child.props.children))
    .flat()
    .join(" ");

  // Determine what text to display based on `isExpanded`
  const displayText = isExpanded
    ? React.Children.toArray(children) // Render all children when expanded
    : plainText.split(" ").slice(0, NumberOfWords).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
