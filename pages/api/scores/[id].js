import dbConnect from '../../../utils/dbConnect'
import Score from '../../../models/Score'

dbConnect()

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const score = await Score.findByID(id)

                if (!score) { // if score does not exist
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: score})
            } catch(error) {
                res.status(400).json({success: false})
            }
            break;
        case 'PUT':
            try {
                const score = await Score.findByIDAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

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
