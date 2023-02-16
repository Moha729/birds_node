const express = require("express")
const app = express()

console.log('program is running...')

function getBirds() {
    const birds = []

    const bird1 = {
        type: "blackbird"
    }
    const bird2 = {
        type: "Chaffinch"
    }
    const bird3 = {
        type: "Greenish"
    }

    birds[0] = bird1
    birds[1] = bird2
    birds[2] = bird3

    return birds
}

//GET ALL
app.get("/birds", (req, res)=>{

    const birds = getBirds()

    res.send( birds)
})

//GET ONE
app.get("/birds:type", (req, res)=>{
    //console.log(req.params)
    res.send({message: "hello"})
})//I can't make it work :(


app.listen(8080)