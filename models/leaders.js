const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true,
        unique:true
    },
    designation:{
        type:String,
        require:true
    },
    abbr:{
        type:String,
        require:true
    },
    description:{
        type:String,
        default:''
    },
    featured:{
        type:Boolean,
        default:false
    }},{
        timestamps:true
});

var Leaders = mongoose.model('Leader',leaderSchema);
module.exports = Leaders;