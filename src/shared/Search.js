import React from "react";
import _ from "lodash";

const Search = () => {
  const onChange = (e) => {
    debounce(e);
  };

  const debounce = _.debounce((e) => {
    console.log("debounce :::", e.target.value);
  }, 1000);

  const throttle = _.throttle((e) => {
    console.log("throttle :::", e.target.value);
  },1000)
  return (
    <div>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
