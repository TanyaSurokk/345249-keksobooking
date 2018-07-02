'use strict';
// Блок загрузки изображений

(function () {
  var AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ImageSize = {
    WIDTH: 70,
    HEIGHT: 70
  };

  var avatarChooser = document.querySelector('#avatar');
  var imagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var photoPreview = document.querySelector('.ad-form__photo');

  // Функция, отрисовывающая аватар
  var renderAvatar = function (src) {
    avatarPreview.src = src;
  };

  // Функция, отрисовывающая изображения жилья
  var renderImages = function (src) {
    var newPhotoPreview = photoPreview.cloneNode();
    var image = document.createElement('img');
    image.src = src;
    image.width = ImageSize.WIDTH;
    image.height = ImageSize.HEIGHT;
    newPhotoPreview.appendChild(image);
    imagesContainer.insertBefore(newPhotoPreview, photoPreview);
  };

  // Функция, отображающая изображения на странице
  var displayImages = function (files, renderFunction) {
    Array.from(files).forEach(function (item) {
      var fileName = item.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          renderFunction(reader.result);
        });

        reader.addEventListener('error', function () {
          window.createErrorMessage('При загрузке произошла ошибка!');
        });

        reader.readAsDataURL(item);
      }
    });
  };

  // Обработчик события для аватарки
  var avatarChangeHandler = function (evt) {
    displayImages(evt.target.files, renderAvatar);
  };

  // Обработчик события для фото жилья
  var imagesChangeHandler = function (evt) {
    displayImages(evt.target.files, renderImages);
  };

  avatarChooser.addEventListener('change', avatarChangeHandler);
  imagesChooser.addEventListener('change', imagesChangeHandler);

  // Сброс всех добавленных на страницу изображений
  var resetImages = function () {
    var photos = document.querySelectorAll('.ad-form__photo:not(:last-child)');
    photos.forEach(function (item) {
      item.remove();
    });
    avatarPreview.src = AVATAR_DEFAULT_SRC;
  };

  window.images = {
    resetImages: resetImages
  };
})();
