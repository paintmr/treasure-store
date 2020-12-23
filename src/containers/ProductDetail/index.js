import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import PurchaseInformation from './components/PurchaseInformation';
import BuyButton from './components/BuyButton';
import { actions as detailActions, getProduct, getRelatedShop } from '../../redux/modules/detail';

class ProductDetail extends Component {
  render() {
    const { product, relatedShop } = this.props;
    return (
      <div>
        <Header title='Group-Buying Detail' onBack={this.handleBack} grey />
        {product && <ProductOverview product={product} />}
        {relatedShop && (
          <ShopInfo relatedShop={relatedShop} total={product.shopIds.length} />
        )}
        {product && (
          <div>
            <Detail product={product} />
            <PurchaseInformation product={product} />
            <BuyButton productId={product.id} />
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { product } = this.props;
    if (!product) {
      const productId = this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    } else if (!this.props.relatedShop) {
      this.props.detailActions.loadShopById(product.nearestShop);
    }
  }

  componentDidUpdate(preProps) {
    //第一次获取到产品详情时，需要继续获取相关的店铺信息
    if (!preProps.product && this.props.product) {
      this.props.detailActions.loadShopById(this.props.product.nearestShop);
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    product: getProduct(state, productId),
    relatedShop: getRelatedShop(state, productId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);