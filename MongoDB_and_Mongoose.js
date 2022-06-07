require('dotenv').config();
const mongoose = require ("mongoose");
var Schema = mongoose.Schema;
let person;


mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });


// -------------------------
const personSchema=new Schema({
  name: { type: String, require: true },
  age: { type: Number},
  favoriteFoods: [String ],
})
const Person = mongoose.model("Person", personSchema);
let anotherPerson = function(done) {
  return new Person({
    name: "ajithshah",
    age: 22,
    favoriteFoods: ["Briyani", "chicken"],
  });
  if(error) return done(error);
  done(null, error);
};
// -------------------------


const createAndSavePerson = async(done) => {
  var personDetail = new Person({name: "Ajith", age: 22, favoriteFoods: ["Briyani", "chicken 65"]});
  
  await personDetail.save((err, data) => {
    if (err) {
      done(err, null);
    }
      done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople);
  Person.create(arrayOfPeople, (err, data) => {
    if(err) {
      done(err); 
     }
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},  (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if(err) return console.log(err);
    done(null, foodFound)
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, foundId) => {
    if(err) return console.log(err);
    done(null, foundId);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, data) => {
    data.favoriteFoods.push(foodToAdd)
    data.save(function(err, data){
      if (err) return done(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName}, 
                                        {age: ageToSet}, 
                                        {new: true}, (err, data) =>{
    if(err) return err;
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, (err, data) => {
    if(err) return err;
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteOne({name: nameToRemove}, (err, data) => {
    if(err) return err;
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
                                  .sort({name: 1})
                                  .limit(2)
                                  .select({age: 0})
                                  .exec((err, data) => {
    if(err) return err;
    done(null, data);
  });
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
