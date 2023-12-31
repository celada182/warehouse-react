import React, {Component} from 'react';
import {Product, ProductComponent} from "@/components/product/product";

type ProductListProps = {}

type ProductListState = {
  products: Product[],
  loading: boolean,
  apiBasePath: string
}

export class ProductListComponent extends Component<ProductListProps, ProductListState> {

  state: ProductListState = {
    products: [],
    loading: false,
    // TODO Environment configuration
    apiBasePath: "http://localhost:8080"
  }

  getProducts() {
    fetch(this.state.apiBasePath + '/product')
    .then(res => res.json())
    .then(data => this.setState({products: data}))
    .then(() => this.setState({loading: false}));
  };

  componentDidMount() {
    this.getProducts = this.getProducts.bind(this);
    this.onLoading = this.onLoading.bind(this);
    this.onLoading();
    this.getProducts();
  }

  onLoading() {
    this.setState({loading: true});
  }

  render() {
    return (
        <div>
          <div className={"row"}>
            <div className={"col"}>Products</div>
            <div className={"col"}>Available</div>
            <div className={"col"}></div>
            <div className={"col"}></div>
          </div>
          <div className={"row"}>
            <p style={{visibility: this.state.loading ? 'visible' : 'hidden'}}>Loading...</p>
          </div>
          <div style={{visibility: this.state.loading ? 'hidden' : 'visible'}}>
            {this.state.products.map(product => (
                <ProductComponent
                    key={product.name}
                    product={product}
                    onLoading={this.onLoading}
                    onBuy={this.getProducts}>
                </ProductComponent>
            ))}
          </div>
        </div>
    );
  }
}
