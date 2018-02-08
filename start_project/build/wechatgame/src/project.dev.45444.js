require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0eb27NHE3xGfp1PGoaSci8e", "Game");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        starPrefab: {
          default: null,
          type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
          default: null,
          type: cc.Node
        },
        player: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
      },
      spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;
      },
      getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        var randY = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4fdf3ecyF9IdLOKSdipzMmJ", "Player");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0
      },
      setJumpAction: function setJumpAction() {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
      },
      setInputControl: function setInputControl() {
        var self = this;
        cc.eventManager.addListener({
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function onKeyPressed(keyCode, event) {
            switch (keyCode) {
             case cc.KEY.a:
              self.accLeft = true;
              self.accRight = false;
              break;

             case cc.KEY.d:
              self.accLeft = false;
              self.accRight = true;
            }
          },
          onKeyReleased: function onKeyReleased(keyCode, event) {
            switch (keyCode) {
             case cc.KEY.a:
              self.accLeft = false;
              break;

             case cc.KEY.d:
              self.accRight = false;
            }
          }
        }, self.node);
      },
      onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        this.setInputControl();
      },
      update: function update(dt) {
        this.accLeft ? this.xSpeed -= this.accel * dt : this.accRight && (this.xSpeed += this.accel * dt);
        Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
        this.node.x += this.xSpeed * dt;
      }
    });
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01535lT4n5DpKgjhQ3a97iB", "Star");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        pickRadius: 0
      },
      getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
      },
      onPicked: function onPicked() {
        this.game.spawnNewStar();
        this.node.destroy();
      },
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
          this.onPickedddddddd();
          return;
        }
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Game", "Player", "Star" ]);