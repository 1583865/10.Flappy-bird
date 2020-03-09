// 游戏


function Game( ctx, bird, pipe, land,mountain){
	this.ctx = ctx;
	this.bird = bird;
	// 定义管子
	this.pipearr = [pipe];

	this.land = land;
	this.mountain = mountain;
	this.timer = null;
	this.iframe = 0;
	this.init();

}


// 初始化
Game.prototype.init = function() {
	this.start();
	this.bindEvent();

}


// 渲染背景
Game.prototype.renderMountain = function(){
	var img = this.mountain.img;
	this.mountain.x -= this.mountain.step;
	if (this.mountain.x < - img.width){
		this.mountain.x = 0;
	}
	this.ctx.drawImage(img, this.mountain.x,this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
	this.ctx.drawImage(img,this.mountain.x + img.width * 2, this.mountain.y);

}





// 渲染背景 地面
Game.prototype.renderLand = function() {
	var img = this.land.img;
	this.land.x -= this.land.step;

	if(this.land.x < - img.width){
		this.land.x = 0;
	}
	this.ctx.drawImage(img, this.land.x,this.land.y);
	this.ctx.drawImage(img, this.land.x  + img.width, this.land.y);
	this.ctx.drawImage(img,  this.land.x + img.width* 2, this.land.y);
}

// 开始游戏
Game.prototype.start = function() {
	var me = this;
	this.timer = setInterval(function() {
		// 帧
		me.iframe++;
		// 清屏
		me.clear();
	// 渲染背景
		me.renderMountain();
		// 渲染地面
		me.renderLand();
		
		me.bird.fallDown();
		if(!(me.iframe % 60)){
			me.createPipe();
		}
		// 管子移动
		me.movePipe();
		me.renderPipe();
		me.clearPipe();

		// 减少鸟飞频率
         if(!(me.iframe % 10)){
			me.bird.fly();
		}
		// 绘制管子矩形
		me.renderPipePoints();
		// 绘制鸟矩形
		me.renderBirdPoints();
		// 绘制鸟
		me.renderBird();
		me.checkBoom();
		
	}, 25)
}

// 清屏
Game.prototype.clear = function() {
	this.ctx.clearRect(0, 0, 360, 512);
}

// 渲染鸟方法
Game.prototype.renderBird = function() {
		// 获取图片
	var img = this.bird.img;

	// 保持状态
	this.ctx.save();
	// 平移
	this.ctx.translate(this.bird.x,this.bird.y);
	
	
	// 判断鸟的状态
	var deg = this.bird.state === "D"? Math.PI / 180 * this.bird.speed : -Math.PI / 180 * this.bird.speed;
	// 旋转
	this.ctx.rotate(deg);
	// 绘制状态
	this.ctx.drawImage(img, -img.width / 2, -img.height /2);
	// 恢复状态
	this.ctx.restore();

}

// 添加绑定事件
Game.prototype.bindEvent = function(){
	var me = this;

	// 添加鼠标点击事件
	this.ctx.canvas.onclick = function() {
		// 鼠标点击鸟上升
		me.bird.goUp();
	}
}




// 绘制管子
Game.prototype.renderPipe = function() {
	var me= this;
	this.pipearr.forEach(function(value, index) {
		var img = value.pipe_up;
		var img_x = 0;
		var img_y = img.height - value.up_height;
		var img_w = img.width;
		var img_h = value.up_height;
		var canvas_x = me.ctx.canvas.width - value.step * value.count;
		var canvas_y = 0;
		var canvas_w = img.width;
		var canvas_h = value.up_height;
		me.ctx.drawImage(img, img_x, img_y, img_w,img_h,canvas_x, canvas_y, canvas_w,canvas_h);



	//绘制下管子
	var down_img = value.pipe_down;
	var down_img_x = 0;
	var down_img_y = 0;
	var down_img_w =img_w;
	var down_img_h = 250 - img_h;

	var down_canvas_x = me.ctx.canvas.width - value.step * value.count;
	var down_canvas_y  = img_h + 150;

	var down_canvas_w  = img_w;
	var down_canvas_h  = 250 - img_h;
	me.ctx.drawImage(down_img,down_img_x,down_img_y,down_img_w,down_img_h,down_canvas_x,down_canvas_y,down_canvas_w, down_canvas_h);
		})
}


// 管子移动
Game.prototype.movePipe  = function() {
	

	this.pipearr.forEach(function(value, index) {
		value.count++;
	})
}

// 创建新管子
Game.prototype.createPipe = function() {
	var pipe = this.pipearr[0].createPipe();
	this.pipearr.push(pipe);
}

// 清理管子

Game.prototype.clearPipe = function() {

	for(var i = 0; i < this.pipearr.length;i++) {
		var pipe = this.pipearr[i];
		if(pipe.x - pipe.step * pipe.count < - pipe.pipe_up.width) {
			// 移除
			this.pipearr.splice(i, 1);
			return;
		}
	}
}



// 绘制鸟的四个点
Game.prototype.renderBirdPoints = function() {
	var bird_A = {
		x: -this.bird.img.width / 2 + 4 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 + this.bird.y
	}
	var bird_B = {
		x: -this.bird.img.width / 2 + 4 + this.bird.img.width - 9 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 + this.bird.y
	}
	var bird_C= {
		x: -this.bird.img.width / 2 + 4 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 + this.bird.img.height - 12 +this.bird.y

	}
	var bird_D = {
		x: -this.bird.img.width / 2 + 4 + this.bird.img.width - 9 + this.bird.x,
		y: -this.bird.img.height / 2 + 8 + this.bird.img.height - 12 + this.bird.y
	}
// 绘制原始坐标系
	this.ctx.beginPath();
	this.ctx.moveTo(bird_A.x, bird_A.y);
	this.ctx.lineTo(bird_B.x, bird_A.y);
	this.ctx.lineTo(bird_D.x, bird_D.y);
	this.ctx.lineTo(bird_C.x, bird_C.y);
	this.ctx.closePath();
	this.ctx.strokeStyle = "blue";
	this.ctx.stroke();
}


// 绘制管子8个点
Game.prototype.renderPipePoints = function() {
	for(var i = 0; i < this.pipearr.length; i++){
		var pipe = this.pipearr[i];
		// 上管
		var pipe_up_A = {
			x: this.ctx.canvas.width - pipe.step * pipe.count,
			y: 0
		}
		var pipe_up_B = {
			x: this.ctx.canvas.width - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}
		var pipe_up_C = {
			x: this.ctx.canvas.width - pipe.step * pipe.count,
			y: pipe.up_height
		}
		var pipe_up_D = {
			x:this.ctx.canvas.width - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe.up_height 
		}
		this.ctx.beginPath();
		this.ctx.moveTo(pipe_up_A.x, pipe_up_A.y);
		this.ctx.lineTo(pipe_up_B.x, pipe_up_B.y);
		this.ctx.lineTo(pipe_up_D.x, pipe_up_D.y);
		this.ctx.lineTo(pipe_up_C.x, pipe_up_C.y);
		this.ctx.closePath();
		this.ctx.strokeStyle = "red";
		this.ctx.stroke();


		// 下管子
		var pipe_down_A ={
			x: pipe_up_A.x,
			y: pipe_up_D.y + 150

		}
		var pipe_down_B = {
			x: pipe_up_B.x,
			y: pipe_down_A.y
		}
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: 400
		}
		this.ctx.beginPath();
		this.ctx.moveTo(pipe_down_A.x, pipe_down_A.y);
		this.ctx.lineTo(pipe_down_B.x, pipe_down_B.y);
		this.ctx.lineTo(pipe_down_D.x, pipe_down_D.y);
		this.ctx.lineTo(pipe_down_C.x, pipe_down_C.y);
		this.ctx.closePath();
		this.ctx.strokeStyle = "red";
		this.ctx.stroke();



	}
}

Game.prototype.checkBoom = function(){
	// 循环管子
	for(var i = 0; i < this.pipearr.length;i++){
		// 获取管子
		var pipe = this.pipearr[i];
		// 上管子
		var pipe_up_A = {
			x: this.ctx.canvas.width- pipe.step * pipe.count,
			y: 0
		}
		var pipe_up_B = {
			x: this.ctx.canvas.width - pipe.step * pipe.count + pipe.pipe_up.width,
			y: 0
		}
		var pipe_up_C = {
			x: this.ctx.canvas.width - pipe.step * pipe.count,
			y: pipe.up_height
		}
		var pipe_up_D = {
			x: this.ctx.canvas.width - pipe.step * pipe.count + pipe.pipe_up.width,
			y: pipe.up_height
		}

		// 下管子
		var pipe_down_A = {
			x: pipe_up_A.x,
			y: pipe_up_D.y + 150
		}
		var pipe_down_B = {
			x: pipe_up_B.x,
			y: pipe_down_A.y
		}
		var pipe_down_C = {
			x: pipe_down_A.x,
			y: 400
		}
		var pipe_down_D = {
			x: pipe_down_B.x,
			y: 400
		}

		// 鸟的四个点
		var bird_A = {
			x: -this.bird.img.width / 2 + 4 + this.bird.x,
			y: -this.bird.img.width / 2 + 8 + this.bird.y
		}



		var bird_B = {
			x: -this.bird.img.width / 2 + 4 + this.bird.img.width - 9 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 + this.bird.y
		}
		


		var bird_C = {
			x: -this.bird.img.width / 2 + 4 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 + this.bird.img.height -12 + this.bird.y

		}

		var bird_D = {
			x: -this.bird.img.width / 2+ 4 + this.bird.img.width - 9 + this.bird.x,
			y: -this.bird.img.height / 2 + 8 + this.bird.img.height - 12 + this.bird.y
		}


		// 监测是否碰到上管子
		if(bird_B.x >= pipe_up_C.x && bird_B.y <= pipe_up_C.y && bird_A.x <= pipe_up_D.x){
			console.log("碰到上管子");
			this.over();
			return;
		}
		// 监测下管子
		if (bird_B.x >= pipe_down_A.x && bird_D.y >= pipe_down_A.y && bird_C.x <= pipe_down_B.x){
			console.log("碰到下管子");
			this.over();
			return;
		}
	}
	
}

// 游戏结束
Game.prototype.over = function() {
	// 清除定时器
	clearInterval(this.timer);
}