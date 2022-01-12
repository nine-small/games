import gameconfig from "./gameconfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Direction, Point, Shape } from "./Types";

function isPoint(obj: any): obj is Point {
  if (typeof obj.x === "undefined") {
    return false;
  }
  return true;
}

export class TerisRule {
  // 形状你得给我，目标点你得给我，我来给你判断是否能移动
  static canIMove(shape: Shape, targetPoint: Point, exicts: Square[]): boolean {
    // 假设已经移动到了目标点
    const targetGroup: Point[] = shape.map((ele) => ({
      x: ele.x + targetPoint.x,
      y: ele.y + targetPoint.y,
    }));
    // 任意一个点越界，则返回false
    if (
      targetGroup.some((ele) => {
        return (
          ele.x < 0 ||
          ele.y < 0 ||
          ele.x >= gameconfig.panelSize.width ||
          ele.y >= gameconfig.panelSize.height
        );
      })
    ) {
      return false;
    }
    // 还要判断是否有点存在已经打散的点的数组中。
    if (
      targetGroup.some((ele) =>
        exicts.some((item) => ele.x === item.point.x && ele.y === item.point.y)
      )
    ) {
      return false;
    }
    // 都没有越界，则说明可以移动
    return true;
  }
  // 移动，根据canIMove来移动。实际上就是改变数据，页面展示这个事viewer中的类已经做了
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | Direction,
    exicts: Square[]
  ): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(teris.shape, targetPointOrDirection, exicts)) {
        teris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetPointOrDirection;
      let targetPoint: Point;
      if (Direction.down === direction) {
        targetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1,
        };
      } else if (Direction.left === direction) {
        targetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y,
        };
      } else {
        targetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y,
        };
      }
      return this.move(teris, targetPoint, exicts);
    }
  }

  /**
   * 向着某个方向移动到底
   * @param teris SquareGroup
   * @param directive Direction
   * @param exicts Square[]
   */
  static moveDirectly(
    teris: SquareGroup,
    directive: Direction,
    exicts: Square[]
  ): void {
    while (this.move(teris, directive, exicts)) {}
  }

  /**
   * 旋转的判定
   * @param teris 
   * @param exicts 
   * @returns 
   */
  static isRotate(teris: SquareGroup,exicts:Square[]) {
    // 假设可以旋转
    const shape: Shape = teris.afterRotateShape();
    return this.canIMove(shape, teris.centerPoint, exicts);
  }

  /**
   * 重新设置中心点的位置,出现在中上方。
   * @param teris 
   * @param size 
   * @returns 
   */
  static resetCenterPoint(teris: SquareGroup, size: number):void {
    let x = Math.floor(size / 2);
    let y = 0;
    teris.centerPoint = {x,y}
    while (teris.squares.some((ele) => ele.point.y < 0)) {
      teris.centerPoint = {
        x,
        y: teris.centerPoint.y + 1,
      };
    }
  }
}
