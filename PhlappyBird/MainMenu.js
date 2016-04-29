var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PhlappyBird;
(function (PhlappyBird) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.game.load.image('bird', 'assets/bird.png');
        };
        MainMenu.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#71c5cf';
            this.bird = this.game.add.sprite(100, 255, 'bird', 0);
            this.game.physics.enable(this.bird);
            this.bird.body.gravity.y = 500;
            var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);
        };
        MainMenu.prototype.update = function () {
            if (this.bird.y < 0 || this.bird.y > 490)
                this.restartGame();
        };
        MainMenu.prototype.jump = function () {
            console.log("here");
            this.bird.body.velocity.y = -400;
        };
        MainMenu.prototype.restartGame = function () {
            this.game.state.start('MainMenu');
        };
        return MainMenu;
    })(Phaser.State);
    PhlappyBird.MainMenu = MainMenu;
})(PhlappyBird || (PhlappyBird = {}));
//# sourceMappingURL=MainMenu.js.map