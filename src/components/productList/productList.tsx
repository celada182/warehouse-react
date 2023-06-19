import React, {Component} from 'react';
import {Product, ProductComponent} from "@/components/product/product";

type ProductListProps = {
  products: Product[],
  onBuy: () => void
}

export class ProductListComponent extends Component<ProductListProps, any> {
  render() {
    return (
        <div>
          {this.props.products.map(product => (
              <ProductComponent key={product.name} product={product}
                                onBuy={this.props.onBuy}></ProductComponent>
          ))}
        </div>
    );
  }
}
