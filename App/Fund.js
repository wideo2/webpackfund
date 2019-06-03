import $ from 'jquery';
const {PI, min} = Math;

export default class Fund {
    constructor(el, data){
        this.el = el;
        let template = this.makeTemplate(data);
        this.el.html(template);

        this.canvas = this.el[0].querySelector("canvas");
        this.title = this.el[0].querySelector(".fund-title");
        this.desc = this.el[0].querySelector(".description");

        this.ctx = this.canvas.getContext("2d");
        this.percent = data.percent;

        //this.draw(this.percent);
    }

    makeTemplate(data){
        return `<div class="fund">
                    <div class="graph-container">
                        <canvas></canvas>
                    </div>
                    <div class="info-box">
                        <h1 class="fund-title">${data.title}</h1>
                        <p class="description">${data.desc}</p>
                    </div>
                </div>`;
    }

    draw(p){
        const c = this.ctx;
        c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let r = min(x, y) - 10;

        c.fillStyle = "#ddd";
        c.arc(x, y, r, 0, 2 * PI);
        c.fill();

        c.fillStyle = "rgb(101, 171, 243)";
        // 100 : 2*PI = p : x
        c.beginPath();
        c.moveTo(x,y);
        c.arc(x, y, r, -PI / 2, -PI /2 + 2 * PI * p / 100);
        c.fill();

        c.fillStyle = "#fff";
        c.beginPath();
        c.arc(x, y, r - 25, 0, 2*PI);
        c.fill();

        c.fillStyle = "#555";
        c.font = "25px Arial";
        c.textBaseline = "middle";
        c.textAlign = "center";
        c.fillText(p + "%", x, y);
    }

    resize(){
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.draw(this.percent);
    }
}