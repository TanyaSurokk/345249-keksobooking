'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var getXHR = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Произошла ошибка. Перезагрузите, пожалуйста, страницу. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data ? data : '');
  };

  // Функция отправки данных на сервер
  var upload = function (onLoad, onError, data) {
    getXHR(onLoad, onError, 'POST', URL_UPLOAD, data);
  };

  // Функция получения данных с сервера
  var load = function (onLoad, onError) {
    getXHR(onLoad, onError, 'GET', URL_LOAD);
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
