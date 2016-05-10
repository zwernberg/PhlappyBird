module PhlappyBird {
    export class MainMenu extends Phaser.State {
        bird: Phaser.Sprite;
        pipes: Phaser.Group;
        timer: Phaser.TimerEvent;
        score: number;
        highscore: number;
        labelScore: Phaser.Text;
        labelHighScore: Phaser.Text;

        preload() {
            this.game.load.image('bird', 'assets/bird.png');
            this.game.load.image('pipe', 'assets/pipe.png');
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#71c5cf';
            this.score = 0;
            this.highscore = this.getHighscore();
            this.labelScore = this.game.add.text(20, 20, "Score: " + this.score + "\nBest: " + this.highscore,
                { font: "30px Arial", fill: "#ffffff" });

            this.pipes = this.game.add.group();

            this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

            this.bird = this.game.add.sprite(100, 255, 'bird', 0);
            this.game.physics.enable(this.bird);
            this.bird.body.gravity.y = 1000;
            this.game.input.onDown.add(this.jump, this);
            var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);
        }

        update() {
            if (this.bird.y < 0 || this.bird.y > 490)
                this.restartGame();

            this.game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        }

        jump() {
            console.log("here");
            this.bird.body.velocity.y = -350;
        }

        addPipe(x, y) {
            var pipe = this.game.add.sprite(x, y, 'pipe');
            this.pipes.add(pipe)
            this.game.physics.arcade.enable(pipe);
            pipe.body.velocity.x = -200;
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        }

        addRowOfPipes() {
            var hole = (Math.floor(Math.random() * 5) + 1);
            this.updateScore();
            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1 && i != hole - 1) {
                    this.addPipe(400, i * 60 + 10);
                }
            }
        }

        restartGame() {
            localStorage.setItem("Highscore", String(Math.max(this.score, this.highscore)));
            this.game.state.start('MainMenu');
        }

        updateScore(): void {
            this.score += 1;
            this.labelScore.text = "Score: " + this.score + "\nBest: " + this.highscore;
        }

        getHighscore(): number {
            return localStorage.getItem("Highscore") == null ? 0 : localStorage.getItem("Highscore");
        }
    }
}