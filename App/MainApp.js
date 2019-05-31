import $ from 'jquery';

export default class MainApp {
    constructor(){
        this.sectionList = $("section");
        this.eventHandle();
        this.resize();
    }

    eventHandle(){
        $(window).on("resize", e=> this.resize() );
    }

    resize() {
        this.sectionList.height(window.innerHeight);
    }
}