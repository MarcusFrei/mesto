 export class Section {
    constructor({items, renderer}, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector); 
    }

    render(items) {
       // this._container.innerHTML = '';
        items.forEach(element => {
            this._renderer(element)
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}  


