import HttpService from '../../shared/services/http-service.js';

const PhoneService = {

  getPhones(callback) {
    HttpService.sendRequest('phones/phones.json', {
      successCallback: callback,
    });
  },

  getPhone(phoneId, callback) {
    // HttpService.sendRequest(`phones/${phoneId}.json`, {
    //   successCallback: callback
    // });
    let promise = this._sendRequest(`phones/${phoneId}.json`);

    promise.then(callback);
    promise.then(result => {
      console.log(result);
    })
  },

  _sendRequest(url) {
    let promise = {
      _successCallbacks: [],

      then(successCallback) {
        console.log(successCallback)
        this._successCallbacks.push(successCallback);
      },

      _resolve(data) {
        console.log('resolve')
        this._successCallbacks.forEach(callback => callback(data));
      }
    };

    HttpService.sendRequest(url, {
      successCallback(data) {
        console.log('success')
        promise._resolve(data);
      }
    });

    return promise;
  }
}

export default PhoneService;
