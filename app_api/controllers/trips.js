const mongoose = require('mongoose'); //.set('debug', true)
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        if (!trips) {
            return res.status(404).json({ "message": "trips not found" });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    try {
        const trip = await Model.find({ 'code': req.params.tripCode }).exec();
        if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
};

const tripsAddTrip = async (req, res) => {
    try {
        const trip = Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        if (!trip) {
            return res.status(400).json({ "message": "invalid content" });
        } else {
            return res.status(201).json(trip);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
}

const tripsUpdateTrip = async (req, res) => {
    try {
        const trip = await Model.findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true }).exec();
        if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        } else {
            return res.status(201).json(trip);
        }
    } catch (err) {
        return res.status(404).json(err);
    }
}

const tripsDeleteTrip = async (req, res) => {
    try {
      const trip = await Model.findOneAndDelete({ 'code': req.params.tripCode }).exec();
      if (!trip) {
        return res.status(404).json({ "message": "trip not found" });
      } else {
        return res.status(200).json({ "message": "trip deleted" });
      }
    } catch (err) {
      return res.status(404).json(err);
    }
  }

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};