import React, {Component} from 'react';

export type Product = {
  name: string,
  stock: number
}

type ProductProps = {
  product: Product,
  key: string,
  children: never[],
  onBuy: () => void,
  onLoading: () => void
}

type ProductState = {
  amount: number,
  apiBasePath: string
}

export class ProductComponent extends Component<ProductProps, ProductState> {

  state: ProductState = {
    amount: 1,
    // TODO Environment configuration
    apiBasePath: "http://localhost:8080"
  }

  handleBuyProduct(product: Product, amount: number) {
    this.props.onLoading();
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };
    fetch(`${this.state.apiBasePath}/product?name=${product.name}&amount=${amount}`, requestOptions)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        alert(res.error);
      }
      this.props.onBuy();
    })
  }

  render() {
    return (
        <div className={"row p-1"}>
          <div className={"col"}>{this.props.product.name}</div>
          <div className={"col"}>{this.props.product.stock}</div>
          <div className={"col"}>
            <input className={"form-control"}
                type="number"
                min="1"
                value={this.state.amount}
                onChange={event => this.setState({amount: +event.target.value})}
            />
          </div>
          <div className={"col"}>
            <button type="button" className={"btn btn-success btn-sm"} onClick={() => this.handleBuyProduct(this.props.product, this.state.amount)}>
              BUY
            </button>
          </div>
        </div>
    );
  }
}
