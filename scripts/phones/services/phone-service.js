import HttpService from '../../shared/services/http-service.js';

const PhoneService = {
  getPhones({ query = '', orderField = '' } = {}) {
    let promise = HttpService.sendRequest('phones/phones.json');

    return promise.then(phones => {
      let filteredPhones = this._filter(phones, query);
      let sortedPhones = this._sort(filteredPhones, orderField);

      return sortedPhones;
    })
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },

  _filter(phones, query) {
    const lowerCaseQuery = query.toLowerCase();

    return phones.filter(
      phone => phone.name.toLowerCase().includes(lowerCaseQuery)
    );
  },

  _sort(phones, orderField) {
    return phones.sort((a, b) => {
      return a[orderField] > b[orderField] ? 1 : -1;
    });
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
