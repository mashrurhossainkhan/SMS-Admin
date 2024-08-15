//  Author: Mohammad Jihad Hossain
//  Create Date: 24//03/2021
//  Modify Date: 24/03/2021
//  Description: Vaalidation response file for rest api project for FamousAuto


const {validationResult} = require('express-validator')

module.exports = {
    validationResponse: (req, res, next) =>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            let error_list = {}

            errors.errors.forEach(error =>{
                error_list[error.param] = {
                    "value":error.value,
                    "msg":error.msg
                }
            })
            return res.status(422).json({"errors": error_list})
        }
        next()
    }
}
