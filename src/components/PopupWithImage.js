import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor (selector) {
        super(selector)
        //console.log(selector);
        this._popupImg = this._selector.querySelector('.popup__full-image');
        this._popupText = this._selector.querySelector('.popup__image-title');
    }
     openFullImage ({ name, link })  {
        console.log('hello');
        this._popupImg.src = link;
        this._popupImg.alt = name;
 
        this._popupText.textContent = name;
    
        super.openPopup();
      };
}
