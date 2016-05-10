module PhlappyBird {
    export class Game extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);
            this.state.add('MainMenu', MainMenu, false);
            this.state.start('MainMenu');

        }
    }
}