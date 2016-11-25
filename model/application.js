var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu

var ApplicaitionSchema = new Schema({
  app_name: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
});

ApplicaitionSchema.pre('save', function(next) {
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


// publikujemo kreirani model
module.exports = mongoose.model('Application', ApplicaitionSchema);