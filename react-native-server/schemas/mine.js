var mongoose=require('mongoose');
var MineSchema=new mongoose.Schema({
	title:String,
	author:String,
	company:String,
	language:String,
	year:Number,
	summary:String,
	url:String,
	type:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
MineSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	next();
})

MineSchema.statics={
	fetch:function(type,cb){
		var param={};
		if(type!='all'){
			param.type=type;
		}
		return this
			.find(param)
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	},
	removeById:function(id,cb){
		return this
			.remove({_id:id})
			.exec(cb)
	}
}
module.exports=MineSchema;
