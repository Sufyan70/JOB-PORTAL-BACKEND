const express = require ("express")
const { login, register, updateProfile, logout }= require  ("../controllers/userController.js")
const isAuthenticated = require  ("../middlewares/Authenticated.js")
const { singleUpload } = require("../middlewares/multer.js")
const router = express.Router()

router.route('/register').post( singleUpload, register)
router.route('/login').post(login)
router.route('/updateProfile').post(isAuthenticated, updateProfile)
router.route('/logOut').get(logout)

module.exports = router
