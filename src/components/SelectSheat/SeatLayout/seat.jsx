import { Point } from "./point";
import { socket } from "../../../service/socket";

const ZOOM_INDEX = 0.001;
export class Seat {

    constructor(lefttop, size, color, seatName) {
        this.pos = new Point(lefttop.x, lefttop.y);
        this.width = size.width;
        this.height = size.height;
        this.fontSize = 7;
        
        this.startPos = new Point(0, 20);
        this.finalPos = new Point(lefttop.x, lefttop.y);
        this.finalWidth = size.width;
        this.finalHeight = size.height;
        this.finalFontSize = 7;
        
        // PANNING
        this.movePos = this.startPos.clone();
        this.downStartPos = new Point();
        this.downSeatPos = new Point();
        
        this.seatName = seatName;
        this.isSelected = false;
        this.color = color;
        this.opacity = 0.3;
        this.zoomIndex = 1;     

        this.isMove = false;
        this.isReserved = false;
    }

    animate(ctx) {          
        const move = this.movePos.clone().subtract(this.startPos);
        this.startPos = this.startPos.add(move);
        
        ctx.beginPath();
        if (this.isSelected) {
            this.opacity = 1;
        } else if (this.isReserved ) {
            this.opacity = 0.5;
        } else {
            this.opacity = 0.3;
        }

        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        this.finalPos = this.startPos.clone().add(this.pos.clone().multiply(this.zoomIndex));
        this.finalWidth = this.width * this.zoomIndex;
        this.finalHeight = this.height * this.zoomIndex;
        this.finalFontSize = this.fontSize * this.zoomIndex;
        ctx.clearRect(this.finalPos.x, this.finalPos.y,
            this.finalWidth, this.finalHeight);
        ctx.fillRect(this.finalPos.x, this.finalPos.y,
            this.finalWidth, this.finalHeight);

        ctx.globalAlpha = 1;   
        if (!this.isSelected){
            ctx.fillStyle = "#3e3e3e";
        } else {
            ctx.fillStyle = "#FFFFFF";
        }
        ctx.font = this.finalFontSize+"px sans-serif";
        let fontWidth = ctx.measureText(this.seatName).width;
        ctx.fillText(
            this.seatName, 
            this.finalPos.x + (this.finalWidth - fontWidth) /2, 
            this.finalPos.y + this.finalHeight / 1.5);
        
        if(this.isReserved) {
            ctx.fillStyle = "#3e3e3e";
            ctx.beginPath();
            ctx.moveTo(this.finalPos.x + this.finalWidth * 0.1, 
                this.finalPos.y + this.finalHeight * 0.1);
            ctx.lineTo(this.finalPos.x+this.finalWidth * 0.9,
                this.finalPos.y + this.finalHeight * 0.9);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(this.finalPos.x+this.finalWidth* 0.9, 
                this.finalPos.y + this.finalHeight * 0.1);
            ctx.lineTo(this.finalPos.x + this.finalWidth * 0.1
                , this.finalPos.y + this.finalHeight * 0.9);
            ctx.closePath();
            ctx.stroke();
        }
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
            point.collide(this.finalPos,
                this.finalWidth, this.finalHeight)) {
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
    }

    reserved(state) {
        this.isReserved = state;
    }
}