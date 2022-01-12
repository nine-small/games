import gameconfig from "../gameconfig";
import { Square } from "../Square";
import { SquareGroup } from "../SquareGroup";
import { createTeris } from "../Teris";
import { TerisRule } from "../TerisRule";
import { Direction, GameStatus, GameViewer } from "../Types";

// 控制游戏的整体数据
export class Game {
  // 游戏状态 init playing pause over
  private _gameStatus: GameStatus = GameStatus.init; // 初始化默认游戏为未开始状态
  // 玩家当前操作的小方块组合类实例
  private _curTeris?: SquareGroup; // 游戏还没有开始的时候，可能没有值。
  // 下一个小方块组合类实例
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 }); // 先随便写一个中心点位置，后续修改
  // 自由下落的timer
  private _timer?: number; // 默认值为undefined
  // 每多少时间下移一格，单位毫秒
  private _duration: number = 1000; // 默认1000ms，后期修改这个值，调整难度
  // 已经触底的小方块的数组
  private _exicts: Square[] = [];
  // 记分
  private _score: number = 0;

  // 操作私有属性
  public get curTeris() {
    return this._curTeris!;
  }
  public get gameStatus(){
    return this._gameStatus
  }
  // 定义一个显示者
  constructor(private _viewer: GameViewer) {
    this._viewer.init(this);
    TerisRule.resetCenterPoint(this._nextTeris, gameconfig.nextSize.size);
    this._viewer.showNext(this._nextTeris);
  }
  /**
   * 根据消除的行数计算分数
   *
   */
  private set score(v: number) {
    if (v === 0) {
      this._score += 0;
    } else if (v === 1) {
      this._score += 10;
    } else if (v === 2) {
      this._score += 30;
    } else if (v === 3) {
      this._score += 60;
    } else {
      this._score += 100;
    }
  }

  // 方法
  /**
   * 开始游戏
   * @returns
   */
  public start() {
    // 如果游戏当前的状态就是游戏中，那么什么都不做
    if (
      GameStatus.playing === this._gameStatus ||
      this._gameStatus === GameStatus.over
    )
      return;
    // 改变游戏状态
    this._gameStatus = GameStatus.playing;
    // 当前小方块组合类实例不存在，给玩家操作的方块赋值。
    if (!this._curTeris) {
      // 把下一个给当前的，下一个随机产生一个
      this._switchTeris();
      // 交换显示
    }
    // 让当前小方块下落
    this._autoDrop();
  }
  /**
   * 游戏暂停
   * @returns
   */
  public pause() {
    // 如果不在游戏中，就什么都不做
    if (this._gameStatus !== GameStatus.playing) return;
    // 修改游戏状态
    this._gameStatus = GameStatus.pause;
    // 清除定时器
    clearInterval(this._timer);
    // 清除timer
    this._timer = undefined;
  }
  /**
   * 向左移动
   */
  public leftMove() {
    if(GameStatus.playing !== this._gameStatus) return;
    TerisRule.move(this._curTeris!, Direction.left, this._exicts);
  }
  /**
   * 向右移动
   */
  public rightMove() {
    if(GameStatus.playing !== this._gameStatus) return;
    TerisRule.move(this._curTeris!, Direction.right, this._exicts);
  }
  /**
   * 向下移动
   */
  public bottomMove() {
    if(GameStatus.playing !== this._gameStatus) return;
    // 直接就触底了
    TerisRule.moveDirectly(this._curTeris!, Direction.down, this._exicts);
    // 触底后执行触底函数
    this._touchBottom();
  }
  /**
   * 
   * @returns 重新开始游戏
   */
  public resetGame(){
    if(this.gameStatus === GameStatus.init) return;
    this._gameStatus = GameStatus.init;
    clearInterval(this._timer);
    this._timer = undefined;
    this._clearPageShow(this._curTeris!)
    this._clearPageShow(this._nextTeris)
    this._exicts.forEach(ele=>ele.viewer?.hidden())
    this._curTeris = undefined;
    this._nextTeris= createTeris({ x: 0, y: 0 }); // 先随便写一个中心点位置，后续修改
    this._viewer.showNext(this._nextTeris)
    this._exicts = [];
  }
  /**
   * 清除页面中的显示
   * @returns 
   */
  private _clearPageShow(arr:SquareGroup){
    arr.squares.forEach(ele=>ele.viewer?.hidden())
  }
  
  /**
   * 旋转
   */
  public rotate() {
    if(GameStatus.over === this._gameStatus) return;
    this._curTeris!.rotate(this._exicts);
  }
  /**
   * 自由下落
   * @returns
   */
  private _autoDrop() {
    // 如果不在游戏中，或者_timer有值，就什么都不做
    if (this._gameStatus !== GameStatus.playing || this._timer) return;
    // 新开启一个timer
    this._timer = setInterval(() => {
      if (this._curTeris) {
        // 每一次移动都会返回一个boolean，我们要查看当前小方块是否触底，如果触底，就执行某个函数。
        if (!TerisRule.move(this._curTeris, Direction.down, this._exicts))
          this._touchBottom();
      }
    }, this._duration);
  }
  /**
   * 交换小方块组合类实例
   */
  private _switchTeris() {
    this._curTeris = this._nextTeris;   // 玩家操作的小方块赋值为下一个小方块
    TerisRule.resetCenterPoint(this._curTeris, gameconfig.panelSize.width);  // 玩家操作方块重新定位
    this._viewer.switch(this._curTeris);  // 玩家方块移动到中间，remove next方块
    // 对生成的小方块进行验证，如果刚出生就不能移动，那么游戏结束。
    if(!TerisRule.canIMove(this._curTeris.shape,this._curTeris.centerPoint,this._exicts)){
      // 游戏结束
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer)
      this._timer = undefined;
      console.log("game over")
    }

    this._nextTeris = createTeris({ x: 0, y: 0 });  // 产生新的next
    // 下一个方块的中心位置调整
    TerisRule.resetCenterPoint(this._nextTeris, gameconfig.nextSize.size);
    this._viewer.showNext(this._nextTeris);  // 显示到页面中

  }
  /**
   * 触底后做的事
   */
  private _touchBottom() {
    // 将触底的小方块组合类实例打散，加到_exicts中。
    this._exicts = [...this._exicts, ...this._curTeris!.squares];
    // 查看是否有需要清除的
    this._clearLine();
    // 交换执行
    this._switchTeris();
    this._viewer.switch(this._curTeris!);
  }
  /**
   * 每一次触底后都需要查看是否有可以消除的行
   */
  private _clearLine() {
    // 查看消除了多少行，最后按行数来记分
    let count = 0;
    // 找到当前打散的方块中的最小y和最大y
    const [min, max] = this._getMinMax(this._exicts);
    for (let line = min; line <= max; line++) {
      this._handleLine(line) && count++;
    }
    this.score = count;
    this._viewer.showScore(this._score);
  }
  /**
   * 找出存在行中最小的y和最大的y
   */
  private _getMinMax(arr: Square[]) {
    let min = gameconfig.panelSize.height;
    let max = 0;
    arr.forEach((ele) => {
      if (ele.point.y < min) min = ele.point.y;
      if (ele.point.y > max) max = ele.point.y;
    });
    return [min, max];
  }
  /**
   * 查看当前行是否放满了，如果是
   * 1. 清除页面上的样式
   * 2. 清除数组中
   * 3. 行数小于当前行的全部下移一行
   * 4. count++
   */
  private _handleLine(y: number) {
    let key = false;
    const curLine = this._exicts.filter((ele) => ele.point.y === y);
    // 如果相等，说明这一行铺满了
    if (curLine.length === gameconfig.panelSize.width) {
      // 清除页面样式
      curLine.forEach((ele) => ele.viewer?.hidden());
      // 过滤数组中的等于y的
      this._exicts = this._exicts.filter((ele) => ele.point.y !== y);
      this._exicts.forEach((ele) => {
        if (ele.point.y < y) {
          console.log(y, ele.point.y);
          ele.point = {
            x: ele.point.x,
            y: ele.point.y + 1,
          };
        }
      });
      key = true;
    }
    return key;
  }
}
