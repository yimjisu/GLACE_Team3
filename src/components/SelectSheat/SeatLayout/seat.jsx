import { Point } from "./point";

const INITIAL_SIZE = 20;
const INITIAL_INTERVAL = 30;
const ZOOM_INDEX = 0.001;
export class Seat {

    constructor(lefttop, size, color) {
        this.pos = new Point(lefttop.x, lefttop.y);
        this.startPos = new Point();
        
        // PANNING
        this.movePos = this.startPos.clone();
        this.downStartPos = new Point();
        this.downSeatPos = new Point();
        
        this.isSelected = false;
        this.color = color;
        this.width = size.width;
        this.height = size.height;
        this.opacity = 0.3;
        this.zoomIndex = 1;     

        this.isMove = false;
    }

    animate(ctx) {          
        const move = this.movePos.clone().subtract(this.startPos);
        this.startPos = this.startPos.add(move);
        
        ctx.beginPath();
        if (this.isSelected) {
            this.opacity = 1;
        } else {
            this.opacity = 0.3;
        }

        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        
        ctx.fillRect(
            this.startPos.x + this.pos.x * this.zoomIndex, 
            this.startPos.y + this.pos.y * this.zoomIndex,
            this.width * this.zoomIndex,
            this.height * this.zoomIndex);

        ctx.globalAlpha = 1;   
        ctx.fillStyle = "#3e3e3e";
        ctx.font = "12px";
        // if (this.indexPos.x == 0){
        //     console.log('here?')
        //     ctx.fillText(
        //         String.fromCharCode(this.indexPos.y+65), 
        //         this.pos.x - this.interval/2, 
        //         this.pos.y + this.size/2);
        // }
        // if (this.indexPos.y == 0){
        //     ctx.fillText(
        //         this.indexPos.x+1, 
        //         this.pos.x+this.size/4, 
        //         this.pos.y-this.interval/2);
        // }
    }

    down(point) {
        this.isDown = true;
        this.downPos = point.clone();
        this.downStartPos = this.startPos.clone();
    }

    move(point) {
        if (this.isDown) {
            this.movePos =
            this.downStartPos.clone().add(point).subtract(this.downPos);
            this.isMove = true;
        }
    }

    up(point) {
        this.isDown = false;
        if (!this.isMove &&
            point.collide(this.startPos.x + this.pos.x * this.zoomIndex, 
                this.startPos.y + this.pos.y * this.zoomIndex,
                this.width * this.zoomIndex,
                this.height * this.zoomIndex)) {
            this.isSelected = !this.isSelected;    
            return this;
        } else {
            this.isMove = false;
            return null;
        }
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
        // this.size = INITIAL_SIZE * this.zoomIndex;
        // this.interval = INITIAL_INTERVAL * this.zoomIndex;
        
        // this.intervalPos = this.indexPos.clone().multiply(this.interval);
        // this.pos = this.startPos.clone().add(this.intervalPos);
        // this.movePos = this.pos.clone();
    }
}