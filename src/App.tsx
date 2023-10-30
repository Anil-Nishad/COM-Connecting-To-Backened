import React, { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";
//select.form-select
const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  //after Render
  useEffect(() => {
    //Side Effect
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "My App";
  });
  const [category, setCategory] = useState("");

  return (
    <div>
      {/* <input ref={ref} type="text" className="form-control" /> */}\
      <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Category">Category</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} />
    </div>
  );
};

export default App;
