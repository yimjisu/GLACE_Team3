export class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    add(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }
    
    subtract(point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    }

    reduce(value) {
        this.x += value;
        this.y += value;
        return this;
    }

    multiply(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }


    collide(x, y, width, height) {
        if(this.x >= x &&
            this.x <= x + width &&
            this.y >= y &&
            this.y <= y + height) {
                return true;
        }else{
            return false;
        }
    }

    clone() {
        return new Point(this.x, this.y);
    }
}