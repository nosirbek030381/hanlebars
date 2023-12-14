import { Schema, model } from 'mongoose';
import { parse, format } from 'date-fns';

const CustomerSchema = new Schema(
  {
    customerName: { type: String, required: true },
    number: { type: String,  },
    room: { type: String, required: true },
    doctor: { type: String, required: true },
    comment: { type: String,  },
    typePayment: { type: String,  },
    birthDate: { type: String,  },
    totalPrice: { type: Number, required: true },
    selectedOptions: [{ type: String }],
    registerDate: { type: Date, default: Date.now }, // Use Date type for registerDate
  }
);

CustomerSchema.pre('save', function (next) {
  // Format birthDate using date-fns
  this.registerDate = format(this.registerDate,  'yyyy-MM-dd');
  next();
});

const Customer = model('Customer', CustomerSchema);

export default Customer;
