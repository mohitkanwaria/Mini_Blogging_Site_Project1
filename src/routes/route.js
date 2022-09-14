const express  = require("express")
const router =express.Router()
const authorController =require("../Controller/authorController")
const blogController =require("../Controller/blogController")
const middleware = require('../middleWare/auth')

//**************************AUTHOR API's****************** */

// Create auhtor // authorLogin
router.post("/authors",authorController.createAuthor)
router.post("/login",authorController.authorLogin)

//*************************BLOG API's**************** */

//Create blog // get blogs //update blog //delete blogs by path params //delete blogs by query params
router.post("/blogs" , middleware.authentication, blogController.createBlog)
router.get("/blogs" , middleware.authentication, blogController.getBlogs)
router.put("/blogs/:blogId" , middleware.authentication, middleware.authorization, blogController.updateBlog)
router.delete("/blogs/:blogId" , middleware.authentication, middleware.authorization, blogController.deleteBlog)
router.delete('/blogs', middleware.authentication, blogController.deleteFilteredBlog)



module.exports = router;