const Note = require('./notes.entity').notesModel;
const JSONStream = require('JSONStream');
const fileStream = require('fs');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const DB_URL = require('../../../config').MONGO_URL;
const path = require('path');

const getNotes = userID => {
    const promise = new Promise((resolve, reject) => {
        Note.find({userId: userID}, (error, notes) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Retrieved successfully', status: 200, data: notes});
            }
        });
    });
    return promise;
};

const shareNote = (data, userId) => {
    const promise = new Promise((resolve, reject) => {
        Note.findOne({title: data.title, text: data.text, userId: userId}, (error, note) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                if(note) {
                    reject({message: 'Note already shared', status: 403});
                } else {
                    const note = new Note({
                        title: data.title,
                        text: data.text,
                        state: data.state,
                        group: data.group,
                        userId: userId,
                        createdOn: datify(getFormattedDate()),
                        modifiedOn: datify(getFormattedDate())
                    });
                    if(data.sharedBy !== null || data.sharedBy !== undefined || data.sharedBy !== '') {
                        note.sharedBy = data.sharedBy;
                    }
                    if(data.accessType !== null || data.accessType !== undefined || data.accessType !== '') {
                        note.accessType = data.accessType;
                    }
                    Note.create(note, (error, savedNote) => {
                        if(error) {
                            reject({message: error.message, status: 500});
                        } else {
                            resolve({message: 'Created', status: 201, data: savedNote});
                        }
                    });
                }
            }
        });
    });
    return promise;
};

const createNote = (data, userID) => {
    const promise = new Promise((resolve, reject) => {
        Note.findOne({title: data.title, text: data.text, userId: userID}, (error, note) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                if(note) {
                    reject({message: 'Note already exists', status: 403});
                } else {
                    const note = new Note({
                        title: data.title,
                        text: data.text,
                        state: data.state,
                        userId: userID,
                        createdOn: datify(getFormattedDate()),
                        modifiedOn: datify(getFormattedDate())
                    });
                    if(data.sharedBy !== null || data.sharedBy !== undefined || data.sharedBy !== '') {
                        note.sharedBy = data.sharedBy;
                    }
                    if(data.accessType !== null || data.accessType !== undefined || data.accessType !== '') {
                        note.accessType = data.accessType;
                    }
                    Note.create(note, (error, savedNote) => {
                        if(error) {
                            reject({message: error.message, status: 500});
                        } else {
                            resolve({message: 'Created', status: 201, data: savedNote});
                        }
                    });
                }
            }
        });
    });
    return promise;
};

const updateNote = (note, noteId) => {
    const promise = new Promise((resolve, reject) => {
        note.modifiedOn = datify(getFormattedDate());
        note.id = noteId;
        Note.findOneAndUpdate(
            {
                $and:[
                    {id: noteId},
                    {
                        $or: [
                            {accessType: 'full-access'},
                            {accessType: 'write-only'},
                            {accessType: ''},
                            {accessType: null},
                            {accessType: undefined},
                        ]
                    }
                ]
            },
            note, {new: true}, (error, updated) => {
                if(error) {
                    reject({message: error.message, status: 500});
                } else {
                    resolve({message: 'Update successful', status: 200, data: updated});
                }
            });
    });
    return promise;
};

const findaNote = (noteId, callback) => {
    Note.findOne({id: noteId}, (error, document) => callback(error, document));
};

const bulkUpload = () => {
    const promise = new Promise((resolve, reject) => {
        const outputConfig = { dbURL: DB_URL, collection: NOTES_COLLECTION };
        const source = fileStream.createReadStream(path.join(__dirname, '..', '..', '..', 'mock_notes.json'));
        const responeStream = fileStream.createReadStream(path.join(__dirname, '..', '..', '..', 'mock_notes.json'));
        source.on('error', error => {
            reject({message: error.message, status: 500, error: error});
        });
        const destination = streamToMongoDB(outputConfig);
        destination.on('error', error => {
            reject({message: error.message, status: 500, error: error});
        });
        const stream = source.pipe(JSONStream.parse('*')).pipe(destination);
        stream.on('error', error => {
            reject({message: error.message, status: 500, error: error});
        });
        stream.on('finish', () => {
            resolve({message: 'Uploaded', status: 201, data: responeStream});
        });
    });
    return promise;
};

const searchByTitle = (title, userId, callback) => {
    Note.find({title: {$regex: new RegExp('^' + `${title}`, 'i')}, userId: userId}, (error, documents) => callback(error, documents));
};

const filterNotes = (category, userId, callback) => {
    Note.find({group: `${category}`, userId: userId}, (error, documents) => callback(error, documents));
};

const getFavoriteNotes = (userId, callback) => {
    Note.find({favourite: `yes`, userId: userId}, (error, documents) => callback(error, documents));
};

const getSharedNotes = (userId, callback) => {
    Note.find({sharedBy: {$ne : "self-notes"}, userId: userId}, (error, documents) => callback(error, documents));
};

const multiUpdate = (ids, userId, update, callback) => {
    console.log(ids);
    Note.updateMany(
    {
        $and: [
            {id: {$in: ids}},
            {userId: parseInt(userId, 10)},
            {
                accessType: {$in: ['full-access', 'write-only', '', null, 'undefined']}
            }
        ]
    }, update, {new: true}, (error, status) => callback(error, status));
};


const getNotesStream = () => Note.find().cursor();

const saveNote = (data, callback) => {
    Note.create(data, (error, saved) => callback(error, saved));
};

const deleteNotes = (ids, userId, callback) => {
    Note.deleteMany(
    {
        $and: [
            {id: {$in: ids}},
            {userId: parseInt(userId, 10)},
            {accessType: {$in: ['full-access', '', null, 'undefined']}}
        ]
    }, error => callback(error))
};

const datify = function(dateString) {
    return new Date(dateString);
};

const getFormattedDate = () => {
    var todayTime = new Date();
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    bulkUpload,
    getNotesStream,
    getFavoriteNotes,
    getSharedNotes,
    findaNote,
    saveNote,
    filterNotes,
    searchByTitle,
    multiUpdate,
    deleteNotes,
    shareNote
}