import React, {Component} from 'react';

export type Product = {
  name: string,
  stock: number
}

type ProductProps = {
  product: Product,
  onBuy: () => void
}

type ProductState = {
  amount: number
}

export class ProductComponent extends Component<ProductProps, ProductState> {

  state: ProductState = {
    amount: 0
  }

  handleBuyProduct (product: Product, amount: number) {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };
    fetch(`http://localhost:8080/product?name=${product.name}&amount=${amount}`, requestOptions)
    .then(this.props.onBuy);
  }

  render() {
    return (
        <div>
          <p>{this.props.product.name}</p>
          <p>{this.props.product.stock}</p>
          <input type="number" value={this.state.amount} onChange={event => this.setState({amount: +event.target.value})}/>
          <button onClick={()=> this.handleBuyProduct(this.props.product, this.state.amount)}>BUY</button>
        </div>
    );
  }
}
