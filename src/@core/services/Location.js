import endpoints from './endpoints';

export default class LocationService {
  constructor(axiosIns, serviceUrl, version) {
    this.$http = axiosIns;
    this.serviceUrl = serviceUrl.replace('{version}', version);
    this.version = version;
    this.endpoints = endpoints.location;
  }

  getProvincesByCity() {
    const _url = this.serviceUrl + this.endpoints.Address;
    return this.$http.get(_url);
  }
}
