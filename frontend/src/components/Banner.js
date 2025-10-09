import React from "react";
import govUkLogo from "../assets/images/gov_uk_logo.PNG"; 

function Banner() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1D70B8",
        display: "flex",
        justifyContent: "right",
        padding: "8px 0"
      }}
    >
      <img
        src={govUkLogo}
        alt="Government logo banner"
      />
    </div>
  );
}

export default Banner;