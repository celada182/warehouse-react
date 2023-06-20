"use client";

import React, {useEffect, useState} from "react";
import {ProductListComponent} from "@/components/productList/productList";
import {ImportComponent} from "@/components/import/import";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => getProducts, []);

  const getProducts = () => {
    fetch('http://localhost:8080/product')
    .then(res => res.json())
    .then(data => setProducts(data));
  };

  return (
      <main>
        <h1>Warehouse</h1>
        <ImportComponent onImport={getProducts}/>
        <ProductListComponent products={products} onBuy={getProducts}/>
      </main>
  )
}
