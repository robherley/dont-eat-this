class TidePod {
   constructor() {
      this._elem = document.createElement('div');
      this._elem.className = 'tidepod';
      this._elem.innerHTML = 'howdy';
      document.body.appendChild(this._elem);
   }

   move({ x, y }) {
      console.log(this);
      this._elem.style.top = `${y}px`;
      this._elem.style.left = `${x}px`;
   }
}

window.onload = () => {
   const pod = new TidePod();
   document.body.addEventListener('mousemove', e => pod.move(e));
};
