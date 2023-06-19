import React, {Component} from 'react';
import {Product} from "@/components/product/product";

type props = {
  products: [Product]
}

export class ProductList extends Component<props, {}> {
  render() {
    return (
        <div>
          {this.props.products.map(product => (<Product product={product}></Product>))}
        </div>
    );
  }
}
