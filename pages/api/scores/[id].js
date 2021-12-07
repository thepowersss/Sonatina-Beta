import dbConnect from '../../../utils/dbConnect'
import Score from '../../../models/Score'

dbConnect()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;

    //console.log(req.method)
    //console.log(req.query)
    console.log("scores/[id] called")
    switch(method) {
        case 'GET':
            try {
                //console.log(id)
                console.log("attempt GET")
                const score = await Score.findById(id)

                if (!score) { // if score does not exist
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: score})
            } catch(error) {
                console.log(error)
                res.status(400).json({success: false})
            }
            break;
        case 'PUT':
            try {
                console.log("attempt PUT")
                const score = await Score.findByIdAndUpdate(id, {music: req.body}, {
                    new: true,
                    runValidators: false
                })
                console.log(score)

                if (!score) { // if score does not exist
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: score})
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        case 'DELETE':
            try {
                const deletedScore = await Score.deleteOne({_id: id})

                if (!deletedScore) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {}})
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}
