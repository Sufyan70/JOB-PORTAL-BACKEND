const Job = require("../models/jobModel");

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).send({ message: "All Fields are Required" });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel: experience,
      location,
      jobType,
      position,
      company: companyId,
      createdby: userId,
    });
    return res.status(201).send({
      success: true,
      message: "New Job Created Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong while creating a Job",
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt: -1})
    if (!jobs) {
      return res.status(404).send({
        message: "Jobs not Found",
        success: false,
      });
    }
    return res.status(201).send({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while getting all Jobs",
      success: false,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).send({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).send({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while getting a Job",
      success: false,
    });
  }
};

exports.getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdby: adminId });
    if (!jobs) {
      return res.status(404).send({
        message: "Jobs not Found",
        success: false,
      });
    }
    return res.status(201).send({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while getting all Jobs",
      success: false,
    });
  }
};
