const express = require ("express")
const isAuthenticated = require  ("../middlewares/Authenticated.js")
const { registerCompany, getCompany, getCompanyById, updateCompany } = require("../controllers/companyController.js")
const router = express.Router()

router.route('/register-company').post( isAuthenticated, registerCompany)
router.route('/get').get( isAuthenticated, getCompany)
router.route('/get/:id').get(isAuthenticated, getCompanyById)
router.route('/update-company/:id').put(isAuthenticated, updateCompany)

module.exports = router
