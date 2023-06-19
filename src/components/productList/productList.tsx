import React, {Component} from 'react';
import {Product, ProductComponent} from "@/components/product/product";

type ProductListProps = {
  products: [Product]
}

export class ProductListComponent extends Component<ProductListProps, any> {
  render() {
    return (
        <div>
          {this.props.products.map(product => (<ProductComponent product={product}></ProductComponent>))}
        </div>
    );
  }
}
