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
    let promise = this._sendRequest(`phondasdses/${phoneId}.json`);

    promise.then(callback, err => { console.log('cb1', err) });
    promise.catch(err => { console.log('cb2', err) })
  },

  _sendRequest(url) {
    let promise = new MyPromise((resolve, reject) => {
      HttpService.sendRequest(url, {
        successCallback(data) {
          resolve(data);
        },
        errorCallback(error) {
          reject(error);
        }
      });
    });



    return promise;
  }
}

class MyPromise {
  constructor(behaviorFunction) {
    this._successCallbacks = [];
    this._errorCallbacks = [];
    this._status = 'pending';
    this._result = null;

    behaviorFunction(this._resolve.bind(this), this._reject.bind(this));
  }

  then(successCallback, errorCallback) {
    if (this._status === 'fulfilled') {
      successCallback(this._result);
    } else if (this._status === 'rejected') {
      errorCallback(this._result);
    } else {
      this._successCallbacks.push(successCallback);
      if (errorCallback) {
        this._errorCallbacks.push(errorCallback);
      }
    }
  }

  catch(errorCallback) {
    if (this._status === 'rejected') {
      errorCallback(this._result);
    } else {
      this._errorCallbacks.push(errorCallback);
    }
  }

  _resolve(data) {
    this._status = 'fulfilled';
    this._result = data;
    this._successCallbacks.forEach(callback => callback(data));
  }

  _reject(error) {
    this._status = 'rejected';
    this._result = error;
    this._errorCallbacks.forEach(callback => typeof callback === 'function' && callback(error));
  }
}

export default PhoneService;
