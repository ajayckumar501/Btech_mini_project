const serviceModel = require("../models/serviceModel");


const serviceController = async (req, res) => {
  const serviceIds = req.body;
  try {
    // Fetch services based on the provided service IDs
    const services = await serviceModel.find({ serviceid: { $in: serviceIds } });

    // Map the fetched services to an array of objects containing both name and ID
    const formattedServices = services.map(service => ({
      id: service.serviceid,
      name: service.servicename
    }));

    // Send the array of objects in the response
    return res.status(200).send({ services: formattedServices });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

const createService = async (req, res) => {
  try {
    const { serviceid, servicename } = req.body;
    
    // Create a new Service document
    const newService = await serviceModel({
      serviceid: serviceid,
      servicename: servicename // Adjust property name to match req.body
    }).save();

    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



const FetchallServices = async (req,res) => {
  try {
    const services = await serviceModel.find({});
    const serviceNames = services.map(service => service.servicename);
    return res.status(200).send({ services: serviceNames });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  serviceController,
  FetchallServices,
  createService,
};