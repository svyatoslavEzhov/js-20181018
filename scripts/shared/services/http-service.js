// const BASE_URL = location.pathname;

const HttpService = {
  sendRequest(url, method = 'GET') {
    // return new Promise((resolve, reject) => {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open(method, BASE_URL + url, true);
    //   xhr.send();
    //
    //   xhr.onload = () =>
    //   {
    //     if (xhr.status !== 200) {
    //       reject(xhr.status + ': ' + xhr.statusText)
    //       return;
    //     }
    //
    //     let responseData = JSON.parse(xhr.responseText);
    //     resolve(responseData);
    //   }
    // });

    return fetch(BASE_URL + url).then(response => response.json());
  }
}


export default HttpService;
