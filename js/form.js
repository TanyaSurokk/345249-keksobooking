'use strict';
// Блок работы с формой

(function () {
  var MAX_ROOM_NUMBER = 100;
  var NO_GUESTS_VALUE = 0;
  var MinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var priceInput = adForm.querySelector('#price');
  var typeField = adForm.querySelector('#type');
  var checkInField = adForm.querySelector('#timein');
  var checkOutField = adForm.querySelector('#timeout');
  var capacityField = adForm.querySelector('#capacity');
  var roomNumberField = adForm.querySelector('#room_number');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var successBlock = document.querySelector('.success');

  // Изначальное состояние формы - добавляем полям атрибут disabled
  var disableForm = function () {
    adFormFieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  // Функция для оживления формы
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // Устанавливаем зависимость типа жилья и минимальной цены
  var setMinPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  typeField.addEventListener('change', function (evt) {
    setMinPrice(MinPrice[evt.target.value]);
  });

  // При нажатии на кнопку отправки проверяется, что цена не меньше минимальной для конкретного типа жилья
  var submit = adForm.querySelector('.ad-form__element--submit');
  submit.addEventListener('click', function () {
    priceInput.min = MinPrice[typeField.value];
  });

  // Устанавливаем зависимость времени заезда и выезда
  checkInField.addEventListener('change', function (evt) {
    checkOutField.value = evt.target.value;
  });

  checkOutField.addEventListener('change', function (evt) {
    checkInField.value = evt.target.value;
  });

  // Делаем невозможным выбор кол-ва гостей до выбора кол-ва комнат, закрепляем первоначальный выбор соответствующего количества гостей
  var setInitialCapacity = function () {
    var capacityOption = capacityField.querySelectorAll('option');
    capacityOption.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');

      if (item.selected) {
        item.removeAttribute('disabled');
      }
    });
  };
  setInitialCapacity();

  // Устанавливаем зависимость кол-ва комнат и гостей
  var setCapacity = function (evt) {
    if (+roomNumberField.value === MAX_ROOM_NUMBER) {
      capacityField.value = NO_GUESTS_VALUE;
    } else {
      capacityField.value = roomNumberField.value;
    }

    for (var i = 0; i < capacityField.length; i++) {
      var option = capacityField.options[i];
      var noGuests = +option.value === NO_GUESTS_VALUE;
      var tooManyGuests = +option.value > +evt.target.value;
      if (+evt.target.value !== MAX_ROOM_NUMBER) {
        option.disabled = noGuests || tooManyGuests;
      } else {
        option.disabled = !noGuests;
      }
    }
  };

  roomNumberField.addEventListener('change', setCapacity);

  // Функция для заполнения в форме поля адреса согласно координатам главной метки
  var setAddress = function (width, height, pin) {
    var mainPinX = Math.round(pin.offsetLeft + width / 2);
    var mainPinY = Math.round(pin.offsetTop + height);
    addressInput.value = mainPinX + ', ' + mainPinY;
  };

  // Добавляем красную рамку ошибки невалидным элементам и убираем ее при исправлении значения
  var inputs = adForm.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.addEventListener('invalid', function () {
      input.classList.add('error');
    });
    input.addEventListener('input', function () {
      if (input.validity.valid) {
        input.classList.remove('error');
      }
    });
  });

  // Функция сброса формы
  var resetForm = function () {
    adForm.reset();
    priceInput.placeholder = MinPrice[typeField.value];
    adForm.classList.add('ad-form--disabled');
    inputs.forEach(function (input) {
      input.classList.remove('error');
    });
    window.images.resetImages();
  };

  // Функция деактивации страницы
  var deactivatePage = function () {
    resetForm();
    window.map.resetMap();
    window.filters.resetFilters();
    window.map.setInitialPage();
  };

  // Реализуем сброс страницы в исходное неактивное состояние без перезагрузки
  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

  // Появление и закрытие окна об успешном заполнении формы
  var closeSuccessBlock = function () {
    successBlock.classList.add('hidden');
    document.removeEventListener('click', successBlockClickHandler);
    document.removeEventListener('keydown', successBlockEscPressHandler);
  };

  var successBlockClickHandler = function () {
    closeSuccessBlock();
  };

  var successBlockEscPressHandler = function (evt) {
    window.utils.isEscKeycode(evt, closeSuccessBlock);
  };

  var adFormSubmitSuccessHandler = function () {
    deactivatePage();
    successBlock.classList.remove('hidden');
    document.activeElement.blur();
    document.addEventListener('click', closeSuccessBlock);
    document.addEventListener('keydown', successBlockEscPressHandler);
  };

  // Появление окна об ошибке в отправке данных на сервер
  var adFormSubmitErrorHandler = function (errorMessage) {
    window.createErrorMessage(errorMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(adFormSubmitSuccessHandler, adFormSubmitErrorHandler, new FormData(adForm));
    evt.preventDefault();
  });

  window.form = {
    disableForm: disableForm,
    activateForm: activateForm,
    setAddress: setAddress
  };
})();
