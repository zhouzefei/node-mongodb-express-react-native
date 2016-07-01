var express=require('express')
var bodyParser = require('body-parser')
var path=require('path')
var mongoose=require('mongoose')
var _=require('underscore')
var port=process.env.PORT||3000
var app=express()
var Mine=require('./models/mine')

mongoose.connect('mongodb://localhost/reactServer')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(require('body-parser').urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'bower_components')))
app.use(express.static(path.join(__dirname, './views/public')));
app.listen(port)

console.log('start on port '+port);

//index page
app.get('/:type',function(req,res){
	var type=req.params.type||'show';
	Mine.fetch(type,function(err,mine){
        res.statusCode = 200;
	    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
	    res.end(JSON.stringify(mine));
	})
})

//detail page url里面匹配这个id的参数值
app.get('/mine/:id',function(req,res){
	var id=req.params.id
	Mine.findById(id,function(err,mine){
		res.render('detail',{
			title:'查看详情页',
			mine:mine
		});
	})
})

//admin post mine
app.post('/admin/mine/new',function(req,res){
	var id=req.body.mine._id;
	var mineObj=req.body.mine
	var _mine;
	if(id!=="undefined"){
		Mine.findById(id,function(err,mine){
			if(err){
				console.log(err)
			}
			_mine=_.extend(mine,mineObj)
			_mine.save(function(err,mine){
				if(err){
					console.log(err)
				}
				res.redirect('/mine/'+mine._id)
			})
		})
	}else{
		_mine=new Mine({
			type:mineObj.type,
			title:mineObj.title,
			company:mineObj.company,
			language:mineObj.language,
			year:mineObj.year,
			url:mineObj.url,
			summary:mineObj.summary,
			author:mineObj.author
		})
		_mine.save(function(err,mine){
			if(err){
				//console.log(err)
			}
			console.log(mine);
			res.redirect('/mine/'+mine._id)
		})
	}
})


//admin page
app.get('/admin/mine',function(req,res){
	res.render('admin',{
		title:'发布新的作品秀',
		mine:{
			type:'',
			company:'',
			title:'',
			year:'',
			author:'',
			language:'',
			url:'',
			summary:''
		}
	});
})


//admin update moive
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id
	if(id){
		Mine.findById(id,function(err,mine){
			if(err){
				console.log(err);
			}
			res.render('admin',{
				title:'作品集更新',
				mine:mine
			})
		})
	}
})

//list page
app.get('/admin/list',function(req,res){
	Mine.fetch('all',function(err,mines){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'作品列表集',
			mines:mines
		});
	})
})

//删除
app.post('/admin/remove',function(req,res){
	var id=req.body._id;
	if(id){
		Mine.removeById(id,function(err,mine){
			if(err){
				console.log(err)
			}
			console.log(mine);
			res.statusCode = 200;
		    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
		    res.end(JSON.stringify(mine));
		})
	}
})
