const userController = require('../controllers').user;
const leaveRequestController = require('../controllers').leaveRequest;
const {auth, admin, staff} = require('../middleware/auth');

module.exports = (app) => {
   app.post('/api/user/register', userController.register),
   app.post('/api/user/add-staff', [auth, admin], userController.create),
   app.post('/api/user/login', userController.login),
   app.post('/api/create-leave-request', [auth, staff], leaveRequestController.request_leave),
   app.post('/api/manage-request', [auth, admin], leaveRequestController.manage_leave)
}