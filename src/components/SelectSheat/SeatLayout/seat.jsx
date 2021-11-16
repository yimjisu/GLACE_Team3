import { Point } from "./point";

const INTERVAL = 10;
export class Seat {

    constructor() {
        this.pos = new Point();
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.startPos = new Point();
        this.mousePos = new Point();
        this.origin = new Point();
        this.isDown = false;
        this.isSelected = false;
        this.isAble = true;
    }

    resize(x, y, row, column, stageWidth, stageHeight) {
        this.pos.x = 
            x / row * (stageWidth - INTERVAL) + INTERVAL;
        this.pos.y =
            y / column * (stageHeight - INTERVAL) + INTERVAL;
        this.width =
            (stageWidth - INTERVAL) / row - INTERVAL;
        this.height =
            (stageHeight - INTERVAL) / column - INTERVAL;
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    animate(ctx) {
        ctx.beginPath();
        if (this.isSelected) {
            ctx.fillStyle = "#4463fd";
        } else if(this.isAble){
            ctx.fillStyle = "#3E3E3E";
        } else {
            ctx.fillStyle = "#C4C4C4";
        }
        ctx.fillRect(this.pos.x, this.pos.y,
            this.width, this.height);
    }

    down(point) {
        if (point.collide(this.pos, this.width, this.height)) {
            this.isDown = true;
        }
    }
}