import React, { Component } from 'react';
import Header from '../../components/Header';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from './components/BuyButton';

class ProductDetail extends Component {
  render() {
    return (
      <div>
        <Header title='Group-Buying Detail' onBack={this.handleBack} grey />
        <ProductOverview />
        <ShopInfo />
        <Detail />
        <Remark />
        <BuyButton />
      </div>
    );
  }

  handleBack = () => {
    
  }
}

export default ProductDetail;