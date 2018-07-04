'use strict';
// Блок создания элемента, содержащего сообщение об ошибке

(function () {
  window.createErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    var nodeClose = document.createElement('button');
    node.classList.add('error-block');
    node.textContent = errorMessage;
    nodeClose.classList.add('error-block__close');
    nodeClose.type = 'button';
    node.appendChild(nodeClose);

    document.body.insertAdjacentElement('afterbegin', node);
    nodeClose.focus();

    var closeErrorBlock = function () {
      node.remove();
      document.removeEventListener('keydown', errorBlockEscPressHandler);
    };

    var errorBlockEscPressHandler = function (evt) {
      window.utils.isEscKeycode(evt, closeErrorBlock);
    };

    document.addEventListener('keydown', errorBlockEscPressHandler);

    var nodeCloseClickHandler = function () {
      closeErrorBlock();
    };
    var nodeCloseKeydownHandler = function (evt) {
      window.utils.isEnterKeycode(evt, closeErrorBlock);
    };
    nodeClose.addEventListener('click', nodeCloseClickHandler);
    nodeClose.addEventListener('keydown', nodeCloseKeydownHandler);
  };
})();
