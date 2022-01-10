
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void;
  /**
   * 移除，不再显示
   */
  hidden(): void;
}

export type Shape =  Point[]

/**
 * 左右下
 */

export enum Direction {
  left,
  right,
  down
}
