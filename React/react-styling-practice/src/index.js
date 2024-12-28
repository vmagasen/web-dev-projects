//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

const date = new Date();
const currentHour = date.getHours();

let text;

const inlineStyle = {
  color: ""
};

if (currentHour < 12) {
  text = "Good Morning";
  inlineStyle.color = "red";
} else if (currentHour <= 12 && currentHour >= 18) {
  text = "Good Afternoon";
  inlineStyle.color = "green";
} else {
  text = "Good Evening";
  inlineStyle.color = "blue";
}

ReactDOM.render(
  <h1 className="heading" style={inlineStyle}>
    {text}
  </h1>,
  document.getElementById("root")
);
