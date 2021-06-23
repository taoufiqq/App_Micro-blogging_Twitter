exports.userSignupValidator = (req, res, next) => {

    req.check('name', 'Name is required !')
       .notEmpty();
       
    req.check('email', 'Email is required !')
       .notEmpty()
       .isEmail()
       .withMessage('email should to respect email format !');
       
    req.check('password', 'Password is required ! ')
       .notEmpty()
       .isLength({min: 6, max: 20})
       .withMessage('Password must between 6 and 10 Caractéres');
       
    const errors = req.validationErrors()

    if(errors){
        return res.status(400).json({
           error: errors[0].msg
        })
    }

    next()
}