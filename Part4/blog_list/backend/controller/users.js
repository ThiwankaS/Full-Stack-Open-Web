const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../model/uesr')

userRouter.post('/', async (request,response,next) => {
    const { username,name,password } = request.body
    const salRounds = 10
    const passwordHash = await bcrypt.hash(password,salRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/', async (request,response,next) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = userRouter