import { SquareGroup } from "./SquareGroup";
import { Game } from "./viewer/Game";

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
/**
 * init 未开始
 * playing 游戏中
 * pause 暂停
 * over 游戏结束
 */
export enum GameStatus {
  /**
   * 未开始
   */
  init,
  /**
   * 游戏中
   */
  playing,
  /**
   * 暂停
   */
  pause,
  /**
   * 游戏结束
   */
  over
}

export interface GameViewer {
  showNext(teris:SquareGroup):void
  switch(teris:SquareGroup):void
  showScore(score:number):void
  init(g:Game):void
}