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

    // Функция для определения окончания существительных в объявлении
    setDeclension: function (number, array) {
      if ((number % 100 < 20) && (number % 100 >= 5)) {
        return array[2];
      }
      if (number % 10 === 1) {
        return array[0];
      } else if ((number % 10 > 1) && (number % 10 < 5)) {
        return array[1];
      } else {
        return array[2];
      }
    }
  };
})();
