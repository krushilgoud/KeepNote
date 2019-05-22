const router = require('express').Router();
const service = require('./notes.service');
const JSONStream = require('JSONStream');
const socket = require('socket.io-client');
const authenticateUser = require('./notes.auth.helper').authenticateUser;

router.use('/', authenticateUser);

router.post('/', (request, response, next) => {
    console.log("inside notes-post");
    const promise = service.createNote(request.body, request.query.userId);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(errorDetails => next(returnError(errorDetails)));
});

router.put('/:noteId', (request, response, next) => {
    console.log("inside notes-put");
    const promise = service.updateNote(request.body, request.params.noteId);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(errorDetails => next(returnError(errorDetails)));
});

router.get('/', (request, response, next) => {
    const promise = service.getNotes(request.query.userId);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(errorDetails => next(returnError(errorDetails)));
});

router.put('/manage/:noteIds', (request, response, next) => {
    const promise = service.multiUpdate(request.params.noteIds, request.body.userId, request.body);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(reason => next(returnError(reason)));
});

router.delete('/', (request, response, next) => {
    let idArray;
    if(request.query.noteId && request.query.noteId.indexOf(',') > 1) {
        idArray = request.query.noteId.split(',');
    } else if(request.query.noteId){
        idArray = [request.query.noteId];
    } else {
        next(returnError({message: 'invalid data', status: 400}))
    }
    const promise = service.deleteNotes(idArray, request.body.userId);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(reason => next(returnError(reason)));
});

router.get('/favorites', (request, response, next) => {
    const promise = service.getFavoriteNotes(request.query.userId);
    promise.then(success => {
        returnSuccessResponse(success, response)
    }).catch(reason => next(returnError(reason)))
});

router.get('/search', (request, response, next) => {
    const promise = service.searchByTitle(request.query.userId, request.query.title);
    promise.then(success => {
        returnSuccessResponse(success, response)
    }).catch(reason => next(returnError(reason)))
});

router.get('/group', (request, response, next) => {
    const promise = service.filterNotes(request.query.userId, request.query.category);
    promise.then(success => {
        returnSuccessResponse(success, response)
    }).catch(reason => next(returnError(reason)))
});

router.post('/share', (request, response, next) => {
    console.log("inside notes-share");
    const promise = service.shareNote(request.body, request.query.recipientId);
    promise.then(success => returnSuccessResponse(success, response))
    .catch(errorDetails => next(returnError(errorDetails)));
});

router.get('/shared', (request, response, next) => {
    const promise = service.getSharedNotes(request.query.userId);
    promise.then(success => {
        returnSuccessResponse(success, response)
    }).catch(reason => next(returnError(reason)))
});

router.get('/stream', (request, response, next) => {
    const cursor = service.streamNotes();
    cursor.on('error', error => next(returnError({status: 500, message: {message: error.message}})));
    cursor.pipe(JSONStream.stringify()).pipe(response.type('json'));
});

router.post('/stream', (request, response, next) => {
    const promise = service.uploadNotes();
    promise.then(success => {
        success.data.pipe(JSONStream.parse('*')).pipe(response);
    }).catch(reason => next(returnError(reason)));
});

router.post('/shares', (request, response, next) => {
    const promise = service.shareNotes(request.body.username, request.query.user, request.body.items);
    promise.then(success => {
        const client = socket('http://localhost:3000');
        client.emit('logmein', request.body.username);
        client.emit('share', {
            sender: request.body.username,
            receiver: success.data.receiver,
            notes: success.data.notes,
            message: `Hey! ${request.body.username} has shared you notes`
        });
        returnSuccessResponse(success, response);
    }).catch(reason => next(returnError(reason)));
});

function returnError(reason) {
    const error = new Error();
    error.message = reason.message;
    error.status = reason.status;
    return error;
}

function returnSuccessResponse(success, response) {
    const data = success.data;
    response.setHeader('Content-Type', 'application/json');
    response.status(success.status).json(data);
}

module.exports = router;