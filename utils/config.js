const HOST = 'https://www.haixm.cn';

module.exports = {
  HOST,
  API: {
    login: `${HOST}/api/Sign/login`,
    getCode: `${HOST}/api/Sign/res_mas`,
    regist: `${HOST}/api/Sign/regis`,
    //商品
    banners: `${HOST}/api/Sale/banners`, //首页轮播
    goodsjx: `${HOST}/api/Sale/goodsjx`, //精选活动
    goodsbk: `${HOST}/api/Sale/goodsbk`, //商成爆款
    goodDeta: `${HOST}/api/Sale/good_deta`, //商品详情
    orderData: `${HOST}/api/Sale/order_deta`, //提交订单页面
    shareDara: `${HOST}/api/Sale/share_data`, //分享页面
    subOrder: `${HOST}/api/Sale/place_or`, //下单
    wxpay: `${HOST}/api/Pay/applyWxpay_sc`, //微信支付
    //个人中心
    personData: `${HOST}/api/Person/person_data`, //个人中心
    moneyList: `${HOST}/api/Person/money_list`, //余额变动list
    newslist: `${HOST}/api/Person/newslist`, //消息分类
    msgDetail: `${HOST}/api/Person/news_deta`, //消息详情
    selfData: `${HOST}/api/Person/per_data`, //个人基本信息
    upHeadImg: `${HOST}/api/Person/upd_head_img`, //更改头像
    changeSelfData: `${HOST}/api/Person/change_perdata`, //个人基本信息更改
    toIntr: `${HOST}/api/Person/to_intr`, //成为推广员
    applyCz: `${HOST}/api/Pay/applyWxpay_cz`, //成为推官员发起支付
    selfCode: `${HOST}/api/Person/intr_data`, //我的推荐码
    withdraw: `${HOST}/api/Person/withdraw`, //提现接口
    myTeam: `${HOST}/api/Person/teams_f`, //我的团队
    changeCard: `${HOST}/api/Person/changewithdrawcard`, //更改银行卡 
    card: `${HOST}/api/Person/bankcard`, //银行卡 
    orderList: `${HOST}/api/Order/order_list`, //订单列表
    rece: `${HOST}/api/Order/rece`, //确认收货
    usNews: `${HOST}/api/Person/us_news`, //售后服务
    rule: `${HOST}/api/Person/rule`, //嘟嘟装钱规则
    about: `${HOST}/api/Person/about`, //赚钱简介
    comment: `${HOST}/api/Order/comment`, //评价
    upImg: `${HOST}/api/Person/up_img`, //上传图片
    disDeta: `${HOST}/api/Person/dis_deta`, //认证
    paySuc: `${HOST}/api/pay/checkwx_pay`, //支付成功回调
    // disDeta: `${HOST}/api/Person/dis_deta`, //认证
    checkwxPay: `${HOST}/api/Pay/checkwx_pay/out_trade_no/`, //下单回调 
    //    二维码   
  }
}