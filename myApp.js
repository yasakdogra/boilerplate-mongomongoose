require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let john = Person({
    name: "John",
    age: 30,
    favoriteFoods: ["eggs", "coffee"],
  });
  john.save(function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    if (err) done(err);
    else {
      data.favoriteFoods.push("hamburger");
      data.save(function (err2, data2) {
        if (err2) done(err2);
        else done(null, data2);
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOne(
    { name: personName },
    function (err, data) {
      if (err) done(err);
      else {
        data.age = 20;
        data.save(function (err2, data2) {
          if (err2) done(err2);
          else done(null, data2);
        });
      }
    },
    { new: true },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) done(err);
    else done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
