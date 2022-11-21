const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let listOfPeople = [
    {
        'id': 11,
        'name': "Maria",
        'phone': 158945265
    },
    {
        'id': 12,
        'name': "Paula",
        'phone': 7841025
    },
    {
        'id': 13,
        'name': "Joana",
        'phone': 158958454
    },
    {
        'id': 14,
        'name': "Enrique",
        'phone': 021615745
    },
    {
        'id': 15,
        'name': "Paulino",
        'phone': 4784558
    }
]
function generateId() {
    const lastPerson = listOfPeople[listOfPeople.length - 1];
    return lastPerson.id + 1;
}
app.get('/persons', (req, res) => {

    const searchName = req.query.name;

    if (searchName != undefined) {
        let result = [];

        for (let person of listOfPeople) {
            if (person.name == searchName) {
                result.push(person);
            }
        }
        res.send(result);
    } else {
        res.send(listOfPeople);
    }

})
app.get('/persons/:id', (req, res) => {
    const searchId = req.params.id
    for (person of listOfPeople) {
        if (person.id == searchId) {
            res.send(person);
            return;
        }
    }
    res.status(404);
    res.send({ message: `Person ith Id ${searchId} not found!` });
})
app.post('/persons', (req, res) => {
    let newPerson = req.body;
    newPerson.id = generateId();
    listOfPeople.push(newPerson);
    res.send(listOfPeople);
})
app.put('/persons/:id', (req, res) => {
    let searchId = req.params.id;
    const dataToUpdate = req.body;

    for (let person of listOfPeople) {
        if (searchId == person.id) {
            person.name = dataToUpdate.name;
            person.phone = dataToUpdate.phone;
            res.send(person);
            return;
        }
    }
    res.status(404);
    res.send({ message: `Person ith Id ${searchId} not found!` });

})
app.delete('/persons/:id', (req, res) => {
    let searchId = req.params.id;
   
    for (let pos in listOfPeople) {
        const personId=listOfPeople[pos].id
        if (personId==searchId){
           listOfPeople.splice(pos,1)
            res.status(20);
            
        }
}
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})