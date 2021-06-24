import { _decorator, Component, Prefab, instantiate, Node, LabelComponent, CCInteger, v3} from "cc"; //引入cocos的库包缩写就是cc.所以我们需要的包都在这个cc里面
import { PlayerController } from "./PlayerController";   //下面是引入自己的包, 需要用.加脚本名即可.
const { ccclass, property } = _decorator;   //下面这个也是cc里面的包.
//2021-06-24,16点45  最近一直发现vscode 看不了typescript源码,感觉这个性能还是不够.
//把ts文件的打开方式设置成pycharm了. 用这个随便开.并且还是护眼色, 还是jetbrain软件性能好.
enum BlockType{     //石块的2种,一个是空一个是非空.踩到非空就摔死.
    BT_NONE,
    BT_STONE,
};

enum GameState{
    GS_INIT,
    GS_PLAYING,           //游戏的3个状态.
    GS_END,
};

@ccclass("GameManager")
export class GameManager extends Component {




    // 挂载脚本之后需要外接拉取引用的都需要public和@property来设置拉取的类型. 对于引用类型直接null初始化.
    @property({type: Prefab})        //预制体
    public cubePrfb: Prefab = null;
    @property({type: CCInteger})    //整数
    public roadLength: Number = 50;
    private _road: number[] = [];
    @property({type: Node})
    public startMenu: Node = null;
    @property({type: PlayerController})//引入脚本.
    public playerCtrl: PlayerController = null;


    private _curState: GameState = GameState.GS_INIT;
    @property({type: LabelComponent})// 记录步数的
    public stepsLabel: LabelComponent = null;













    start () {
         this.playerCtrl.node.on('JumpEnd', this.onPlayerJumpEnd, this);
        this.curState = GameState.GS_INIT;

    }   // 第一个参数表示监听事件的名字. 第二个是监听的函数名字.绑定了监听事件. 后续我们就可以用emit函数来出发了.

    init() {
        this.startMenu.active = true;// 游戏menu显示
        this.generateRoad();
        this.playerCtrl.setInputActive(false);
        this.playerCtrl.node.setPosition(v3());  // v3 直接最开始import进来就行了.
        this.playerCtrl.reset();
    }

    set curState (value: GameState) {//set函数, 赋值时候触发.
        switch(value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                this.startMenu.active = false;//隐藏menu
                this.stepsLabel.string = '0';   // 将步数重置为0
                setTimeout(() => {      //直接设置active会直接开始监听鼠标事件，做了一下延迟处理 //为了鼠标用这0.1秒抬起来. 不会让人物直接吃这个命令而跳一步.
                    this.playerCtrl.setInputActive(true);  //开始接受指令.
                }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
        this._curState = value;
    }

    generateRoad() {

        this.node.removeAllChildren();

        this._road = [];
        // startPos
        this._road.push(BlockType.BT_STONE);

        for (let i = 1; i < this.roadLength; i++) {
            if (this._road[i-1] === BlockType.BT_NONE) {//如果上一个是空
                this._road.push(BlockType.BT_STONE); //那么下一个一定是石头
            } else {
                this._road.push(Math.floor(Math.random() * 2));// 随机放一个石头或者空.
            }
        }

        for (let j = 0; j < this._road.length; j++) {
            let block: Node = this.spawnBlockByType(this._road[j]) ;
            if (block) {
                this.node.addChild(block);
                block.setPosition(j, -1.5, 0);
            }
        }
    }







    spawnBlockByType(type: BlockType) {
        let block = null;
        switch(type) {
            case BlockType.BT_STONE:
                block = instantiate(this.cubePrfb); //利用prefab实例化block
                break;
        }

        return block;
    }

    onStartButtonClicked() {
        this.curState = GameState.GS_PLAYING;
    }

    checkResult(moveIndex: number) {
        if (moveIndex < this.roadLength) {
            if (this._road[moveIndex] == BlockType.BT_NONE) {   //跳到了空方块上
                this.curState = GameState.GS_INIT;
            }
        } else {    // 跳过了最大长度
            this.curState = GameState.GS_INIT;
        }
    }

    onPlayerJumpEnd(moveIndex: number) {
        this.stepsLabel.string = '' + moveIndex;//加空字符串就是转化数字为字符串.
        this.checkResult(moveIndex);
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
