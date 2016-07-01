var mongoose=require('mongoose')
var MineSchema=require('../schemas/mine')
var Mine=mongoose.model('Mine',MineSchema)

module.exports=Mine;
