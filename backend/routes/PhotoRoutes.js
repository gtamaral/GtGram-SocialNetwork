const express = require("express");
const router = express.Router();

//controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controllers/photoController");

//middlewares
const {photoInsertValidation, photoUpdateValidation, commentValidation} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload")


//routes =====> obs: the order its important.
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto)
router.get("/", getAllPhotos)
router.get("/user/:id", getUserPhotos)
router.get("/search", searchPhotos)

router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard,photoUpdateValidation(), validate, updatePhoto)
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard,commentValidation(), validate, commentPhoto )

module.exports = router;
