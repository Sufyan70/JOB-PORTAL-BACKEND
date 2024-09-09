const express = require ("express")
const isAuthenticated = require  ("../middlewares/Authenticated.js")
const { postJob, getAllJobs, getJobById, getAdminJobs } = require("../controllers/jobController.js")
const router = express.Router()

router.route('/postJob').post(isAuthenticated,postJob)
router.route('/getJobs').get(isAuthenticated,getAllJobs)
router.route('/get/:id').post(isAuthenticated,getJobById)
router.route('/getAdminJobs').post(isAuthenticated,getAdminJobs)
 
module.exports = router
