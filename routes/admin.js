const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("../utils/database");

const app = express();

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  db.execute("SELECT * FROM datas")
    .then((result) => {
      const rows = result[0];
      console.log(rows);
      res.render(path.join(__dirname, "..", "views", "index.ejs"), { rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});
router.post("/added", function (req, res, next) {
  const namee = req.body.name;
  const emaile = req.body.email;
  const phonee = req.body.phone;
  db.execute("INSERT INTO datas(name,email,phone)VALUES(?,?,?)", [
    namee,
    emaile,
    phonee,
  ])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});
router.get("/delete/:Id", (req, res) => {
  const id = req.params.Id;
  db.execute("DELETE FROM datas WHERE Id = ?", [id])
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
