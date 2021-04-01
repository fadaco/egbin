const LeaveRequest = require('../models').LeaveRequest;
const User = require('../models').User
const {JsonResponse} = require('../shared/methods');
const momentMac = require('moment');
const moment = require('moment-business-days');

const saveItem = async (req, res, initialTemp, newValue, userFind) => {
    await LeaveRequest.create({
        typeOfLeave: req.body.typeOfLeave,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        resumptionDate: req.body.resumptionDate,
        userId: req.user.id,
        status: 'pending',
        dateRequested: momentMac(new Date).format('YYYY-MM-DD h:mm:ss'),
        initialLeaveBalance: initialTemp,
        finalLeaveBalanceAfterApproval: newValue
     })
     await userFind.save()

     return res.status(201).send(JsonResponse(201, 'leave request created', ))
}

 
module.exports = {

    async request_leave(req, res) {
        const diff = moment(req.body.startDate, 'YYYY-MM-DD').businessDiff(moment(req.body.endDate,'YYYY-MM-DD'));

        if (diff > 14) {
            return res.status(400).send(JsonResponse(400, "you cannot take leave of more than 14 days"))
        }
        const userFind = await User.findOne({where: {id: req.user.id}});

        let initialTemp;
        let newValue;

        if (req.body.typeOfLeave === 'sick leave') {
          if(userFind.sick_leave_balance > 0) {
             if(diff > userFind.sick_leave_balance) {
                 return res.status(400).send(JsonResponse(400, `your sick leave are limited to ${userFind.sick_leave_balance}`))
             } else {
                  initialTemp = userFind.sick_leave_balance;
                  newValue = userFind.sick_leave_balance - diff;
                 userFind.sick_leave_balance  = newValue;
                 
                saveItem(req, res, initialTemp, newValue, userFind)
             }
          } else {
              return res.status(400).send(JsonResponse(400, "you cannot take any more sick leave"))
          }
    
        } else if(req.body.typeOfLeave === 'exam leave') {
            if(userFind.exam_leave_balance  > 0) {
                if (diff > userFind.exam_leave_balance) {
                    return res.status(400).send(JsonResponse(400, `your exam leave are limited to ${userFind.exam_leave_balance}`))

                } else {
                    initialTemp = userFind.exam_leave_balance;
                    newValue = userFind.exam_leave_balance - diff;
                   userFind.exam_leave_balance  = newValue;
                   
                  saveItem(req, res, initialTemp, newValue, userFind)
                }
            } else {
                return res.status(400).send(JsonResponse(400, "you cannot take any more exam leave"))
            }
        } else {
            if(userFind.annual_leave_balance  > 0) {
                if (diff > userFind.annual_leave_balance) {
                    return res.status(400).send(JsonResponse(400, `your annual leave are limited to ${userFind.annual_leave_balance}`))

                } else {
                    initialTemp = userFind.annual_leave_balance;
                    newValue = userFind.annual_leave_balance - diff;
                   userFind.annual_leave_balance  = newValue;
                   
                  saveItem(req, res, initialTemp, newValue, userFind)
                }
            } else {
                return res.status(400).send(JsonResponse(400, "you cannot take any more annual leave"))

            }
        }
    },
    async manage_leave(req, res) {
        const leaveRequest = await LeaveRequest.findOne({where: {id: req.body.id}});
        const user = await User.findOne({where: {id: leaveRequest.userId}});
        if (user.line_manager_staff_id === req.user.id) {
              leaveRequest.dateApproved = momentMac(new Date()).format('YYYY-MM-DD h:mm:ss');
             leaveRequest.status = req.body.status;
              await leaveRequest.save()
              return res.status(200).send(JsonResponse(200, `successfully ${req.body.status}`, leaveRequest))
        } else {
            return res.status(400).send(JsonResponse(400, "unable to approve, because you are not the line manager"))
        }
    }
}