"use client";

import React, {ChangeEvent, useEffect, useState} from "react";
import {ProductListComponent} from "@/components/productList/productList";

export default function Home() {
  const [inventoryFile] = useState("");
  const [productFile] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => getProducts, []);

  const getProducts = () => {
    fetch('http://localhost:8080/product')
    .then(res => res.json())
    .then(data => setProducts(data));
  };

  const handleInventoryInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (!e.target) return;
        const data = JSON.parse(e.target.result as string);
        postFile('inventory', data);
      };
    }
  };

  const handleProductInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (!e.target) return;
        const data = JSON.parse(e.target.result as string);
        postFile('product', data);
      };
    }
  };

  const postFile = (endpoint: string, data: object) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('http://localhost:8080/' + endpoint, requestOptions)
    .then(getProducts);
  };

  return (
      <main>
        <div>
          <h1>Warehouse</h1>
          <div>
            <label>Import Inventory JSON</label>
            <input type="file" value={inventoryFile} onChange={handleInventoryInput}/>
            <label>Import Product JSON</label>
            <input type="file" value={productFile} onChange={handleProductInput}/>
          </div>
        </div>

        <div>
          <ProductListComponent products={products} onBuy={getProducts}></ProductListComponent>
        </div>
      </main>
  )
}
