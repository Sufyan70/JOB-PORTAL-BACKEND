const Company = require("../models/companyModel");

exports.registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Company name is Required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).send({
        message: "You can't register a Company Using a Same Name",
        success: false,
      });
    }
    company = await Company.create({
      name: name,
      userId: req.id,
    });
    return res.status(200).send({
      message: "Comapny registered Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while register a Company",
      success: false,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).send({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Companies found Successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while get Company",
      success: false,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById( companyId );
    if (!company) {
      return res.status(400).send({
        message: "company not found",
        success: false,
      });
    }
    return res.status(201).send({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong in getCompany by Id",
      success: false,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updatedData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!company) {
      returnres.status(404).send({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(201).send({
      message: "Company Information Updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while update a Company",
      success: false,
    });
  }
};
