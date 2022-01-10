// 预定义一些形状

import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./Types";
import { Random } from "./utils";

export class TShpae extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}
export class LShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -2, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}
export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: -1 },
      ],
      _centerPoint,
      _color
    );
  }
}
export class SShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  public rotate(): void {
    super.rotate()
    this._isClock = !this._isClock
  }
}
export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  public rotate(): void {
      super.rotate()
      this._isClock = !this._isClock;
  }
}
export class SquareShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ],
      _centerPoint,
      _color
    );
  }
  public afterRotateShape(): Shape {
      return this.shape
  }
}
export class LineShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    super(
      [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      _centerPoint,
      _color
    );
  }
  public rotate(){
    super.rotate()
    this._isClock = !this._isClock
  }
}



// 形状数组
export const ShapeArrs = [
  TShpae,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape,
];
// 颜色数组
export const colors = [
  "#008C8C",
  "red",
  "blue",
  "green",
  "#f40",
  "yellow",
  "yellowgreen",
];

// 生成一个小方块组类
export function createTeris(centerPoint: Point) {
  const shapeIndex = Random(0, ShapeArrs.length);
  const colorIndex = Random(0, colors.length);
  const color = colors[colorIndex];
  return new ShapeArrs[shapeIndex]( centerPoint, color);
}
