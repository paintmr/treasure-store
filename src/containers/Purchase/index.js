import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import PurchaseForm from './components/PurchaseForm';
import Tip from '../../components/Tip';
import { actions as purchaseActions, getProduct, getQuantity, getTipStatus, getTotalPrice } from '../../redux/modules/purchase';
import { getUsername } from '../../redux/modules/login';
import { actions as detailActions } from '../../redux/modules/detail';

class Purchase extends Component {
    render() {
        const { product, mobileNumber, quantity, showTip, totalPrice } = this.props;
        return ( 
         <div>
            <Header title = 'Order'
            onBack = { this.handleBack }
            /> {
            product ? 
            (<PurchaseForm product = { product }
                mobileNumber = { mobileNumber }
                quantity = { quantity }
                onSetQuantity = { this.handleSetQuantity }
                onSubmit = { this.handleSubmit }
                totalPrice = { totalPrice }
                />
            ) : null
        } {
            showTip ? < Tip message = 'Successfully ordered'
            onClose = { this.handleCloseTip }
            /> : null}  
        </div>
        );
    }

    componentDidMount() {
        const { product } = this.props;
        if (!product) {
            const productId = this.props.match.params.id;
            this.props.detailActions.loadProductDetail(productId);
        }
    }

    componentWillUnmount() {
        this.props.purchaseActions.setOrderQuantity(1);
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    handleCloseTip = () => {
        this.props.purchaseActions.closeTip();
    }

    handleSetQuantity = (quantity) => {
        this.props.purchaseActions.setOrderQuantity(quantity)
    }

    handleSubmit = () => {
        const productId = this.props.match.params.id;
        this.props.purchaseActions.submitOrder(productId);
    }
}

const mapStateToProps = (state, props) => {
    const productId = props.match.params.id;
    return {
        product: getProduct(state, productId),
        quantity: getQuantity(state),
        showTip: getTipStatus(state),
        mobileNumber: getUsername(state),
        totalPrice: getTotalPrice(state, productId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        purchaseActions: bindActionCreators(purchaseActions, dispatch),
        detailActions: bindActionCreators(detailActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);