const HOST = 'https://www.haixm.cn';

module.exports = {
  HOST,
  STORAGE: {
    SWITCHBAR: 'TRUSTAPP_SWITCHBAR',
    DATERANGE: 'TRUSTAPP_DATERANGE'
  },
  API: {
    login: `${HOST}/api/auth/login`,
    getCode: `${HOST}/api/auth/sendMessage`,
    regist: `${HOST}/api/auth/register`,
    identityAdd: `${HOST}/api/about/identityAdd`, //身份认证
    identity: `${HOST}/api/about/identity`, //身份查询
    businessAdd: `${HOST}/api/about/businessAdd`, //营业执照认证
    business: `${HOST}/api/about/business`, //营业查询
    expire: `${HOST}/api/about/expire`, //期限剩余
    history: `${HOST}/api/about/news`, //历史发布
    releaseCompany: `${HOST}/api/company/create`, //发布企业
    companyList: `${HOST}/api/company/showList`, //企业列表
    companyInfo: `${HOST}/api/company/info`, //企业详情
    concernCompany: `${HOST}/api/company/concern`, //关注企业
    delConcernCompany: `${HOST}/api/company/delConcern`, //取消关注企业
    newsShowList: `${HOST}/api/news/showList`, //收购或出售列表
    newsAdd: `${HOST}/api/news/create`, //出售或者收购发布
    newsInfo: `${HOST}/api/news/info`, //出售或者收购详情
    concernNews: `${HOST}/api/news/concern`, //关注出售或者收购
    delConcernNews: `${HOST}/api/news/delConcern`, //取消关注出售或者收购
    labelList: `${HOST}/api/label/showList`, //取消关注出售或者收购
    chargeList: `${HOST}/api/pay/charge`, //套餐列表
    applyWxpay: `${HOST}/api/pay/applyWxpay`, //支付
    payOrder: `${HOST}/api/pay/order`, //下单
    checkwxPay: `${HOST}/api/Pay/checkwx_pay/out_trade_no/`, //下单回调
  }
}