'use strict';
// Блок создания и вставки в разметку меток

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var PINS_NUMBER = 5;

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPins = [];

  // Функция для создания меток для карты с данными из массива
  var renderMapPin = function (mapPinElement) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.style.left = mapPinElement.location.x - PIN_WIDTH / 2 + 'px';
    mapPin.style.top = mapPinElement.location.y - PIN_HEIGHT + 'px';
    mapPin.querySelector('img').src = mapPinElement.author.avatar;
    mapPin.querySelector('img').alt = mapPinElement.offer.title;

    var mapPinClickHandler = function () {
      window.card.openMapCard(mapPinElement);
    };
    var mapPinKeydownHandler = function (evt) {
      window.utils.isEnterKeycode(evt, window.card.openMapCard, mapPinElement);
    };
    mapPin.addEventListener('click', mapPinClickHandler);
    mapPin.addEventListener('keydown', mapPinKeydownHandler);
    mapPins.push(mapPin);
    return mapPin;
  };

  // Функция для вставки меток в блок (удачная загрузка данных с сервера)
  var renderMapPinsList = function (advertisments) {
    var pinsNumber = advertisments.length > PINS_NUMBER ? PINS_NUMBER : advertisments.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsNumber; i++) {
      fragment.appendChild(renderMapPin(advertisments[i]));
    }
    mapPinsList.appendChild(fragment);
  };

  // Удачная загрузка данных с сервера
  var loadSuccessHandler = function (advertisments) {
    renderMapPinsList(advertisments);
    window.filters.getAdvertsData(advertisments);
    window.filters.activateFilters();
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
    removeMapPins: removeMapPins,
    renderMapPinsList: renderMapPinsList
  };
})();
