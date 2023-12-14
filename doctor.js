import {Schema, model} from 'mongoose'
const doctorSchema = new Schema(
	{
		doctor: {type: String, required: true},
		room: {type: String, required: true},
	}
)
const doctor = model('doctor', doctorSchema)
export default doctor