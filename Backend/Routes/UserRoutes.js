const express = require("express")
const router = express.Router()
const {SignUp, Login, EditAcc, getCurrentUser} = require("../Controllers/UserController")
const VerifyToken = require("../Middlewares/VerifyToken")
const { validateMiddleware } = require("../Middlewares/validator")
const { validateUserSignUp } = require("../Middlewares/RequestValidator")


router.post("/sign-up", validateMiddleware(validateUserSignUp),  SignUp)
router.post("/login",  Login)
// Private Route
// router.post("/editAcc", verifyToken, editacc)
router.get("/currentUser", VerifyToken, getCurrentUser)
router.put("/editProfile", VerifyToken, EditAcc)
module.exports = router

