import endpoints from './endpoints';

export default class TicketService {
  constructor(axiosIns, serviceUrl, version) {
    this.$http = axiosIns;
    this.serviceUrl = serviceUrl.replace('{version}', version);
    this.version = version;
    this.endpoints = endpoints.ticket;
  }

  getTickets({ pageIndex, pageSize, from, to, status }) {
    let _url = this.serviceUrl + this.endpoints.ticket;
    if (pageIndex) {
      _url += '?pageIndex=' + pageIndex;
    }
    if (pageSize) {
      _url += '&pageSize=' + pageSize;
    }
    if (from) {
      _url += '&from=' + from;
    }
    if (to) {
      _url += '&to=' + to;
    }
    if (status) {
      _url += '&status=' + to;
    }
    return this.$http.get(_url);
  }

  createTicket(data) {
    let _url = this.serviceUrl + this.endpoints.ticket;
    return this.$http.post(_url, data);
  }
  responseTicket(data, ticket_id) {
    let _url = this.serviceUrl + this.endpoints.response.replace(/{_id}/, ticket_id);
    return this.$http.post(_url, data);
  }

  getCategoryList() {
    let _url = this.serviceUrl + this.endpoints.category;
    return this.$http.get(_url);
  }
  getTicket(ticket_id) {
    let _url = this.serviceUrl + this.endpoints.ticket + `/${ticket_id}`;
    return this.$http.get(_url);
  }
}
