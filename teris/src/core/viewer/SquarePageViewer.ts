import $ from "jquery";
import { Square } from "../Square";
import { IViewer } from "../Types";
import pageconfig from "./pageconfig";

/**
 * 显示一个小方块到页面。
 */
export class SquarePageViewer implements IViewer {
  constructor(private square: Square, private container: JQuery<HTMLElement>) {}
  private dom?: JQuery<HTMLElement>;
  private isRemove :boolean = false;
  show(): void {
    //   如果这个小方块已经被移除了，直接返回。
    if(this.isRemove) return;
    if (!this.dom) {
      this.dom = $("<div>").css({
        width: pageconfig.SquareViewer.size,
        height: pageconfig.SquareViewer.size,
        border: "1px solid #eee",
        boxSizing: "border-box",
        position: "absolute",
        backgroundColor: this.square.color, // 颜色值也应该在生成的时候就确定了,后续是可以改变的。
      });
    }
    // 当逻辑位置改变的时候，对应改变小方块在页面的位置
    this.dom
      .css({
        left: this.square.point.x * pageconfig.SquareViewer.size,
        top: this.square.point.y * pageconfig.SquareViewer.size,
      })
      .appendTo(this.container);
  }
  hidden(): void {
      !this.isRemove && this.dom!.remove()
  }
}

