// 小方块类的数据处理。小方块拥有的属性为坐标和颜色。

import { IViewer, Point } from "./Types";

// 全部属性私有化，利用set get进行包装
export class Square {
  private _point: Point = {
    x: 0,
    y: 0,
  };
  private _color: string = "black";
  // 可选参数
  private _viewer? : IViewer;
  // 坐标
  public set point(v) {
    this._point = v;
    // 当坐标数据被修改时，需要做一些事。
    if(this.viewer){
        this.viewer.show()
    }
  }

  public get point() {
    return this._point;
  }
  // 颜色的查看和赋值
  public set color(v) {
    this._color = v;
  }

  public get color() {
    return this._color;
  }

  // 显示者的查看和赋值。
  public set viewer(v){
      this._viewer = v;
      this._viewer?.show()
  }

  public get viewer(){
      return this._viewer
  }

}
