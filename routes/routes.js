import { format } from 'date-fns';
import { Router } from 'express';
import Customer from './customer.js';
import doctor from './doctor.js';
import services from './services.js';
const router = Router();
// Routes
router.get(['/', '/index'], async (req, res) => {
	const doctorData = await doctor.find();
	const servicesData = await services.find();
	const newdoctorData = doctorData.map(doc => ({ doctor: doc.doctor }));
	const newservicesData = servicesData.map(ser => ({ services: ser.services, price: ser.price }));
	res.render('index', {
		newdoctorData: newdoctorData,
		newservicesData: newservicesData,
	});
});
router.post('/index/add-customer', async (req, res) => {
	const array = JSON.parse(req.body.selectedOptions);
	const theroom = await doctor.findOne({ doctor: req.body.doctor });

	const info = {
		customerName: req.body.customerName,
		number: req.body.number,
		room: theroom.room,
		doctor: req.body.doctor,
		comment: req.body.comment,
		typePayment: req.body.typePayment,
		birthDate: req.body.CustomerDate,
		selectedOptions: array,
		totalPrice: req.body.totalPrice,
	};

	const cust = await Customer.create(info);
	const doctorData = await doctor.find();
	const servicesData = await services.find();
	const newdoctorData = doctorData.map(doc => ({ doctor: doc.doctor }));
	const newservicesData = servicesData.map(ser => ({ services: ser.services, price: ser.price }));
	const dates = format(new Date(), 'dd.MM.yyyy  HH:mm:ss');
	console.log(typeof dates);
	res.render('index', {
		newdoctorData: newdoctorData,
		newservicesData: newservicesData,
		info: info,
		dates: dates,
	});
});
router.get('/reports', (req, res) => {
	res.render('reports');
});
router.post('/reports/table', async (req, res) => {
	const startDateS = req.body.time1;
	const endDateS = req.body.time2;
	const doctor = req.body.doctor;

	const startDate = new Date(startDateS + 'T00:00:00.000+00:00');
	const endDate = new Date(endDateS + 'T00:00:00.000+00:00');
	try {
		const query = {
			registerDate: {
				$gte: startDate,
				$lte: endDate,
			},
		};

		if (doctor && doctor !== '') {
			query.doctor = doctor;
		}
		const reportsData = await Customer.find(query);

		const newreportsData = reportsData.map(m => ({
			customerName: m?.customerName,
			doctor: m?.doctor,
			comment: m?.comment,
			typePayment: m?.typePayment,
			totalPrice: m?.totalPrice,
			selectedOptions: m?.selectedOptions,
			registerDate: format(m?.registerDate, 'dd MMM yyyy'),
		}));

		res.render('reports', { newreportsData });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
// settings
router.get('/settings', async (req, res) => {
	const doctorData = await doctor.find();
	const servicesData = await services.find();
	const newdoctorData = doctorData.map(doc => ({
		doctor: doc.doctor,
		room: doc.room,
		id: doc._id,
	}));
	const newservicesData = servicesData.map(ser => ({
		services: ser.services,
		price: ser.price,
		id: ser._id,
	}));
	res.render('settings', {
		newdoctorData: newdoctorData,
		newservicesData: newservicesData,
	});
});
router.post('/settings/add-item', async (req, res) => {
	const dataa = req.body;
	const ser = await services.create(dataa);
	res.redirect('/settings');
});
router.post('/settings/add-doctor', async (req, res) => {
	const data = req.body;
	const user = await doctor.create(data);
	res.redirect('/settings');
});
router.get('/setting/del/ser', async (req, res) => {
	await services.findByIdAndDelete(req.query.id);
	res.redirect('/settings');
});
router.get('/setting/del/doc', async (req, res) => {
	await doctor.findByIdAndDelete(req.query.id);
	res.redirect('/settings');
});
export default router;
