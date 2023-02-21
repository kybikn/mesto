class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  /** Отрисовка всех элементов */
  renderItems(items) {
    // меняем порядок элементов массива
    items.reverse().forEach((item) => {
      /** функция renderer осуществляет отрисовку каждого отдельного элемента */
      /** методом addItem осуществляет добавление элемента в контейнер */
      this.addItem(this._renderer(item));
    });
  }

  addItem(renderedItem) {
    this._container.prepend(renderedItem);
  }
}

export { Section };
