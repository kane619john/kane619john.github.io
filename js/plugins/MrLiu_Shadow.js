//=============================================================================
// MrLiu_Shadow.js
//=============================================================================
/*:
 * Version: 2015-11-17-0001
 * @plugindesc 在RMMV游戏中非战斗界面下显示人物影子,
 * @help 使用方法：
 * 默认情况下主角和队列都会显示影子，地图事件名中含有Sh则显示影子。
 * @author 过眼云烟
 */
var Imported = Imported || {};
Imported.MrLiu_Shadow = true;

var Lmd = Lmd || {};
Lmd.MrLiu_Shadow = Lmd.MrLiu_Shadow || {};


Lmd.MrLiu_Shadow.Sprite_Character_initialize = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    Lmd.MrLiu_Shadow.Sprite_Character_initialize.call(this,character);
	this._temperycharacter = character;
	if ((character instanceof Game_Event) && (character.event().name.indexOf("援军")!=-1 || character.event().name.indexOf("我军")!=-1 || character.event().name.indexOf("BOSS")!=-1)){
		this.createShadowSet();
		this._showShadow = true;
	}
};

Sprite_Character.prototype.createShadowSet = function() {
    this._shadowSprite = new Sprite();
    if(this._character.event().name.indexOf("BOSS")!=-1)
    this._shadowSprite.bitmap = ImageManager.loadSystem('E');
    else this._shadowSprite.bitmap = ImageManager.loadSystem('F');
	this._shadowSprite.x = this._character.direction() === 6 ? -this._character._frames.x : this._character._frames.x;
    this._shadowSprite.y = -this._character._frames.y+8;
	this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 1;
    this._shadowSprite.z = this.z-1;
    this.addChild(this._shadowSprite);
}	

Sprite_Character.prototype.update_character_shadow = function() {
	//this._shadowSprite.scale.x = ((this.patternWidth() * 100) / 48) / 90.0;
	//this._shadowSprite.scale.y = this._shadowSprite.scale.x;
    //this._shadowSprite.opacity = 150;
    this._shadowSprite.x = this._character.direction() === 6 ? -this._character._frames.x : this._character._frames.x;
    this._shadowSprite.y = -this._character._frames.y+8;
	this._shadowSprite.visible = (this._characterName != "");
    if (this._lastone != this._shadowx){
	this._lastone = this._shadowx;
	//console.log(this._shadowx);
	}
}	
	
Lmd.MrLiu_Shadow.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
	Lmd.MrLiu_Shadow.Sprite_Character_update.call(this);
	if (this._showShadow == true) {
	this.update_character_shadow();
	}
}


