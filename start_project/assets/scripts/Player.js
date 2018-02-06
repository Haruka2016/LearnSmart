// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
      jumpHeight:0,
      jumpDuration:0,
      maxMoveSpeed:0,
      accel:0,
    },
    setJumpAction:function(){
      var jumpUp = cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
      var jumpDown = cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
      return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
    },
    setInputControl: function () {
      var self = this;
      // 添加键盘事件监听
      cc.eventManager.addListener({
          event: cc.EventListener.KEYBOARD,
          // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
          onKeyPressed: function(keyCode, event) {
              switch(keyCode) {
                  case cc.KEY.a:
                      self.accLeft = true;
                      self.accRight = false;
                      break;
                  case cc.KEY.d:
                      self.accLeft = false;
                      self.accRight = true;
                      break;
              }
          },
          // 松开按键时，停止向该方向的加速
          onKeyReleased: function(keyCode, event) {
              switch(keyCode) {
                  case cc.KEY.a:
                      self.accLeft = false;
                      break;
                  case cc.KEY.d:
                      self.accRight = false;
                      break;
              }
          }
      }, self.node);
    },
    // onLoad: 在场景加载后立即执行，放初始化相关操作和逻辑
    onLoad() {
      // 初始化跳跃动作
      this.jumpAction = this.setJumpAction();
      this.node.runAction(this.jumpAction);

      // 加速度方向开关
      this.accLeft = false;
      this.accRight = false;
      // 主角当前水平方向速度
      this.xSpeed = 0;

      // 初始化键盘输入监听
      this.setInputControl();
      
    },

    // start () {

    // },
    // update：在场景加载后就会每帧调用一次，一般把需要经常计算或及时更新的逻辑内容放在这里
    update (dt) {
      // 根据当前加速度方向每帧更新速度
      if (this.accLeft) {
        this.xSpeed -= this.accel * dt;
      } else if (this.accRight) {
        this.xSpeed += this.accel * dt;
      } 
      // 限制主角的速度不能超过最大值
      if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
        // if speed reach limit, use max speed with current direction
        this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
      }

      // 根据当前速度更新主角的位置
      this.node.x += this.xSpeed * dt;
    },
});
