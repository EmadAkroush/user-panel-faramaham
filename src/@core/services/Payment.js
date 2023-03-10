import endpoints from './endpoints';

export default class PaymentService {
  constructor(axiosIns, serviceUrl, version) {
    this.$http = axiosIns;
    this.serviceUrl = serviceUrl.replace('{version}', version);
    this.version = version;
    this.endpoints = endpoints.payment;
  }

  getTransactionList({ pageIndex, pageSize, from, to, status, query, types, OnlyWallet }) {
    let _url = this.serviceUrl + this.endpoints.tranactionList;
    if (pageIndex) {
      _url += '?pageIndex=' + pageIndex;
    }
    if (pageSize) {
      _url += '&pageSize=' + pageSize;
    }
    if (status) {
      _url += '&status=' + status;
    }
    if (query) {
      _url += '&query=' + query;
    }
    if (from) {
      _url += '&from=' + from;
    }
    if (to) {
      _url += '&to=' + to;
    }
    if (OnlyWallet) {
      _url += '&OnlyWallet=' + OnlyWallet;
    }
    if (types) {
      _url += '&types=' + types;
    }
    return this.$http.get(_url);
  }
  getBalance() {
    let _url = this.serviceUrl + this.endpoints.getBalance;
    return this.$http.get(_url);
  }
}
