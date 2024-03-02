const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose.set('strictQuery',false)

if (process.argv.length<3) {
  console.log('missing args')
  process.exit(1)
}

if (process.argv.length === 3) {
  const password = process.argv[2]

  const url =
    `mongodb+srv://tufourn:${password}@cluster0.2j4ibw8.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

  console.log('phonebook:')
  mongoose.connect(url)
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 4) {
  console.log('missing number')
  process.exit(1)
}

if (process.argv.length === 5) {
  console.log('adding person')
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url =
    `mongodb+srv://tufourn:${password}@cluster0.2j4ibw8.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.connect(url)

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
