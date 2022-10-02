let pad_left;
let pad_right;
let ball;
let left_score;
let right_score;

class MainScene extends Phaser.Scene {
    constructor(){
        super('gameScene'); 
    } 

    preload(){

    	/* texture */ 
            let rect2 = this.make.graphics().fillStyle(0xFFFFFF).fillRect(0, 0, 25, 130);
            rect2.generateTexture('vertical-line', 25, 130);

            let ball_texture = this.make.graphics().fillStyle(0xFFFFFF).fillRect(0, 0, 25, 25);
            ball_texture.generateTexture('ball', 25, 25);

            let line = this.make.graphics().fillStyle(0xFFFFFF).fillRect(0, 0, 5, 15);
            line.generateTexture('line', 5, 15);
        /* -- - */

        let width = this.cameras.main.width; 
        let height = this.cameras.main.height; 
    }
 
    create(){
    	/* Backgrund */
		this.physics.add.group({
            key: 'line',
            repeat: 30, 
            setXY: { x:400, y: 0, stepY: 20}
        });
    	/* --- */

    	//  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(false, false, true, true);

        /* Pads */ 
	    	pad_left = this.physics.add.image(30, 300, 'vertical-line');
	    	pad_left.setCollideWorldBounds(true);
	    	pad_left.setImmovable(true);
	    	pad_left.setData('Score', 0);

	    	pad_right = this.physics.add.image(770, 300, 'vertical-line');
	    	pad_right.setCollideWorldBounds(true);
	    	pad_right.setImmovable(true);
	    	pad_right.setData('Score', 0);
        /* --- */ 

        /* Ball */
	    	ball = this.physics.add.image(400, 300, 'ball').setBounce(1);
	    	ball.setCollideWorldBounds(true);
	    	ball.setVelocity(75, -250);
        /* --- */

        /* Score Text */
        	left_score = this.add.text(55, 35, 'Score: 0', { font: '32px Courier', fill: '#00ff00' });
        	right_score = this.add.text(600, 35, 'Score: 0', { font: '32px Courier', fill: '#00ff00' });
        /* --- */

        /* Colitons */
	    	this.physics.add.collider(pad_left, ball);
	    	this.physics.add.collider(pad_right, ball);
        /* --- */
    }

    resetBall (){
    }

    update(){
    	/* player 1 */
        var scanner = this.input.keyboard.createCursorKeys();

        if (scanner.left.isDown){
            pad_left.setVelocityY(-160);
        }else if (scanner.right.isDown){
            pad_left.setVelocityY(160);
        }else {
            pad_left.setVelocityY(0);
        }
        /* --- */

        /* player 2 */
        let KeyLeft = this.input.keyboard.addKey('A');
        let KeyRight = this.input.keyboard.addKey('D');

        if (KeyLeft.isDown){
            pad_right.setVelocityY(-200);
        }else if (KeyRight.isDown){
            pad_right.setVelocityY(200);
        }else {
            pad_right.setVelocityY(0);
        }
        /* --- */

        /* Loose */
    	if (ball.x < 0 || ball.x > 800) {
    		resetGame(); 
    	}
    	/* --- */

    	function resetGame (){
    		if (ball.x < 0) {
    			pad_right.setData('Score', pad_right.getData('Score') + 1); 
    			right_score.setText("Score: "+pad_right.getData('Score'));
    			ball.setPosition(400, 300);
    			ball.setVelocity(75, -250);
    		}

    		if (ball.x > 800){
    			pad_left.setData('Score', pad_left.getData('Score') + 1); 
    			left_score.setText("Score: "+pad_left.getData('Score'));
    			ball.setPosition(400, 300);
    			ball.setVelocity(-75, -250);	
    		}
    	}
    }
}

// Configuracion general
const config = {
    // Phaser.AUTO, intenta usa WebGL y si el navegador no lo tiene, usa canva.
    type: Phaser.AUTO, 
    parent: 'game-container',
    width: 800,
    height: 600,
    scene: [MainScene],
    scale: {
        // mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
        	// debug: true
        }
    }
}

/* Configuracion de gravedad para plataformas */
// physics: {
//     default: 'arcade',
//     arcade: {
//         gravity: { y: 500 }
//     }
// }
/* --- */

// Inicializacion del objeto
game = new Phaser.Game(config)