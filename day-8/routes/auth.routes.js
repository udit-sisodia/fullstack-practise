const express = require("express")
const noteModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExisted = await noteModel.findOne({ email })

    if (isUserAlreadyExisted) {
        return res.status(409).json({
            message: "User already existed with this email"
        })
    }

    const user = await noteModel.create({
        name, email, password
    })
    
    const token = jwt.sign({
        id: user._id,
        email:user.email

    },
    process.env.JWT_SECRET
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "registered successfully",
        user,
        token
    })
})


module.exports = authRouter