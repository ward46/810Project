let Mongoose = require('mongoose');
let Schema = Mongoose.Schema; 

let TodoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    todo: String, 
    detail: String, 
    dateCreate: { type: Date, default: Date.now() },
    dateDue: Date, 
    status: {type: String, enum: ['Todo','In Process','Completed'], default: 'Todo'},
    file: {
        fileName: String, 
        originalName: String
    }
})

module.exports = Mongoose.model('Todo', TodoSchema);