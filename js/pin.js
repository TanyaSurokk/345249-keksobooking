'use strict';
// Блок создания и вставки в разметку меток

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPins = [];

  // Функция для создания меток для карты с данными из массива
  var renderMapPin = function (mapPin) {
    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = mapPin.location.x - PIN_WIDTH / 2 + 'px';
    mapPinElement.style.top = mapPin.location.y - PIN_HEIGHT + 'px';
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;

    mapPinElement.addEventListener('click', function () {
      window.card.openMapCard(mapPin);
    });

    mapPinElement.addEventListener('keydown', function (evt) {
      window.utils.isEnterKeycode(evt, window.card.openMapCard, mapPin);
    });

    mapPins.push(mapPinElement);
    return mapPinElement;
  };

  // Функция для вставки меток в блок (удачная загрузка данных с сервера)
  var loadSuccessHandler = function (advertisments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisments.length; i++) {
      fragment.appendChild(renderMapPin(advertisments[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  // Вывод сообщения об ошибке в случае неудачной загрузки с сервера
  var loadErrorHandler = function (errorMessage) {
    window.createErrorMessage(errorMessage);
  };

  // Функция удаления меток с карты
  var removeMapPins = function () {
    mapPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    loadSuccessHandler: loadSuccessHandler,
    loadErrorHandler: loadErrorHandler,
    removeMapPins: removeMapPins
  };
})();
