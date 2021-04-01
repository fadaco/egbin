const User = require('../models').User;
const Staff = require('../models').Staff;
const brcypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JsonResponse} = require('../shared/methods.js');
const {register_schema} = require('../validations/register');
 
module.exports = {
    register(req, res) {
      if(!req.body.staff_id) return res.status(400).send(JsonResponse(400, 'StaffId must not be empty'))
      if(!req.body.password) return res.status(400).send(JsonResponse(400, 'Password must not be empty'))

  brcypt.hash("password", 10).then((hash) => {
   return User.create({
       staff_id: "admin",
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       type: 'admin',
       password: hash
   })
   .then(user => res.status(201).send(JsonResponse(201, 'operation successful', user)))
   .catch(error => res.status(400).send(JsonResponse(400, 'operation failed', error)));
  })
    },
  
    create(req, res) {
       if(!req.body.staff_id) return res.status(400).send(JsonResponse(400, 'Staff Id must not be empty'))
       if(!req.body.password) return res.status(400).send(JsonResponse(400, 'Password must not be empty'))

   brcypt.hash(req.body.password, 10).then((hash) => {
    return User.create({
        staff_id: req.body.staff_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        type: 'staff',
        line_manager_staff_id: req.user.id,
        sick_leave_balance: 10,
        exam_leave_balance: 5,
        annual_leave_balance: 20,
        password: hash
    })
    .then(user => res.status(201).send(JsonResponse(201, 'operation successful', user)))
    .catch(error => res.status(400).send(JsonResponse(400, 'operation failed', error)));
   })
        
    },

    async login(req, res) {
    
      if(!req.body.staff_id) return res.status(400).send(JsonResponse(400, 'Staff Id must not be empty'))
      if(!req.body.password) return res.status(400).send(JsonResponse(400, 'Password must not be empty'))

       const user = await User.findOne({ where: { staff_id: req.body.staff_id } });
       if(!user) return res.status(400).send(JsonResponse(400, 'user not found', 'user not found'));
      const checkForValidPassword = await brcypt.compare(req.body.password, user.password);
      if(!checkForValidPassword) return res.status(400).send(JsonResponse(400, 'invalid password', 'invalid password'));
      const token = jwt.sign({id: user.id, type: user.type}, process.env.TOKEN_SECRET);
      res.header('Authorization', token);


      let data = {
        staff_id: user.staff_id,
        token: token
    };

      return res.status(200).send(JsonResponse(200, 'operation successful', data))
    },

    

    //  fetch_customer_transactions(req, res) {
    //  Customer_Transactions.findAll({
    //         where: {
    //             customer_id: 2
    //           }
    //     }).then((customer_transactions) => res.status(200).send(JsonResponse(200, 'operation successful', customer_transactions)))
    //      .catch((error) => res.status(200).send(JsonResponse(400, 'operation failed', error)))
          
    // }
}