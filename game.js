class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.score = 100;
    this.player = new Player(this);
    this.enemies = [];
    this.spells = [];
    this.enableControls();
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      switch (code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'Space':
          this.fireSpell();
          break;
      }
    });
  }

  generateEnemy() {
    const enemySpeed = Math.random() + 0.5;
    const enemyX = this.canvas.width;
    const enemyY = Math.random() * this.canvas.height - 75;
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }

  runLogic() {
    if (Math.random() < 0.01) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      // If enemy and player are intersecting,
      // remove enemy from array of enemies
      const enemyAndPlayerAreIntersecting = enemy.checkIntersection(
        this.player
      );
      const enemyIsOutOfBounds = enemy.x + enemy.width < 0;
      if (enemyAndPlayerAreIntersecting || enemyIsOutOfBounds) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        this.score -= 10;
      }
    }

    for (const spell of this.spells) {
      spell.runLogic();
      for (const enemy of this.enemies) {
        // If enemy and spell are intersecting,
        // remove enemy from array of enemies
        // and remove spell from array of spells
        const spellAndEnemyAreIntersecting = enemy.checkIntersection(spell);
        if (spellAndEnemyAreIntersecting) {
          const indexOfEnemy = this.enemies.indexOf(enemy);
          this.enemies.splice(indexOfEnemy, 1);
          const indexOfSpell = this.spells.indexOf(spell);
          this.spells.splice(indexOfSpell, 1);
          this.score += 5;
        }
      }
      if (spell.x - spell.width > this.canvas.width) {
        const indexOfSpell = this.spells.indexOf(spell);
        this.spells.splice(indexOfSpell, 1);
      }
    }
  }

  drawScore() {
    this.context.font = '48px monospace';
    this.context.fillText(`Score: ${this.score}`, 150, 450);
  }

  draw() {
    this.context.clearRect(0, 0, 500, 500);
    for (const enemy of this.enemies) {
      enemy.draw();
    }
    for (const spell of this.spells) {
      spell.draw();
    }
    this.player.draw();
    this.drawScore();
  }
}
