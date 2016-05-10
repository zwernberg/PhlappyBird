/// <reference path="phaser.d.ts" />
window.onload = function () {
    var game = new PhlappyBird.Game();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhlappyBird;
(function (PhlappyBird) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);
            this.state.add('MainMenu', PhlappyBird.MainMenu, false);
            this.state.start('MainMenu');
        }
        return Game;
    })(Phaser.Game);
    PhlappyBird.Game = Game;
})(PhlappyBird || (PhlappyBird = {}));
var PhlappyBird;
(function (PhlappyBird) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.game.load.image('bird', 'assets/bird.png');
            this.game.load.image('pipe', 'assets/pipe.png');
        };
        MainMenu.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#71c5cf';
            this.score = 0;
            this.highscore = this.getHighscore();
            this.labelScore = this.game.add.text(20, 20, "Score: " + this.score + "\nBest: " + this.highscore, { font: "30px Arial", fill: "#ffffff" });
            this.pipes = this.game.add.group();
            this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
            this.bird = this.game.add.sprite(100, 255, 'bird', 0);
            this.game.physics.enable(this.bird);
            this.bird.body.gravity.y = 1000;
            this.game.input.onDown.add(this.jump, this);
            var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);
        };
        MainMenu.prototype.update = function () {
            if (this.bird.y < 0 || this.bird.y > 490)
                this.restartGame();
            this.game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        };
        MainMenu.prototype.jump = function () {
            console.log("here");
            this.bird.body.velocity.y = -350;
        };
        MainMenu.prototype.addPipe = function (x, y) {
            var pipe = this.game.add.sprite(x, y, 'pipe');
            this.pipes.add(pipe);
            this.game.physics.arcade.enable(pipe);
            pipe.body.velocity.x = -200;
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        };
        MainMenu.prototype.addRowOfPipes = function () {
            var hole = (Math.floor(Math.random() * 5) + 1);
            this.updateScore();
            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1 && i != hole - 1) {
                    this.addPipe(400, i * 60 + 10);
                }
            }
        };
        MainMenu.prototype.restartGame = function () {
            localStorage.setItem("Highscore", String(Math.max(this.score, this.highscore)));
            this.game.state.start('MainMenu');
        };
        MainMenu.prototype.updateScore = function () {
            this.score += 1;
            this.labelScore.text = "Score: " + this.score + "\nBest: " + this.highscore;
        };
        MainMenu.prototype.getHighscore = function () {
            return localStorage.getItem("Highscore") == null ? 0 : localStorage.getItem("Highscore");
        };
        return MainMenu;
    })(Phaser.State);
    PhlappyBird.MainMenu = MainMenu;
})(PhlappyBird || (PhlappyBird = {}));
