// @ts-nocheck
"use client";

import React, {useRef} from "react";
import {ProductListComponent} from "@/components/productList/productList";
import {ImportComponent} from "@/components/import/import";

export default function Home() {
  const productListRef = useRef();
  const onImport = () => {
    if (productListRef.current) {
      productListRef.current.onLoading();
      productListRef.current.getProducts();
    }
  }

  return (
      <main>
        <h1>Warehouse</h1>
        <ImportComponent onImport={onImport}/>
        <ProductListComponent ref={productListRef}/>
      </main>
  )
}
