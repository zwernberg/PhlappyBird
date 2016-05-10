module PhlappyBird {
    export class Game extends Phaser.Game {
        public highScore: Number;

        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);
            this.highScore = 0;
            this.state.add('MainMenu', MainMenu, false);
            this.state.start('MainMenu');
        }
    }
}