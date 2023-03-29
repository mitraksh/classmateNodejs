const { check, validationResult } = require('express-validator');

const validateExaminer = () => 
        [check('firstName').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
        check('lastName').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
        check('email').isEmail().withMessage('Must be an email').not().isEmpty().withMessage('Should not be empty'),
        check('password').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
        check('subjectId').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty').isLength({ max: 5, min:5 }).withMessage('Must be 5 characters only'),
        // check('isAdmin').isBoolean().withMessage('Must be a boolean').not().isEmpty().withMessage('Should not be empty')
       ];

const validateLogin = () => 
    [
    check('email').isEmail().withMessage('Must be an email').not().isEmpty().withMessage('Should not be empty'),
    check('password').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty')
    ];
    
const validateStudent = () => 
    [check('firstName').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
    check('lastName').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
    check('email').isEmail().withMessage('Must be an email').not().isEmpty().withMessage('Should not be empty'),
    check('password').isString().withMessage('Must be a string').not().isEmpty().withMessage('Should not be empty'),
    check('standard').isInt().withMessage('Must be an Integer').not().isEmpty().withMessage('Should not be empty').isLength({ max: 2, min:1 }).withMessage('Length must be minimun 1 and maximum 2.'),
    // check('isAdmin').isBoolean().withMessage('Must be a boolean').not().isEmpty().withMessage('Should not be empty')
    ];

const reporter = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    next();
}
    
module.exports = {
    validateExaminer: [
    validateExaminer(),
    reporter
    ],
    validateLogin:[
        validateLogin(),
        reporter
    ],
    validateStudent:[
        validateStudent(),
        reporter
    ]
}