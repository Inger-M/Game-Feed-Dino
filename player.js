class Player {
    constructor (gameInstance) {
      this.game = gameInstance;
      this.x = 300;
      this.y = 150;
      this.width = 25;
      this.height = 25;
    }
  
    draw () {
      this.game.context.save();
      // In a method of the game class,
      // "this" refers to the instance
      // of the game class on which
      // the method is being called
      this.game.context.fillStyle = 'blue';
      // Draw a blue square on the canvas
      this.game.context.fillRect(this.x, this.y, this.width, this.height);
      this.game.context.restore();
    }
  }
  