import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <ReactLoading
        type="spin"
        color="black"
        height={"200px"}
        width={"200px"}
      />
      <p>Loading...</p>
    </div>
  );
}
