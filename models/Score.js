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
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Description cannot be more than 200 characters']
    },
    composer: {
        type: String,
        required: [true, 'Please add a composer'],
        maxlength: [50, 'Composer cannot be more than 50 characters']
    },
    music: {
        type: String,
        required: [true, 'Please add music'],
    }
})

// ScoreSchema.add({composer: {
//     type: String,
//     required: [true, 'Please add a composer'],
//     maxlength: [50, 'Composer cannot be more than 50 characters']
// }})

//module.exports = mongoose.model('Score', ScoreSchema)
module.exports = mongoose.models.Score || mongoose.model('Score', ScoreSchema)
