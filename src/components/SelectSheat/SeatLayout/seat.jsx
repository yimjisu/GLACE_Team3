import { Point } from "./point";

const INTERVAL = 10;
const FOLLOW_SPEED = 0.08;
export class Seat {

    constructor(x, y, color, height, width) {
        this.pos = new Point(x, y);
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.startPos = new Point();
        this.mousePos = new Point();
        this.origin = new Point();
        this.isSelected = false;
        this.isAble = true;
        this.color = color;
        this.height = 20;
        this.width = 20;
        this.opacity = 0.5;
    }

    resize(){
    // resize(row, column, stageWidth, stageHeight) {
        // this.pos.x = 
        //     x / row * (stageWidth - INTERVAL) + INTERVAL;
        // this.pos.y =
        //     y / column * (stageHeight - INTERVAL) + INTERVAL;
        // this.width =
        //     (stageWidth - INTERVAL) / row - INTERVAL;
        // this.height =
        //     (stageHeight - INTERVAL) / column - INTERVAL;
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    animate(ctx) {
        const move = this.target.clone().subtract(this.pos);//.reduce(FOLLOW_SPEED);
        this.pos.add(move);

        ctx.beginPath();
        if (this.isSelected) {
            this.opacity = 1;
        } else {
            this.opacity = 0.5;
        }
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        ctx.fillRect(this.pos.x, this.pos.y,
            this.width, this.height);
    }

    down(point) {
        this.isDown = true;
        this.downPos = point.clone();
        this.startPos = this.pos.clone();
        this.mousePos = point.clone().subtract(this.pos);
    }

    move(point) {
        if (this.isDown) {
            this.target =
                this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up() {
        this.isDown = false;
    }

    click(point) {
        if (point.collide(this.pos, this.width, this.height)) {
            this.isSelected = !this.isSelected;            
            return this;
        } else {
            return null;
        }
    }
}