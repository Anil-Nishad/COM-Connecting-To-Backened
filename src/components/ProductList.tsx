import React, { useEffect, useState } from "react";
// inline interface => {category}:{category:string}

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Feching Products in", category, ".");
    setProducts(["Clothing", "Household"]);
  }, [category]);

  /*
  Tips: second argument = dependency array
  1. When we not provide second argument in useEffect then react excute effect after every render.
  2. When we provide empty second argument the it will excute only once.
  3. it we have Props or state variables in 2nd argument then it will excute every times when these value changes.
  */
  return <div>ProductList</div>;
};

export default ProductList;
