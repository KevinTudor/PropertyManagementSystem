const mongoose = require('mongoose');
const url = "mongodb+srv://admin:rlkQ1HOjBUWjNwol@cluster0.rtsqfn0.mongodb.net/?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  module.exports = InitiateMongoServer;