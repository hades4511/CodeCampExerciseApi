const express = require('express');
const { body } = require('express-validator');

const exerControllers = require('../controllers/exercise');

const router = express.Router();

router.post(
    '/add',
    [
        body('userId')
            .trim()
            .notEmpty(),
        body('description')
            .trim()
            .notEmpty(),
        body('duration')
            .trim()
            .notEmpty()
            .isNumeric()
    ],
    exerControllers.addExercise
)

router.get('/log', exerControllers.getExecises);

module.exports = router;