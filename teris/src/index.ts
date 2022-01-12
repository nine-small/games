import { Game } from "./core/viewer/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'
import { Direction } from "./core/Types";
import { TerisRule } from "./core/TerisRule";


const g = new Game(new GamePageViewer())
// g.start();


// // 小方块组合类
// const squares = createTeris({x:3,y:2})
// //  小方块的展示
// squares.squares.forEach(ele=>{
//     ele.viewer = new SquarePageViewer(ele,$("#root"))
//     ele.viewer.show()
// })

$('#left').click(()=>{
    g.leftMove()
})
$('#right').click(()=>{
    g.rightMove()
})
$('#up').click(()=>{
  g.rotate()
})
$('#down').click(()=>{
    g.bottomMove()
})
$("#start").on("click",()=>{
    g.start()
})

$("#pause").on("click",()=>{
    g.pause()
})