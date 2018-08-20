Page({
  /**
   * 页面的初始数据
   */
  data: {
    x:0,
    y:0,
    firecount:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   // this.running()
    setInterval(this.running, 300)
    //console.log(this.ball.ballpath)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var sp = null
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  position:{
    x:160,
    y:90,
    yb:306,
    a: 160,
    b: 415
  },
  ball:{
    balls :["#e597b2", "#e6cde3", "#a6a5c4", "#cd5e3c", "#e09e87", "#cbb994", "#eaf4fc", "#c099a0", "#c3d825", "#a69425", "#f6bfbc", "#c7b370", "#d9333f"],
    bottom :["#eebbcb", "#cbb994", "#eaf4fc", "#c099a0", "#c7b370", "#d9333f", "#ee827c", "#aa7e4c", "#aa4c8f", "#cd5e3c", "#e09e87"],
    cannon :"#a2041b",
    ballpath:[],
    ballhide:[[160,72]] 
  },
  running:function(){
    const context = wx.createCanvasContext('first')
    var px,py
    var radius = 10 //Math.round(Math.random()*10)
    for(var i =0;i<this.ball.balls.length;i++){
      context.beginPath()
      context.setFillStyle(this.ball.balls[i])
      if(i<7){
        px = this.position.x - i * 18
        py = this.position.y + i * 18
        if(this.inarray(px,py)){
          context.arc(px, py, 0, 0, 2 * Math.PI, true)
        }
        else{
          context.arc(px, py, radius, 0, 2 * Math.PI, true)
        }
        this.ball.ballpath[i] = [px, py]
        }
      else { 
          px = this.position.x + (i - 6) * 18,
          py = this.position.y + (i - 6) * 18
          if (this.inarray(px, py)) {
            context.arc(px, py, 0, 0, 2 * Math.PI, true)
          }
          else {
            context.arc(px, py, radius, 0, 2 * Math.PI, true)
          }
          this.ball.ballpath[i] = [px, py]
          }
      context.fill()
      this.ball.balls[i] = this.ball.balls[i+1]
      if(i==12) {this.ball.balls[i] = this.ball.balls[0]}
    }
    for(var j=0;j<this.ball.bottom.length;j++){
      context.beginPath()
      context.setFillStyle(this.ball.bottom[j]);
      if(j<6){
          px = this.position.x - j * 18,
          py = this.position.yb - j * 18
          if (this.inarray(px, py)) {
            context.arc(px, py, 0, 0, 2 * Math.PI, true)
          }
          else {
            context.arc(px, py, radius, 0, 2 * Math.PI, true)
          }
          this.ball.ballpath[13+j] = [px, py]
      }
      else{
          px = this.position.x + (j - 5) * 18,
          py = this.position.yb - (j - 5) * 18
          if (this.inarray(px, py)) {
            context.arc(px, py, 0, 0, 2 * Math.PI, true)
          }
          else {
            context.arc(px, py, radius, 0, 2 * Math.PI, true)
          }
          this.ball.ballpath[13 + j] = [px, py]
      }
      context.fill()
      this.ball.bottom[j] = this.ball.bottom[j + 1]
      if (j == 10) { this.ball.bottom[j] = this.ball.bottom[0] }
    }
    context.beginPath()
    context.arc(this.position.a, this.position.b, 9, 0, 2 * Math.PI, true)
    context.setFillStyle(this.ball.cannon)
    context.fill()
    context.draw()
  },

  inarray:function(x,y){
    for (var i= 0; i < this.ball.ballhide.length; i++) {
      // console.log(this.ball.ballhide[i][0] == x, this.ball.ballhide[i][0], x)
      // console.log(this.ball.ballhide[i][1] == y, this.ball.ballhide[i][1], y)
      // console.log(this.ball.ballhide[i][0] == x && this.ball.ballhide[i][1] == y)
      if (this.ball.ballhide[i][0] == x && this.ball.ballhide[i][1] == y) {
        return true
      }
    }
  },

  move:function(e){
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    this.position.a = e.touches[0].x
    this.position.b = e.touches[0].y
  },

  fire:function(){
    clearInterval(this.data.firecount)
    this.data.firecount = setInterval(this.process, 20)
  },

  process:function(){
    for(var i =0 ;i<this.ball.ballpath.length;i++){
     var pa = false
     if (this.ball.ballpath[i][0] - 6 < this.position.a && this.position.a < this.ball.ballpath[i][0] + 6){
       pa = true
     }
      //this.ball.ballpath[i][0] == this.position.a
      if (pa && this.ball.ballpath[i][1] == this.position.b)
      {
        // this.ball.ballhide.push([this.position.a,this.position.b])  
        this.ball.ballhide.push([this.ball.ballpath[i][0],this.ball.ballpath[i][1]])
      }
    }
    if (this.position.b < 80) {
     // console.log(this.position.b)
      clearInterval(this.data.firecount)
      this.position.a = 160
      this.position.b = 415
    }
    this.position.b--
  }
})