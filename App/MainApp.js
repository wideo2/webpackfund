import $ from 'jquery';
import Fund from './Fund';

export default class MainApp {
    constructor(){
        this.sectionList = $("section");

        this.fundDatas = [
            {title:"시험펀드1", desc:"펀드에 대한 설명 1", percent: 43},
            {title:"시험펀드2", desc:"펀드에 대한 설명 2", percent: 76},
            {title:"시험펀드3", desc:"펀드에 대한 설명 3", percent: 45},
            {title:"시험펀드4", desc:"펀드에 대한 설명 4", percent: 89},
            {title:"시험펀드5", desc:"펀드에 대한 설명 5", percent: 92}
        ]
        //5개의 펀드를 표시할 영역을 가져온다.
        this.topFundSection = $(".top-fund-list");
        this.topFundList = [];

        this.fundDatas.forEach( x => {
            let fundBox = $(`<div class="fund-box"></div>`)
                            .appendTo(this.topFundSection);
            
            this.topFundList.push(new Fund(fundBox, x));
        });


        this.eventHandle();
        this.resize();
    }

    eventHandle(){
        $(window).on("resize", e=> this.resize() );
    }

    resize() {
        this.sectionList.height(window.innerHeight);
        this.topFundList.forEach(x => x.resize());
    }
}