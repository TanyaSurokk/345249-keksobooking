'use strict';
// Блок создания и вставки в разметку карточек объявлений

(function () {
  var PRICE_TEXT = '₽/ночь';
  var ROOMS_TEXT = ' комнаты для ';
  var GUESTS_TEXT = ' гостей';
  var CHECKIN_TEXT = 'Заезд после ';
  var CHECKOUT_TEXT = ', выезд до ';

  var mapFilters = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');

  // Функция для перевода названия типа жилья
  var translateType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        return type;
    }
  };

  // Функция для создания списка удобств
  var renderFeaturesList = function (featuresList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < featuresList.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + featuresList[i]);
      fragment.appendChild(featureItem);
    }
    return fragment;
  };

  // Функция для создания списка фотографий
  var renderPhotosList = function (photosList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photosList.length; i++) {
      var photoElement = photoTemplate.cloneNode();
      photoElement.src = photosList[i];
      fragment.appendChild(photoElement);
    }
    return fragment;
  };

  var onMapCardEscPress = function (evt) {
    window.utils.isEscKeycode(evt, closeMapCard);
  };

  // Функция для создания DOM-элемента объявления и заполнения его данными из массива
  var renderMapCard = function (mapCard) {
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + PRICE_TEXT;
    mapCardElement.querySelector('.popup__type').textContent = translateType(mapCard.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ROOMS_TEXT + mapCard.offer.guests + GUESTS_TEXT;
    mapCardElement.querySelector('.popup__text--time').textContent = CHECKIN_TEXT + mapCard.offer.checkin + CHECKOUT_TEXT + mapCard.offer.checkout;
    mapCardElement.querySelector('.popup__features').innerHTML = '';
    mapCardElement.querySelector('.popup__features').appendChild(renderFeaturesList(mapCard.offer.features));
    mapCardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
    mapCardElement.querySelector('.popup__photos').innerHTML = '';
    mapCardElement.querySelector('.popup__photos').appendChild(renderPhotosList(mapCard.offer.photos));
    mapCardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;

    var popupClose = mapCardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', closeMapCard);
    popupClose.addEventListener('keydown', function (evt) {
      window.utils.isEnterKeycode(evt, closeMapCard);
    });
    document.addEventListener('keydown', onMapCardEscPress);

    return mapCardElement;
  };

  // Функция для помещения объявления в разметку - открываем соответствующее объявление, убираем предыдущее открытое
  var openMapCard = function (mapCard) {
    var card = window.map.mapElement.querySelector('.map__card');
    if (card) {
      closeMapCard();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(mapCard));
    window.map.mapElement.insertBefore(fragment, mapFilters);
  };

  // Закрываем объявление, удаляем обработчик события
  var closeMapCard = function () {
    var popup = document.querySelector('.map__card');
    if (!popup) {
      return;
    }
    window.map.mapElement.removeChild(popup);
    document.removeEventListener('keydown', onMapCardEscPress);
  };

  window.card = {
    openMapCard: openMapCard,
    closeMapCard: closeMapCard
  };

})();
