var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Booking Model
 * ==========
 */

var Booking = new keystone.List('Booking', {});

Booking.add({
	name: { type: String, required: true, initial: true },
	email: { type: String, initial: true},
	phone: { type: String, initial: true},

	adult: { type: Types.Number, default: 0 },
	children: { type: Types.Number, default: 0 },

	roomType: { type: String, default: '---'},
  arrivalDate: { type: Types.Date },
  departureDate: { type: Types.Date },

  createdAt: { type: Types.Datetime, default: Date.now }
});

Booking.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Booking.defaultSort = '-publishedDate';
Booking.defaultColumns = 'name, email, phone, roomType, arrivalDate, departureDate';
Booking.register();
