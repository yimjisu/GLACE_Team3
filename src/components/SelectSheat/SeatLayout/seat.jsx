import { Point } from "./point";

const INITIAL_SIZE = 20;
const INITIAL_INTERVAL = 30;
const START_X = 17;
const START_Y = 251;
export class Seat {

    constructor(x, y, color) {
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
        this.size = INITIAL_SIZE;
        this.opacity = 0.5;
        this.zooming = 1;
        this.indexX = Math.round((x - START_X) / INITIAL_INTERVAL);
        this.indexY = Math.round((y - START_Y) / INITIAL_INTERVAL);
        this.interval = INITIAL_INTERVAL;
        this.targetZoom = new Point();
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
            this.size, this.size);
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

    zoom(deltaPoint) {
        let index = Math.sqrt(deltaPoint.x**2 + deltaPoint.y**2) * 0.01;
        
        if (deltaPoint.y > 0) {
            this.zooming -= index;
            if (this.zooming < 0.2){
                this.zooming = 0.2;
            }
        } else{
            this.zooming += index;
            if (this.zooming > 5){
                this.zooming = 5;
            }
        }

        this.size = INITIAL_SIZE * this.zooming;
        this.interval = INITIAL_INTERVAL * (this.zooming - 1);
        this.targetZoom = new Point(this.indexX * this.interval, this.indexY * this.interval);
    }

    click(point) {
        if (point.collide(this.pos, this.size, this.size)) {
            this.isSelected = !this.isSelected;    
            return this;
        } else {
            return null;
        }
    }
}