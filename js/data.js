'use strict';
// Блок формирования массива объявлений

(function () {
// Данные для массива объявлений
  var ADS_AMOUNT = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AVATAR_PATH = 'img/avatars/user';
  var AVATAR_FILE_TYPE = '.png';
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 100;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var LOCATION_MIN_X = 300;
  var LOCATION_MAX_X = 900;
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;

  // Формируем массив аватарок и перемешиваем его
  var getAvatarsArray = function () {
    var avatars = [];
    for (var i = 1; i <= ADS_AMOUNT; i++) {
      if (i < 10) {
        avatars.push('0' + i);
      } else {
        avatars.push('' + i);
      }
    }
    return avatars.sort(window.utils.compareRandom);
  };

  var avatars = getAvatarsArray();

  // Перемешиваем наименования в случайном порядке, чтобы они не повторялись
  var adTitle = OFFER_TITLES.sort(window.utils.compareRandom);

  // Формируем массив объявлений
  var createAdvertismentsArray = function (advertismentsCount) {
    var advertisments = [];
    for (var i = 0; i < advertismentsCount; i++) {
      var locationX = window.utils.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
      var locationY = window.utils.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

      advertisments.push({
        author: {
          avatar: AVATAR_PATH + avatars[i] + AVATAR_FILE_TYPE
        },
        offer: {
          title: adTitle[i],
          address: (locationX + ', ' + locationY),
          price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: window.utils.getRandomElement(OFFER_TYPES),
          rooms: window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: window.utils.getRandomElement(CHECK_TIMES),
          checkout: window.utils.getRandomElement(CHECK_TIMES),
          features: window.utils.getArrayLength(FEATURES),
          description: '',
          photos: PHOTOS.sort(window.utils.compareRandom)
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }
    return advertisments;
  };

  var advertisments = createAdvertismentsArray(ADS_AMOUNT);

  window.data = {
    advertisments: advertisments,
    LOCATION_MIN_Y: LOCATION_MIN_Y,
    LOCATION_MAX_Y: LOCATION_MAX_Y
  };

})();
