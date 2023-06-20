import React, {Component} from 'react';
import {Product, ProductComponent} from "@/components/product/product";

type ProductListProps = {
  onImport: () => void
}

type ProductListState = {
  products: Product[],
  loading: boolean
}

export class ProductListComponent extends Component<ProductListProps, ProductListState> {

  state: ProductListState = {
    products: [],
    loading: false
  }

  getProducts() {
    fetch('http://localhost:8080/product')
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
          <p style={{visibility: this.state.loading ? 'visible' : 'hidden'}}>Loading...</p>
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
