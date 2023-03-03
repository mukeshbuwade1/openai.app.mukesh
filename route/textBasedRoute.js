const express = require("express")
const {createAnswer} = require("../controller/textBasedController");

const router = express.Router()

//completions||Post
router.post("/completions", createAnswer)

module.exports = router