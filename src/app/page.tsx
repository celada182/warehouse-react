"use client";

import {useState} from "react";
import {ProductListComponent} from "@/components/productList/productList";

export default function Home() {
  const [inventoryFile] = useState("");
  const [productFile] = useState("");
  const [products, setProducts] = useState([]);

  fetch('http://localhost:8080/product')
  .then(res => res.json())
  .then(data => {
    setProducts(data);
  });

  const handleInventoryInput = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const data = JSON.parse(e.target?.result);
      postFile('inventory', data);
    };
  };

  const handleProductInput = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const data = JSON.parse(e.target?.result);
      postFile('product', data);
    };
  };

  const postFile = (endpoint, data) => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(data)
    };
    fetch('http://localhost:8080/' + endpoint, requestOptions)
    .then(res => console.log(res));
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
          <ProductListComponent products={products}></ProductListComponent>
        </div>
      </main>
  )
}
