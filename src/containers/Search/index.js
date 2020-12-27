import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBox from './components/SearchBox';
import PopularSearchKeywords from './components/PopularSearchKeywords';
import SearchHistory from './components/SearchHistory';
import { actions as searchActions, getPopularKeywords, getInputText, getRelatedKeywords, getHistoryKeywords } from '../../redux/modules/search';

class Search extends Component {

  render() {
    const { inputText, relatedKeywords, popularKeywords, historyKeywords } = this.props
    return (
      <div>
        <SearchBox inputText={inputText} relatedKeywords={relatedKeywords} onChange={this.handleChangeInput} onClear={this.handleClearInput} onCancel={this.handleCancel} onClickItem={this.handleClickItem} />
        <PopularSearchKeywords popularKeywords={popularKeywords} onClickItem={this.handleClickItem} />
        <SearchHistory historyKeywords={historyKeywords} onClickItem={this.handleClickItem} onClear={this.handleClearHistory} />
      </div>
    );
  }

  componentDidMount() {
    this.props.searchActions.loadPopularKeywords();
  }

  handleChangeInput = text => {
    const { setInputText, loadRelatedKeywords } = this.props.searchActions;
    setInputText(text);
    loadRelatedKeywords(text);
  }

  handleClearInput = () => {
    this.props.searchActions.clearInputText();
  }

  handleCancel = () => {
    this.handleClearInput();
    this.props.history.goBack();
  }

  handleClickItem = item => {
    const { setInputText, addHistoryKeyword } = this.props.searchActions;
    setInputText(item.keyword);
    addHistoryKeyword(item.id);
    //跳轉到搜索結果頁邏輯  todo
  }

  handleClearHistory = () => {
    this.props.searchActions.clearHistoryKeywords();
    this.handleClearInput();
  }

  componentWillUnmount() {
    this.props.searchActions.clearInputText();
  }

}

const mapStateToProps = (state, props) => {
  return {
    popularKeywords: getPopularKeywords(state),
    inputText: getInputText(state),
    relatedKeywords: getRelatedKeywords(state),
    historyKeywords: getHistoryKeywords(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);