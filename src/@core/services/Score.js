import endpoints from './endpoints';

export default class ScoreService {
  constructor(axiosIns, serviceUrl, version) {
    this.$http = axiosIns;
    this.serviceUrl = serviceUrl.replace('{version}', version);
    this.version = version;
    this.endpoints = endpoints.score;
  }

  getUserScore() {
    const _url = this.serviceUrl + this.endpoints.userScore;
    return this.$http.get(_url);
  }

  getUserHistory({ pageIndex, pageSize }) {
    let _url = this.serviceUrl + this.endpoints.history;
    if (pageIndex) {
      _url += '?pageIndex=' + pageIndex;
    }
    if (pageSize) {
      _url += '&pageSize=' + pageSize;
    }
    return this.$http.get(_url);
  }

  getLeaderBoard() {
    let _url = this.serviceUrl + this.endpoints.leaderboard;
    return this.$http.get(_url);
  }
  getUserHistory({ pageIndex, pageSize }) {
    let _url = this.serviceUrl + this.endpoints.history;
    if (pageIndex) {
      _url += '?pageIndex=' + pageIndex;
    }
    if (pageSize) {
      _url += '&pageSize=' + pageSize;
    }
    return this.$http.get(_url);
  }
}
