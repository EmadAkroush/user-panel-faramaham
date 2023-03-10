import endpoints from './endpoints';

export default class FileService {
  constructor(axiosIns, serviceUrl, version) {
    this.$http = axiosIns;
    this.serviceUrl = serviceUrl.replace('{version}', version);
    this.version = version;
    this.endpoints = endpoints.file;
  }
  createFile(formData) {
    let _url = this.serviceUrl + this.endpoints.create;
    return this.$http.post(_url, formData);
  }

  deleteFile(data) {
    let _url = this.serviceUrl + this.endpoints.delete;
    return this.$http.post(_url, data);
  }
}
