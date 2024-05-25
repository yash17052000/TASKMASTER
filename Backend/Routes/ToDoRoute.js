const {Router}=require("express")
const {  saveToDo, updateToDo, deleteToDo ,getToDo,registerUser} = require("../controllers/ToDoController")
const router=Router()

router.post("/register",registerUser)



router.get('/',getToDo)
router.post("/save", saveToDo);
router.post("/update",updateToDo)
router.post("/delete",deleteToDo)

module.exports=router