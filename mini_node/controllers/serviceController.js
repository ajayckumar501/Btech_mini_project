const serviceModel = require("../models/serviceModel");
const serviceController = async (req, res) => {
  const serviceIds = req.body;
  try {
    // Fetch services based on the provided service IDs
    const services = await serviceModel.find({ service_id: { $in: serviceIds } });

    // Map the fetched services to an array of objects containing both name and ID
    const formattedServices = services.map(service => ({
      id: service.service_id,
      name: service.service_name
    }));
    console.log(formattedServices);

    // Send the array of objects in the response
    return res.status(200).send({ services: formattedServices });
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