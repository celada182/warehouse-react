"use client";

import {useState} from "react";

export default function Home() {
  const [inventoryFile] = useState("");
  const [productFile] = useState("");

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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div
            className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1>Warehouse</h1>
          <div
              className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <label>Import Inventory JSON</label>
            <input type="file" value={inventoryFile} onChange={handleInventoryInput}/>
            <label>Import Product JSON</label>
            <input type="file" value={productFile} onChange={handleProductInput}/>
          </div>
        </div>

        <div
            className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <h2>Products</h2>
        </div>
      </main>
  )
}
