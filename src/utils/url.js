export default {
  getProductList: (path, rowIndex, pageSize) => 
  `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
  getProductDetail: (id) => `/mock/product_detail/${id}.json`,
  getShopById: (id) => `/mock/shops/${id}.json`,
  getPopularKeywords: () => `./mock/keywords/popular.json`,

  // 在真实项目中，是这样根据text去取数据的。但是在模拟项目中，不论text是何值，从mock数据中取得的值都是一样的。
  getRelatedKeywords: (text) => `/mock/keywords/related.json?keyword=${text}`,
  getRelatedShops: (keyword) => `/mock/shops/related.json?keyword=${keyword}`,

}