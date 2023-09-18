export class Popup {
    constructor (selector) {
        this._selector = selector;
    }

    openPopup() {
        this._selector.classList.add("popup_opened");
        document.addEventListener("keyup", this._closeByEscape);
      };

    closePopup () {
      this._selector.classList.remove("popup_opened");
      document.removeEventListener("keyup", this._closeByEscape);
      };

    _closeByEscape = (e) => {
        if (e.key === "Escape") {
          if (activePopup !== null) closePopup(activePopup);
        }
      };
     
      setEventListeners(){
        document.addEventListener('mousedown', (evt)=>{
            if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains('popup__close') ) {
                console.log('correct click');
                this.closePopup();
              }else{
                console.log('incorrect click');

              }
        } )
      }
      
   
      
    //   const openFullImage = ({ name, link }) => {
    //     popupImg.src = link;
    //     popupImg.alt = name;
    //     popupDesc.textContent = name;
      
    //     openPopup(popupFullImage);
    //   };
}

