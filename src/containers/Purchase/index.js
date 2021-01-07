import React, { Component } from 'react';
import Header from '../../components/Header';
import PurchaseForm from './components/PurchaseForm';
import Tip from '../../components/Tip';

class Purchase extends Component {
  render() {
    return (
      <div>
        <Header title='Order' onBack={this.handleBack} />
        <PurchaseForm />
        <Tip message='Successfully ordered' onClose={this.handleCloseTip}/>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  handleCloseTip = () => {
    
  }
}

export default Purchase;