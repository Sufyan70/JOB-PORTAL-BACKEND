const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

exports.applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).send({
        message: "Job Id is required",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).send({
        message: "you have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({
        message: "job not found",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).send({
      message: "Job applied Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while applying a job",
      success: false,
    });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).send({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(201).send({
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Some issue while getting applied jobs",
      success: false,
    });
  }
};

exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).send({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(201).send({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while get Applicants",
      success: false,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).send({
        message: "Status is require",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).send({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).send({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while updating status",
      success: false,
    });
  }
};
