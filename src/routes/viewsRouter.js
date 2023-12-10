import { Router } from "express";
const router = Router();

//vistas
router.get("/", (req,res)=>{
    res.render("home",{})
})

export {router as ViewsRouter}