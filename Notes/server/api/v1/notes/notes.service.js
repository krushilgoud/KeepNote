const notesdao = require('./notes.dao');
const uploadNotes = () => notesdao.bulkUpload();
const getNotes = userId => notesdao.getNotes(userId);
const createNote = (note, userId) => notesdao.createNote(note, userId);
const shareNote = (note, userId) => notesdao.shareNote(note, userId);
const streamNotes = () => notesdao.getNotesStream();
const updateNote = (note, noteId) => notesdao.updateNote(note, noteId);

const getFavoriteNotes = (userId) => {
    const promise = new Promise((resolve, reject) => {
        notesdao.getFavoriteNotes(userId, (error, documents) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Found', status: 200, data: documents});
            }
        });
    });
    return promise;
};

const getSharedNotes = (userId) => {
    const promise = new Promise((resolve, reject) => {
        notesdao.getSharedNotes(userId, (error, documents) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Found', status: 200, data: documents});
            }
        });
    });
    return promise;
};

const searchByTitle = (title, userId) => {
    const promise = new Promise((resolve, reject) => {
        notesdao.searchByTitle(userId, title, (error, documents) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Found', status: 200, data: documents});
            }
        });
    });
    return promise;
};

const filterNotes = (category, userId) => {
    const promise = new Promise((resolve, reject) => {
        notesdao.filterNotes(userId, category, (error, documents) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Found', status: 200, data: documents});
            }
        });
    });
    return promise;
};

const multiUpdate = (noteIds, userId, commonUpdateData) => {
    const promise = new Promise((resolve, reject) => {
        const idArray = noteIds.split(',');
        notesdao.multiUpdate(idArray, userId, commonUpdateData, (error, status) => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Updated', status: 200, data: status});
            }
        });
    });
    return promise;
};

const deleteNotes = (idArray, userId) => {
    const promise = new Promise((resolve, reject) => {
        notesdao.deleteNotes(idArray, userId, error => {
            if(error) {
                reject({message: error.message, status: 500});
            } else {
                resolve({message: 'Deleted', status: 200, data: []});
            }
        });
    });
    return promise;
};

module.exports = {
    createNote,
    getNotes,
    getFavoriteNotes,
    getSharedNotes,
    searchByTitle,
    shareNote,
    uploadNotes,
    streamNotes,
    filterNotes,
    updateNote,
    multiUpdate,
    deleteNotes
}
