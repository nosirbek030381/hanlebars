import {Schema, model} from 'mongoose'
const servicesSchema = new Schema(
	{
		services: {type: String, required: true},
		price: {type: Number, required: true},
	}
)
const services = model('services', servicesSchema)
export default services