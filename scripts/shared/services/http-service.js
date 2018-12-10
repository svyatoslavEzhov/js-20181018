const BASE_URL = location.pathname;

const HttpService = {
  sendRequest(url, {method = 'GET', successCallback, errorCallback}) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, BASE_URL + url, true);
    xhr.send();

    xhr.onload = () =>
    {
      if (xhr.status !== 200) {
        errorCallback(xhr.status + ': ' + xhr.statusText)
        return;
      }

      let responseData = JSON.parse(xhr.responseText);
      successCallback(responseData);
    }
  }
}
  //   xhr.onerror = () => {
  //     let callback = errorCallback || console.error;
  //     callback(xhr.status + ': ' + xhr.statusText);
  //   }
  // },

  // getUserContent() {
  //   getUser('asdfasd', (user) => {
  //     getAccessRights(user.id, (userRights) => {
  //       if (!userRights.hasAccess) {
  //         // redirect
  //       }
  //
  //       getContent(user, userRights, (content) => {
  //         showPageContent(content);
  //       })
  //     })
  //   })
  // }

  // getUser('asdfasd')
  //   .then(user => {
  //     return getAccessRights(user.id);
  //   })
  //   .then(accessRights => {
  //     getContent(user, accessRights);
  //   })
  //   .then(content => ... )
  //   .catch(err => console.error(err))

  // let user = getUser('asdfasd');
  // let accessRights = getAccessRights(user.id);


function getUser(url, callback) {
  HttpService.sendRequest(url, { successCallback: callback })
}
function getAccessRights(id, callback) {
  HttpService.sendRequest(`userrights/${id}`, { successCallback: callback })
}
function getContent(userId, accessRights, callback) {}

export default HttpService;
