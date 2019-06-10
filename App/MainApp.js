import $ from 'jquery';
import Fund from './Fund';

export default class MainApp {
    constructor(){
        this.sectionList = $("section");
        this.currentSection = 0;
        this.isscroll = false;
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
        // $(window).on("wheel",e => this.scroll(e));
        window.addEventListener("wheel",e=> this.scroll(e));
    }
    scroll(e){
        let next = null;
        if(this.isscroll)return;
        this.isscroll = true;
        if(e.deltaY > 0){
            if(this.currentSection >= this.sectionList.length - 1)return;
            this.currentSection++;
            next = this.sectionList.eq(this.currentSection).offset().top;
        }else if(e.deltaY < 0){
            //스클롤이 올라가고 있음
            if(this.currentSection <= 0 )return;
            this.currentSection--;
            next = this.sectionList.eq(this.currentSection).offset().top;
       
        }
        if(next != null){
            $("html, body").stop().animate({"scrollTop":next},1500,"swing",()=>{
                this.isscroll = false;
                if(this.currentSection ==  1){
                    //펀드리스트 섹션으로 이동했음.
                    this.topFundList.forEach(x => x.animateDraw());
                }
            });
        }
        
    }
    resize() {
        this.sectionList.height(window.innerHeight);
        this.topFundList.forEach(x => x.resize());
    }
}