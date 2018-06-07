import express from 'express'
import controller from './controller'

let router = express.Router()

router.route('/users')
    .get(controller.readAll)


export default router