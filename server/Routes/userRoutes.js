const {register, login, SetAvtar, allUsers} = require('../controllers/usersController')

const router = require("express").Router();


router.post("/register",register );
router.post("/login",login );
router.post("/setavatar/:id",SetAvtar );
router.get('/allusers/:id', allUsers);
module.exports = router;