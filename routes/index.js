const userController = require('../controllers').user;
const leaveRequestController = require('../controllers').leaveRequest;
const {auth, admin, staff} = require('../middleware/auth');

module.exports = (app) => {
   app.post('/api/user/register', userController.register),
   app.post('/api/user/add-staff', [auth, admin], userController.create),
   app.post('/api/user/login', userController.login),
   app.post('/api/create-leave-request', [auth, staff], leaveRequestController.request_leave),
   app.post('/api/manage-request', [auth, admin], leaveRequestController.manage_leave)
   app.get('/api/leave-request', [auth, admin], leaveRequestController.get_leave_request),
   app.get('/api/get-all-staff', [auth, admin], userController.fetch_all_staff),
   app.post('/api/user/edit-staff', [auth, admin], userController.edit_staff),
   app.post('/api/user/delete-staff', [auth, admin], userController.delete_staff),
   app.get('/api/your-leave-request', [auth, staff], leaveRequestController.get_your_leave_request)
}