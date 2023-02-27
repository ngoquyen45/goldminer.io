class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    
    clone() {
      return new Point(this.x, this.y)
    }
    
    set(x, y) {
      this.x = x;
      this.y = y;
    }
    
    lineTo(p) {
      line(this.x, this.y, p.x, p.y);
    }
    
    scale(k) {
      return new Point(k * this.x, k * this.y);
    }
    
    add(p) {
      return new Point(this.x + p.x, this.y + p.y);
    }
    
    subtract(p) {
      return new Point(this.x - p.x, this.y - p.y);
    }
    
    middle(p) {
      return new Point((this.x + p.x) / 2, (this.y + p.y) / 2)
    }
    
    inverse(p) {
      return scale(-1)
    }
    
    rotate(center, angle) { // quay nguoc kim dong ho
      angle += Math.PI / 2
      // Step 1: Translate to origin
      let translatedX = this.x - center.x;
      let translatedY = this.y - center.y;
  
      // Step 2: Rotate
      let cosA = cos(angle);
      let sinA = sin(angle);
      let rotatedX = translatedX * cosA - translatedY * sinA;
      let rotatedY = translatedX * sinA + translatedY * cosA;
  
      // Step 3: Translate back
      this.x = rotatedX + center.x;
      this.y = rotatedY + center.y;
  
      return this;
    }
    static getAngle(p1, p2) {
      let angle1 = Math.atan2(p1.y, p1.x);
      let angle2 = Math.atan2(p2.y, p2.x);
      return Math.abs(angle2 - angle1);
    }
  }