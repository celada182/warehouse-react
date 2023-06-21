// @ts-nocheck
"use client";

import React, {useRef} from "react";
import {ProductListComponent} from "@/components/productList/productList";
import {ImportComponent} from "@/components/import/import";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const productListRef = useRef();
  const onImport = () => {
    if (productListRef.current) {
      productListRef.current.onLoading();
      productListRef.current.getProducts();
    }
  }

  return (
      <main className={"container text-center"}>
        <ImportComponent onImport={onImport}/>
        <ProductListComponent ref={productListRef}/>
      </main>
  )
}
