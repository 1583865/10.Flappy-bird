// 定义像素鸟

function Bird(imgarr, x, y) {
	// 图片数组
	this.imgarr= imgarr;
	// 图片索引
	this.index = parseInt(Math.random() * imgarr.length);
	this.img = this.imgarr[this.index];
	// 图片x y值
	this.x = x;
	this.y = y;
	// 定义鸟的状态
	this.state = "D";
	// 上升下降速度
	this.speed = 0;

}


// 定义鸟煽动翅膀
Bird.prototype.fly = function() {
	this.index++;
	if (this.index > this.imgarr.length - 1) {
		this.index = 0;
	}
	this.img = this.imgarr[this.index];
}

// 定义鸟下降
Bird.prototype.fallDown = function() {
	console.log("鸟下降")
	// this.y++;
	// 定义状态
	if (this.state === "D") {
		this.speed++;
		this.y += Math.sqrt(this.speed);

	}else {
		this.speed--;
		if (this.speed === 0) {
			this.state = "D";
			return;
		}
		this.y -= Math.sqrt(this.speed);

	}
}

// 定义鸟上升
Bird.prototype.goUp = function() {
	console.log("鸟上升了");
	// this.y -= 25;
    this.state = "U";
    this.speed = 20;
}





