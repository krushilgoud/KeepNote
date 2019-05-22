const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    state: {
        type: String,
        default: 'not-started'
    },
    group: {
        type: String,
        default: 'default'
    },
    favourite: {
        type: String,
        default: 'no'
    },
    userId: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date
    },
    modifiedOn: {
        type: Date
    },
    sharedBy: {
        type: String,
        default: 'self-notes'
    },
    accessType: {
        type: String,
        default: 'full-access'
    },
    reminder: {
        type: Date,
        required: false
    }
});

autoIncrement.initialize(mongoose.connection);

notesSchema.plugin(autoIncrement.plugin, {
    model: 'notesSchema', 
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

const notesModel = mongoose.model('notesSchema', notesSchema, 'Notes');

module.exports = {
    notesModel
}