const serviceModel = require("../models/serviceModel");
const serviceController = async (req, res) => {
  const  serviceIds  = req.body;
  try {
    const services = await serviceModel.find({ service_id: { $in: serviceIds } });
    const serviceNames = services.map(service => service.service_name);
    return res.status(200).send({ services:serviceNames });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const FetchallServices = async (req,res) => {
  try {
    const services = await serviceModel.find({});
    const serviceNames = services.map(service => service.service_name);
    return res.status(200).send({ services: serviceNames });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  serviceController,
  FetchallServices,
};