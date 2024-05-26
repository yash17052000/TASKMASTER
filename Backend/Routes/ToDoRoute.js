const {Router}=require("express")
const {  saveToDo, updateToDo, deleteToDo ,getToDo,registerUser, loginUser, logoutUser} = require("../controllers/ToDoController")
const { lists } = require("../controllers/List")
const { verifyJWT } = require("../middleware/auth")
const router=Router()

router.post("/register",registerUser)
router.post("/login",loginUser)

router.post("/logout",verifyJWT,  logoutUser)

router.get('/',getToDo)
router.post("/save",verifyJWT ,saveToDo);
router.post("/update",updateToDo)
router.post("/delete",deleteToDo)
router.post("/list",lists)
module.exports=router