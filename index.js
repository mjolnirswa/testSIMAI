// Класс Component для генерации элементов на странице сайта
class Component {
  // Конструктор класса принимает данные о создаваемом элементе
  constructor({ template, params, modifiers, text, events }) {
    // Свойство template хранит шаблон элемента в виде строки
    this.template = template;
    // Свойство params хранит параметры отображения элемента в виде объекта
    this.params = params;
    // Свойство modifiers хранит модификаторы элемента в виде массива строк
    this.modifiers = modifiers;
    // Свойство text хранит текстовые значения элемента в виде объекта
    this.text = text;
    // Свойство events хранит события элемента в виде объекта
    this.events = events;
  }

  // Метод render создает и возвращает DOM-элемент на основе данных класса
  render() {
    // Создаем DOM-элемент из шаблона с помощью метода insertAdjacentHTML
    let element = document.createElement("div");
    element.insertAdjacentHTML("afterbegin", this.template);
    element = element.firstElementChild;

    // Применяем параметры отображения к элементу с помощью метода setAttribute
    for (let key in this.params) {
      element.setAttribute(key, this.params[key]);
    }

    // Применяем модификаторы к элементу с помощью метода classList.add
    for (let modifier of this.modifiers) {
      element.classList.add(modifier);
    }

    // Вставляем текстовые значения в элемент с помощью метода querySelector и свойства textContent
    for (let key in this.text) {
      element.querySelector(key).textContent = this.text[key];
    }

    // Добавляем обработчики событий к элементу с помощью метода addEventListener
    for (let event of this.events) {
      if (element.querySelector(event.tag) === null) { // если тег является родителем для остальных
        element.addEventListener(event.type, event.handler)
      }else {
        element.querySelector(event.tag).addEventListener(event.type, event.handler); // если тег находится внутри другого тега
      }
    }

    // Возвращаем готовый элемент
    return element;
  }
}

let button = new Component({
  template: `<button><span></span></button>`, // шаблон кнопки с вложенным span
  params: {
    type: "button", // тип кнопки
    id: "my-button", // идентификатор кнопки
  },
  modifiers: ["btn", "btn-primary"], // классы для стилизации кнопки
  text: {
    span: "Click me", // текст внутри span
  },
  events: [
    {
      tag: "button",
      type: "click",
      handler: function () {
        // функция, которая срабатывает при клике на кнопку
        alert("You clicked the button");
      }
    }
  ],
});



// Получаем элемент кнопки с помощью метода render
let buttonElement = button.render();

// Вставляем элемент кнопки в документ внутри элемента с id="container"
document.getElementById("container").appendChild(buttonElement);


//2) Пример с чекбоксом

// Создаем экземпляр класса Component с данными для элемента списка
let listItem = new Component({
  template: `<li><input type="checkbox" /><label></label></li>`, // шаблон элемента списка с чекбоксом и меткой
  params: {
    id: "my-list-item",
    placeholder: 'Input me' // идентификатор элемента списка
  },
  modifiers: ["list-item"], // класс для стилизации элемента списка
  text: {
    label: 'Check'
  }, 
  events: [
    {
      tag: 'input',
      type: 'click',
      handler: function () {
        // функция, которая срабатывает при изменении состояния чекбокса
        if (this.checked) {
          // если чекбокс отмечен, то зачеркиваем текст метки
          this.nextElementSibling.style.textDecoration = "line-through";
        } else {
          // если чекбокс не отмечен, то убираем зачеркивание текста метки
          this.nextElementSibling.style.textDecoration = "none";
        }
      }
    },
  ],
});


// Получаем элемент списка с помощью метода render
let listItemElement = listItem.render();

// Вставляем элемент списка в документ внутри элемента с id="my-list"
document.getElementById("container").appendChild(listItemElement);

//3)Пример с инпутом

let inputItem = new Component({
  template: "<input />",
  params: {
    type: "text",
    id: "my-input-item",
    placeholder: "input",
    style: "width:100px; height: 60px"
  },
  modifiers: ["input-item"],
  events: []
});

let inputElement = inputItem.render();
document.getElementById("container").appendChild(inputElement);