var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var application = require('./application');
// kreiramo novu shemu


var UsersSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // unique: true
  },
  createdAt: Date,
  updatedAt: Date,
  // napomena! komentari su u ovom primeru implementirani kao reference zbog ilustracije rada sa referencama
  // u realnom sluacju bolje bi bilo implementirati ih kao poddokumente
  applications: [application.schema]
});




// prilikom snimanja se postavi datum
UsersSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();

  // postavimo trenutni datum poslednju izmenu
  this.updatedAt = currentDate;

  // ako nije postavljena vrednost za createdAt, postavimo je
  if (!this.createdAt)
    this.createdAt = currentDate;

  // predjemo na sledecu funckiju u lancu
  next();
});

// od sheme kreiramo model koji cemo koristiti
var User = mongoose.model('User', UsersSchema);

// publikujemo kreirani model
module.exports = User;
