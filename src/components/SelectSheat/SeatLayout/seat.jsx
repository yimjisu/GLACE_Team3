import { Point } from "./point";

const INITIAL_SIZE = 20;
const INITIAL_INTERVAL = 30;
const START_X = 17;
const START_Y = 11;
const ZOOM_INDEX = 0.001;
export class Seat {

    constructor(x, y, color) {
        this.pos = new Point(x, y);
        this.startPos = new Point(START_X, START_Y);
        this.indexPos = new Point (
            Math.round((x - START_X) / INITIAL_INTERVAL),
            Math.round((y - START_Y) / INITIAL_INTERVAL));
        this.interval = INITIAL_INTERVAL;
        
        // PANNING
        this.movePos = this.pos.clone();
        this.downPos = new Point();
        this.downStartPos = new Point();
        
        this.isSelected = false;
        this.color = color;
        this.size = INITIAL_SIZE;
        this.opacity = 0.3;
        this.zoomIndex = 1;        
    }

    animate(ctx) {          
        const move = this.movePos.clone().subtract(this.pos);
        this.pos = this.pos.add(move);

        ctx.beginPath();
        if (this.isSelected) {
            this.opacity = 1;
        } else {
            this.opacity = 0.3;
        }

        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        ctx.fillRect(this.pos.x, this.pos.y,
            this.size, this.size);

        ctx.fillStyle = "#3e3e3e";
        ctx.font = "12px serif";
        if (this.indexPos.x == 0){
            console.log('here?')
            ctx.fillText(
                String.fromCharCode(this.indexPos.y+65), 
                this.pos.x - this.interval/2, 
                this.pos.y + this.size/2);
        }
        if (this.indexPos.y == 0){
            ctx.fillText(
                this.indexPos.x+1, 
                this.pos.x+this.size/4, 
                this.pos.y-this.interval/2);
        }
    }

    down(point) {
        this.isDown = true;
        this.downPos = point.clone();
        this.downStartPos = this.pos.clone();
    }

    move(point) {
        if (this.isDown) {
            this.movePos =
                this.downStartPos.clone().add(point).subtract(this.downPos);
            this.startPos.add(this.movePos.clone().subtract(this.pos));
        }
    }

    up() {
        this.isDown = false;
    }

    zoom(deltaPoint) {
        let index = Math.sqrt(deltaPoint.x**2 + deltaPoint.y**2) * ZOOM_INDEX;
        if (deltaPoint.y > 0) {
            this.zoomIndex -= index;
            this.zoomIndex = Math.max(this.zoomIndex, 0.2);
        } else{
            this.zoomIndex += index;            
            this.zoomIndex = Math.min(this.zoomIndex, 5);
        }

        this.size = INITIAL_SIZE * this.zoomIndex;
        this.interval = INITIAL_INTERVAL * this.zoomIndex;
        
        this.intervalPos = this.indexPos.clone().multiply(this.interval);
        this.pos = this.startPos.clone().add(this.intervalPos);
        this.movePos = this.pos.clone();
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