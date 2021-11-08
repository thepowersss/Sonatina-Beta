const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.models.Score || mongoose.model('Score', ScoreSchema)
