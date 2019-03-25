'use strict';

class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    divCreate() {
        let div = document.createElement('div'),       
            text = document.createTextNode('Some text');
       // div.style.cssText = 'height:' + this.height ; 'width:' + this.width ; 'background-color:' + this.bg ; 'ont-size:' + this.fontSize ; 'text-align:' + this.textAlign;
       div.style.cssText = `height: ${this.height}; width: ${this.width}; background-color: ${this.bg}; font-size: ${this.fontSize}; text-align: ${this.textAlign}`;
        document.body.appendChild(div);
        div.appendChild(text);
        
        
        
        
    }
}

let square = new Options('145px', '145px', 'Yellow', '14px', 'center');
let sq1 = new Options('225px', '225px', 'red', '20px', 'left');


square.divCreate();
sq1.divCreate();