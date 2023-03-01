class Player {
    // alpha: Xac dinh vi tri cua nguoi choi tren dia cau
    constructor(alpha, avatar) {
      this.alpha = alpha
      this.sign = -1
      this.sign2 = 1
      this.angle = alpha
      this.length = minLength;
      this.isChainAnchored = false
      this.isChainHooked = false
      this.claw = new Point(0, 0)
      this.avatar = avatar
    }
    
    drawAnchor(center, pVector) {
      let beta = 0.14
      strokeWeight(1);
      let moveVertor = new Point(-50, -70).scale(beta)
      let A = new Point(20, 0).scale(beta).add(moveVertor).add(center);
      let B = new Point(0, 20).scale(beta).add(moveVertor).add(center);
      let C = new Point(50, 70).scale(beta).add(moveVertor).add(center);
      let D = new Point(100, 20).scale(beta).add(moveVertor).add(center);
      let E = new Point(80, 0).scale(beta).add(moveVertor).add(center);
  
      let alpha2 = Math.atan2(pVector.y, pVector.x)
      A = A.rotate(center, alpha2);
      B = B.rotate(center, alpha2);
      C = C.rotate(center, alpha2);
      D = D.rotate(center, alpha2);
      E = E.rotate(center, alpha2);
  
      A.lineTo(B);
      B.lineTo(C);
      C.lineTo(D);
      D.lineTo(E);
    }
    
  
    drawAvatar(pivot) {
      let p = pivot.subtract(centerPoint).scale((delta / 2.0) / R).add(pivot)
      imageMode(CENTER);
      image(this.avatar, p.x, p.y, delta, delta);
    }
  
    join() {
      fill(0, 0, 0);
      let pivot = new Point(width/ 2.0 - R * Math.sin(this.alpha), height/ 2.0 - R * Math.cos(this.alpha))
      this.drawAvatar(pivot);
  
  
      if (!this.isChainAnchored) { // Nếu chưa thả leo
        if (this.angle > Math.PI/ 2.0 + this.alpha)
          this.sign *= -1
        if (this.angle < -Math.PI/ 2.0 + this.alpha)
          this.sign *= -1
        this.angle = this.angle + this.sign * 0.008;
      }
  
      // Draw the pendulum
      this.claw.x = pivot.x + this.length * Math.sin(this.angle), 
      this.claw.y = pivot.y + this.length * Math.cos(this.angle)
      line(pivot.x, pivot.y, this.claw.x, this.claw.y);
      this.drawAnchor(this.claw, this.claw.subtract(pivot));
  
      if (this.isChainAnchored) {
        if (this.isChainHooked)
          this.sign2 = -1
        this.length = this.length + this.sign2;
        if (this.length >= maxLength) this.sign2 *= -1
        if (this.length <= minLength) {
          this.length = minLength
          this.isChainHooked = false
          this.isChainAnchored = false
          this.sign2 = 1
        }
      }
    }
  }