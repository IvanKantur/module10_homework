const btn = document.querySelector('.j-btn-test'); // Находим нашу кнопку
const icon1 = document.querySelector('.bi-arrow-down-left-circle'); // Находим иконку №1
const icon2 = document.querySelector('.bi-arrow-down-left-circle-fill'); // Находим иконку №2

// С помощью обратотчика добавляем или убираем стиль скрывающий иконку
btn.addEventListener('click', () => {
  icon1.classList.toggle('invisible');
  icon2.classList.toggle('invisible');
});