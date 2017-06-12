var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Room Model
 * ==========
 */

var Room = new keystone.List('Room', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: keystone.expandPath('./public/uploads'), // required; path where the files should be stored
    publicPath: '/public/uploads', // path where files will be served
  }
});

Room.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },

	coverImage: { type: Types.File, storage: myStorage },
	Image01: { type: Types.File, storage: myStorage },
	Image02: { type: Types.File, storage: myStorage },
	Image03: { type: Types.File, storage: myStorage },
	Image04: { type: Types.File, storage: myStorage },
	Image05: { type: Types.File, storage: myStorage },

  price: { type: Types.Number },
  rating: {
    type: Types.Select,
    options: '1, 2, 3, 4, 5',
    default: '5',
  },

	content: { type: Types.Html, wysiwyg: true, height: 400 },
  createdAt: { type: Types.Datetime, default: Date.now }
});

Room.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Room.defaultSort = '-createdAt';
Room.defaultColumns = 'title, state|15%, price|15%, rating|15%, createdAt|20%';
Room.register();
