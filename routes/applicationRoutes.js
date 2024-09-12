const express = require ("express")
const isAuthenticated = require  ("../middlewares/Authenticated.js")
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controllers/applicationController.js")
const router = express.Router()

router.route("/apply/:id").get(isAuthenticated,applyJob)
router.route('/get').get(isAuthenticated,getAppliedJobs)
router.route("/:id/applicants").get(isAuthenticated,getApplicants)
router.route('/updateStatus/:id').post(isAuthenticated,updateStatus)

module.exports = router
