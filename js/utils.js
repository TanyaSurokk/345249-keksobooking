'use strict';
// Блок служебных функций

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    // Функции нажатия горячих клавиш
    isEscKeycode: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterKeycode: function (evt, action, data) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(data);
      }
    },

    // Функция для получения случайного элемента массива
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    // Функция для получения случайного числа из диапазона
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // Функция для получения случайного порядка элементов в массиве
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    // Функция для получения перемешанного массива разной длины
    getArrayLength: function (array) {
      var arrayRandom = array.sort(window.utils.compareRandom);
      var arrayClone = arrayRandom.slice();
      arrayClone.length = window.utils.getRandomNumber(1, array.length);
      return arrayClone;
    }
  };
})();
