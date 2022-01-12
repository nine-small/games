import $ from 'jquery';
import gameconfig from '../gameconfig';
import { SquareGroup } from '../SquareGroup';
import { GameStatus, GameViewer } from '../Types';
import { Game } from './Game';
import pageconfig from './pageconfig';
import { SquarePageViewer } from './SquarePageViewer';

export class GamePageViewer implements GameViewer{
    showScore(score:number): void {
        $("#i-score").text(score + "分")
    }
    
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(ele=>{
            ele.viewer = new SquarePageViewer(ele,$("#next-teris")) 
        })
    }
    switch(teris: SquareGroup): void {
        teris.squares.forEach(ele=>{
            ele.viewer?.hidden();
            ele.viewer = new SquarePageViewer(ele,$("#root"));
        })
    }
    /**
     * 初始化游戏界面
     */
    init(g:Game){
        $("#root").css({
            width:pageconfig.SquareViewer.size * gameconfig.panelSize.width,
            height:pageconfig.SquareViewer.size * gameconfig.panelSize.height,
            border: '1px solid #eee',
            backgroundColor: 'black',
            position: 'relative'
        })
        $("#next").css({
            width: pageconfig.SquareViewer.size * gameconfig.nextSize.size + 40,
            height: pageconfig.SquareViewer.size * gameconfig.panelSize.height,
            border:"1px solid #eee",
            position: "relative",
            padding:'20px 20px',
            boxSizing:"border-box"
        })
        $("#score").css({
            position: 'absolute',
            bottom:'100px',
            left: '20px',
            fontSize: '20px',
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
            'align-items': 'center'
        })
        $(document).on('keydown',(e)=>{
            if(e.keyCode === 13){
                // 游戏重新开始
                g.resetGame()
            }else if(e.keyCode === 32){
                if(g.gameStatus === GameStatus.playing){
                    g.pause()
                }else{
                    g.start()
                }
            }else if(e.keyCode === 37){
                g.leftMove()
            }else if(e.keyCode === 38){
                g.rotate()
            }else if(e.keyCode === 39){
                g.rightMove()
            }else if(e.keyCode === 40){
                g.bottomMove()
            }
        })
    }





}