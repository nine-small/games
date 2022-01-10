import $ from 'jquery'
import { createTeris } from "./core/Teris"
import { TerisRule } from './core/TerisRule'
import { Direction } from './core/Types'
import { SquarePageViewer } from "./core/viewer/SquarePageViewer"

// 小方块组合类
const squares = createTeris({x:3,y:2})
//  小方块的展示
squares.squares.forEach(ele=>{
    ele.viewer = new SquarePageViewer(ele,$("#root"))
    ele.viewer.show()
})

$('#left').click(()=>{
    TerisRule.moveDirectly(squares,Direction.left)
})
$('#right').click(()=>{
    TerisRule.moveDirectly(squares,Direction.right)
})
$('#up').click(()=>{
  squares.rotate()
})
$('#down').click(()=>{
    TerisRule.moveDirectly(squares,Direction.down)
})