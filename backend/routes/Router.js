const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));

//teste route
router.get("/", (req, res) => {
    res.send("API working, boy!");
});

module.exports = router;