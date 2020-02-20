// 匿名函数
(function(window) {
  var Layer = function(config) {
    this.layero = "";
    console.log(config);
    this.config = {
      title: "标题",
      content: "内容",
      shade: 0.3,
      yes: $.noop
    }
    $.extend(this.config, config);
    this.init();
  };
  Layer.prototype.init = function() {
    this.create();
    this.bind();
  }
  Layer.prototype.create = function() {
    var self = this; 
    var c = this.config;
    this.$title = $("<span>").text(c.title);
    var $content = $("<p>").html(c.content);
    this.$btn = $("<button>").addClass("close").text("确定");

    var $layer = $("<div>").attr({id: "layer"});
    var $shade = $("<div>").addClass("layer-shade").css({opacity: c.shade, backgroundColor: '#000'});
    
    var $dialog = $("<div>").addClass("layer-dialog");
    var $titleBox = c.title ? $("<div>").addClass("layer-title") : "";
    var $contentBox = $("<div>").addClass("layer-content");

    this.layerId = this.createID()
    c.shade && $layer.append($shade);
    $layer.append($dialog.append(c.title && $titleBox.append(this.$title)).append($contentBox.append($content)).append(this.$btn));
    $layer.attr("id", this.layerId);
    $("body").append($layer);
  };
  Layer.prototype.bind = function() {
    // 点击确认
    this.$btn.click(this.confirm.bind(this));
  }
  Layer.prototype.confirm = function() {
    this.config.yes();
    $("#"+this.layerId).remove();
  }

  // 生成随机id，防止id重复
  Layer.prototype.createID = function() {
    var i = 'layer_' + parseInt(new Date().getTime()+Math.random()*10000);
    if($("#"+i).length>0){
      // id为i的dom元素已经存在，返回一个重新生成的
      return this.createID();
    } else {
      return i;
    }
  }
  
  window.Layer = Layer;
})(window);
