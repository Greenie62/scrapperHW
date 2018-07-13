var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ClimbsSchema = new Schema({
  // `title` is required and of type String
  link: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  
  location: {
      type:String,
      required:true,
  },
  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Climbs = mongoose.model("Climbs", ClimbsSchema);

// Export the Article model
module.exports = Climbs;