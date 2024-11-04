
class bow {
    constructor(color, damageBow) {
      this.color = color;
      this.damageBow = damageBow;

      this.x = width / 2;
      this.y = height - 30;
      this.width = 60;
      this.height = 60;
      this.image = null;
    }
  

    loadImage(img) {
      this.image = img;
    }
  

    display() {
      if (this.image) {

        image(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      } else {

        fill(this.color);
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
      }
    }
  }
  

class arrow {
    constructor(color, damageDone, effect) {
      this.color = color;
      this.damageDone = damageDone;
      this.effect = effect;
    }
  }