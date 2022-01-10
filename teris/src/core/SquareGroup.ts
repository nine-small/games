import gameconfig from "./gameconfig";
import { Square } from "./Square";
import { TerisRule } from "./TerisRule";
import { Point, Shape } from "./Types";

// 小方块的组合类接受三个参数，形状的数组，中心点的逻辑位置，颜色
export class SquareGroup {
  private _squares: readonly Square[] = [];
  // 外界可以或者装有小方块的数组
  public get squares() {
    return this._squares;
  }
  // 获取中心点的逻辑坐标
  public get centerPoint() {
    return this._centerPoint;
  }
  // 外界可以获得形状
  public get shape() {
    return this._shape;
  }

  // 修改形状
  public set shape(v) {
    this._shape = v;
    this.setSquarePoints(this.centerPoint);
  }

  // 修改squares中小方块的坐标。
  private setSquarePoints(centerPoint: Point) {
    this._shape.forEach((ele, i) => {
      this._squares[i].point = {
        x: centerPoint.x + ele.x,
        y: centerPoint.y + ele.y,
      };
    });
  }

  // 当中心点的位置改变的时候，小方块类中的所有点的位置也需要改变
  public set centerPoint(v) {
    this._centerPoint = v;
    this.setSquarePoints(v);
  }
  constructor(
    private _shape: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    const arr: Square[] = [];
    _shape.forEach((ele) => {
      let sq = new Square();
      sq.point = {
        x: ele.x + _centerPoint.x,
        y: ele.y + _centerPoint.y,
      };
      sq.color = _color;
      arr.push(sq);
    });
    this._squares = arr;
  }
  protected _isClock = true;
  public afterRotateShape(): Shape {
    if (this._isClock) {
      return this._shape.map((p) => ({
        x: -p.y,
        y: p.x,
      }));
    }
    return this.shape.map((p) => ({
      x: p.y,
      y: -p.x,
    }));
  }

  public rotate() {
    if (TerisRule.isRotate(this)) {
      this.shape = this.afterRotateShape();
    }
  }
}
