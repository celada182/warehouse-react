import React, {Component} from 'react';

type product = {
  name: string,
  stock: number
}

type props = {
  product: product
}

export class Product extends Component<props, {}> {
  render() {
    return (
        <div>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.stock}</p>
        </div>
    );
  }
}
