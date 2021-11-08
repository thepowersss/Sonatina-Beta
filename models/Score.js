const mongoose = require('mongoose')

// uncomment this to drop the table in case the schema needs to be modified
// mongoose.connection.collections['scores'].drop( function(err) {
//     console.log('collection dropped');
// });

const ScoreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    music: {
        type: String,
        required: [true, 'Please add music'],
    }
})

module.exports = mongoose.models.Score || mongoose.model('Score', ScoreSchema)
