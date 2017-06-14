var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Comment Model
 * ==========
 */

var Comment = new keystone.List('Comment', {});

Comment.add({
	name: { type: String, required: true },
	email: { type: String },
	content: { type: Types.Textarea, required: true, initial: true },
  roomId: { type: Types.Relationship, ref: 'Room', index: true },
  createdAt: { type: Types.Datetime, default: Date.now }
});

Comment.defaultSort = '-publishedDate';
Comment.defaultColumns = 'name, email, roomId, createdAt';
Comment.register();
