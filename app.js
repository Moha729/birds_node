const express = require("express")//import express
const app = express()//instanciate express

app.use(express.json())//Access the json library within expree

const birds = []//instanciate an in-memory empty array

let nextId = birds.length//simualating the auto_increment fucntion from MySql id_column

function getNextId() {
    return ++nextId 
}//automatically incrementing the index

getDefaultBirds()

function getDefaultBirds() {
    if(birds.length === 0){
        makeBird(getNextId(), "blackbird", 'Turdus', 'merula')
        makeBird(getNextId(), "Chaffinch", 'Fringilla', 'coelebs')
        makeBird(getNextId(), "Greenish", 'Phylloscopus', 'trochiloides')
        makeBird(getNextId(), "House sparrow", 'Passer', 'domesticus')     
    }
}

function getBird(birds, id) {
    return birds.find(bird => bird.id === Number(id))
}

function makeBird(id, type, family, breed){
    const bird = {
        id: id,
        type: type,
        family: family,
        breed: breed
    }
    birds.push(bird)
    return bird
}

//REDIRECT  
app.get("/", (req, res) => {
    res.redirect('/birds')
})

//GET ALL
app.get("/birds", (req, res)=>{
    res.send( {data:  birds})
})

//GET ONE
app.get("/birds/:id", (req, res)=>{
    const bird = getBird(birds, Number(req.params.id))
    res.send({data: bird})
})

//POST
app.post('/birds', (req, res) => {
    const bird = makeBird(getNextId(), req.body.type, req.body.family, req.body.breed)
    res.send({data: bird})
})

//PACTH
app.patch('/birds/:id', (req, res) => {
    const bird = getBird(birds, Number(req.params.id))
    bird = Object.assign(bird, req.body)
    res.send( {data: bird})
})

//DELETE
app.delete('/birds/:id', (req, res) => {
    const bird = getBird(birds, Number(req.params.id))
    const birdIndex = birds.indexOf(bird)
    birds.splice(birdIndex, 1)
    res.send({message: 'succcessfully deleted', bird: bird})
})



app.listen(8080, () => {
    console.log('Server is running on port', 8080)//callback function
})