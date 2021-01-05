import React, { Component } from 'react';
import './style.css'; 
import OrderItem from '../OrderItem';
import { actions as userActions, getOrders, getCurrentTab, getDeletingOrderId, getCommentingOrderId, getCurrentOrderComment, getCurrentOrderStars } from '../../../../redux/modules/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Confirm from '../../../../components/Confirm';


const tabTitles = ['All Orders', 'To Be Paid', 'Paid', 'Refund']

class UserMain extends Component {

  render() {
    const {currentTab, orders, deletingOrderId }= this.props;
    return (
      <div className='userMain'>
        <div className='userMain__menu'>
          {
            tabTitles.map((tabTitle, index) => {
              return (
                <div className='userMain__tab' key={index} onClick={this.handleSetCurrentTab.bind(this, index)}>
                  <span className={currentTab === index ? 'userMain__title userMain__title--active' : 'userMain__title'}>{tabTitle}</span>
                </div>
              )
            })
          }
        </div>
        <div className='userMain__content'>
          {orders && orders.length > 0 ? this.renderOrderList(orders) : this.renderEmpty()}
        </div>
        { deletingOrderId ? this.renderConfirmDialog() : null }    
      </div>
    );
  }
  
  componentDidMount() {
    this.props.userActions.loadOrders();
  }

  renderOrderList = orders => {
    const { commentingOrderId, orderComment, orderStars } = this.props;
    return orders.map(item => {
      return (
        <OrderItem 
          key={item.id} 
          order={item} 
          onRemove={this.handleRemove.bind(this, item.id)}
          isCommenting={item.id === commentingOrderId}
          comment = {item.id === commentingOrderId ? orderComment : ''}
          stars = {item.id === commentingOrderId ? orderStars : 0}
          onComment={this.handleComment.bind(this, item.id)}
          onCommentChange={this.handleCommentChange}
          onStarsChange={this.handleStarsChange}
          onSubmitComment={this.handleSubmitComment}
          onCancelComment={this.handleCancelComment}
        />
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className='userMain__empty'>
        <div className='userMain__emptyIcon'/>
        <div className='userMain__emptyText1'>No orders</div>
        <div className='userMain__emptyText2'>Would you like to buy something?</div>
      </div>
    )
  }

  handleSetCurrentTab = (index) => {
    this.props.userActions.setCurrentTab(index);
  }

  handleRemove = (orderId) => {
    this.props.userActions.showDeleteDialog(orderId);
  }

  renderConfirmDialog = () => {
    const {userActions: {hideDeleteDialog, removeOrder}} = this.props;
    return (
      <Confirm
        content='Are you sure you want to delete the order?'
        cancelText='Cancel'
        confirmText='Confirm'
        onCancel={hideDeleteDialog}
        onConfirm={removeOrder}
      />
    )
  }

  handleComment = orderId => {
    const {userActions: {showCommentArea}} = this.props;
    showCommentArea(orderId);
  }

  handleCommentChange = comment => {
    const {userActions: {setComment}} = this.props;
    setComment(comment);
  }

  handleStarsChange = stars => {
    const {userActions: {setStars}} = this.props;
    setStars(stars);
  }

  handleSubmitComment = () => {
    const {userActions: {submitComment}} = this.props;
    submitComment();
  }

  handleCancelComment = () => {
    const {userActions: {hideCommentArea}} = this.props;
    hideCommentArea();
  }

}

const mapStateToProps = (state, props) => {
  return {
    orders: getOrders(state),
    currentTab: getCurrentTab(state),
    deletingOrderId: getDeletingOrderId(state),
    commentingOrderId: getCommentingOrderId(state),
    orderComment: getCurrentOrderComment(state),
    orderStars: getCurrentOrderStars(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);