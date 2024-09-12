const express = require ("express")
const isAuthenticated = require  ("../middlewares/Authenticated.js")
const { postJob, getAllJobs, getJobById, getAdminJobs } = require("../controllers/jobController.js")
const router = express.Router()

router.route('/postJob').post(isAuthenticated,postJob)
router.route('/getJobs').get(isAuthenticated,getAllJobs)
router.route('/get/:id').get(isAuthenticated,getJobById)
router.route('/getAdminJobs').get(isAuthenticated,getAdminJobs)
 
module.exports = router
