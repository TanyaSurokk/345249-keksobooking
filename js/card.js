'use strict';
// Блок создания и вставки в разметку карточек объявлений

(function () {
  var Text = {
    PRICE: '₽/ночь',
    CHECKIN: 'Заезд после ',
    CHECKOUT: ', выезд до ',
    ROOMS: ['комната', 'комнаты', 'комнат'],
    GUESTS: ['гостя', 'гостей', 'гостей']
  };
  var typeEnglishToRussian = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var mapFilters = document.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var photoTemplate = document.querySelector('template').content.querySelector('.popup__photo');

  // Функция для создания списка удобств
  var renderFeaturesList = function (featuresList) {
    var fragment = document.createDocumentFragment();
    featuresList.forEach(function (item) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add('popup__feature--' + item);
      fragment.appendChild(featureItem);
    });
    return fragment;
  };

  // Функция для создания списка фотографий
  var renderPhotosList = function (photosList) {
    var fragment = document.createDocumentFragment();
    photosList.forEach(function (item) {
      var photo = photoTemplate.cloneNode();
      photo.src = item;
      fragment.appendChild(photo);
    });
    return fragment;
  };

  var mapCardEscPressHandler = function (evt) {
    window.utils.isEscKeycode(evt, closeMapCard);
  };

  // Функция для создания DOM-элемента объявления и заполнения его данными из массива
  var renderMapCard = function (mapCardElement) {
    var mapCard = mapCardTemplate.cloneNode(true);

    mapCard.querySelector('.popup__title').textContent = mapCardElement.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = mapCardElement.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = mapCardElement.offer.price + Text.PRICE;
    mapCard.querySelector('.popup__type').textContent = typeEnglishToRussian[mapCardElement.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = mapCardElement.offer.rooms + ' ' + window.utils.setDeclension(mapCardElement.offer.rooms, Text.ROOMS) + ' для ' + mapCardElement.offer.guests + ' ' + window.utils.setDeclension(mapCardElement.offer.guests, Text.GUESTS);
    mapCard.querySelector('.popup__text--time').textContent = Text.CHECKIN + mapCardElement.offer.checkin + Text.CHECKOUT + mapCardElement.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = '';
    mapCard.querySelector('.popup__features').appendChild(renderFeaturesList(mapCardElement.offer.features));
    mapCard.querySelector('.popup__description').textContent = mapCardElement.offer.description;
    mapCard.querySelector('.popup__photos').innerHTML = '';
    mapCard.querySelector('.popup__photos').appendChild(renderPhotosList(mapCardElement.offer.photos));
    mapCard.querySelector('.popup__avatar').src = mapCardElement.author.avatar;

    var popupClose = mapCard.querySelector('.popup__close');
    var popupCloseClickHandler = function () {
      closeMapCard();
    };
    var popupCloseKeydownHandler = function (evt) {
      window.utils.isEnterKeycode(evt, closeMapCard);
    };
    popupClose.addEventListener('click', popupCloseClickHandler);
    popupClose.addEventListener('keydown', popupCloseKeydownHandler);
    document.addEventListener('keydown', mapCardEscPressHandler);

    return mapCard;
  };

  // Функция для помещения объявления в разметку - открываем соответствующее объявление, убираем предыдущее открытое
  var openMapCard = function (mapCard) {
    var card = window.map.map.querySelector('.map__card');
    if (card) {
      closeMapCard();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMapCard(mapCard));
    window.map.map.insertBefore(fragment, mapFilters);
  };

  // Закрываем объявление, удаляем обработчик события
  var closeMapCard = function () {
    var popup = document.querySelector('.map__card');
    if (!popup) {
      return;
    }
    window.map.map.removeChild(popup);
    document.removeEventListener('keydown', mapCardEscPressHandler);
  };

  window.card = {
    openMapCard: openMapCard,
    closeMapCard: closeMapCard
  };
})();
