import mongoose from 'mongoose'

export const connectDb = async () => {
	try {

		if (!process.env.MONGO_URL) {
	      throw new Error('MONGO_URL is not defined');
	    }

		if (mongoose.connection.readyState === 0) {
		  	await mongoose.connect(process.env.MONGO_URL)
			console.log('MongoDb connected successfully')
		}
	} catch (error) {
		console.error('MongoDb connnection error:', error.message, error)
		process.exit(1)
	}
}