require('dotenv').config()


const { request } = require('express')
const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: "tsotne",
        Title: "post 1"
    },
    {
        username: "tsotne",
        Title: "post 2"
    }
]



app.get('/post',authenticateToken, (req, res) => {


    
    res.json(posts.filter(post=>post.username===req.User.name))
   

})

app.post('/Login', (req, res) => {

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accessToken: accessToken })

})

function authenticateToken(req, res, next) {

    const authHeader = req.Header['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)


    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

        req.use = user
        next()

    })

}



app.listen(3000)


