const PhoneService = {
  _sendRequest(url, { method = 'GET', successCallback }) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();

    xhr.onload = () => {
      let responseData = JSON.parse(xhr.responseText);
      successCallback(responseData);
    }

    xhr.onerror = () => {
      console.error(xhr.status + ': ' + xhr.statusText);
    }
  },

  getPhones(callback) {
    this._sendRequest('/phones/phones.json', {
      successCallback: callback,
    });
  },

  getPhone(phoneId, callback) {
    this._sendRequest(`/phones/${phoneId}.json`, {
      successCallback: callback,
    });
  }
}

export default PhoneService;
