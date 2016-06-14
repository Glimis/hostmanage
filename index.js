var Vue=require('vue'),
	fs = require('fs'),
	_=require('lodash');

var fileName='C:/Windows/System32/drivers/etc/hosts';


 fs.readFile(fileName,'utf8',function (error,data){
     if(error) throw error ;
    //逐行读取
     var allLine=data.split(/\n/g);
	//过滤注释
     var array=_.reject(allLine,function(line){
     	return line.indexOf("#")+1;
     })
     //格式转换
     var dataMap=_.map(array,function(line){
     	return line.trim().split(/\s+/)
     });
     //过滤无法转换数据
     var data2=_.filter(dataMap,function(array){
     	return array.length==2;
     })

	     new Vue({
			  el: 'body',
			  data: {
			    items: data2
			  },
			  methods:{
			  	save:function(){
			  		var items=this.items;
			  		var lines=_.map(items,function(item){
			  			return item.join('  ')
			  		})

			  		var text=lines.join('\n');

			  		fs.writeFile(fileName, text,function(){
			  			alert('搞定')
			  		});

			  	}
			  }
		})

 }) ;

