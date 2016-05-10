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
