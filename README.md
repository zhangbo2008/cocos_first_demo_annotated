# tutorial-mind-your-step-3d
Cocos Creator learning tutorial
"# cocos_first_demo_annotated" 








2021-06-24,8点42




开始读cocos项目:


1. 克隆代码https://github.com/cocos-creator/tutorial-mind-your-step-3d
2.cocos dashboard里面打开项目. 版本选择用3.2打开.会自动升级项目.
3.点assets里面的Scenes里面Main.就能在Scene里面看到人物.然后点运行游戏即可.

4.这样当前场景中的东西都会在层级管理器里面
  只需要把层级管理器里面东西都看懂即可.

5. camera:

	1. Clear Flags:清除标记
	决定屏幕的哪部分将被清除。一般用户使用对台摄像机来描绘不同游戏对象的情况，有3中模式选择：
　　Skybox：天空盒。默认模式。在屏幕中的空白部分将显示当前摄像机的天空盒。如果当前摄像机没有设置天空盒，会默认用Background色。
　　Solid Color：纯色。选择该模式屏幕上的空白部分将显示当前摄像机的background色。
　　Depth only：仅深度。该模式用于游戏对象不希望被裁剪的情况。想将多个Camera看到的东西同时渲染在同一个画面时就用，但是有一个条件，它们的Depth都需要比Clear Flags为Skybox或Solid Color的Camera的Depth要高,Camera的渲染次序，值越大，越后渲染，所以当多个Camera存在于同一个Scene时，只能看到Depth值最大的那个Camera看到的东西.
　　Dont Clear：不清除。该模式不清除任何颜色或深度缓存。其结果是，每一帧渲染的结果叠加在下一帧之上。一般与自定义的shader配合使用。

	这个默认是solid color, 只显示这个摄像机本身,不要使用这个.使用dont clear傲.可以多个摄像机叠加了.

6.项目中共分3个部分
	1.player
	2.GameManager
	3.Canvas
	
	
	
我们先看最简单的canvas.	
	BG是一个2d 的spirit
	然后里面SpiritFrame设置的是贴图
	其他属性都不用动
	
	
	
	playbutton绑定clickEvent
	首先在数组数量上输入1,回车
	然后拖入GameManager物体然后选择里面的函数OnStartButtonClicked
	就绑定上了click的相应函数.
	
	
	
	然后我们看GameManager这个物体.
	是一个空物体,放在0,0,0然后其他都代码控制
	
	
	然后是player空物体,放在0,0,0
	里面有body cocos spotLight Camera 这4个物体放同级即可.
	都被player控制.
	body里面绑定2个动画,一个是onestep一个是twostep
	
	camera没有特别设置
	cocos:是模型.也不用设置.默认里面已经有了动画片
	
下面看资源管理器:
	assets里面就是全部需要看的.
	然后prefabs 里面一个cube不用特殊设置.
	剩下只有几个脚本:
	第一个是migrate-canvas.ts是一个低版本升级到3.0版本之后
	需要放入的一个脚本,来保证渲染的.不用动他.是系统自动生成的.
	
	
	然后看GameManger脚本
