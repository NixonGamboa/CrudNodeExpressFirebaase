const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://databasenodejs-default-rtdb.firebaseio.com/",
});

const db = admin.database();

router.get("/", (req, res) => {
  db.ref("contactos").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("index", { contactos: data });
  });
});

router.post("/new-contact", (req, res) => {
  console.log(req.body);
  const newContact = {
    nombre: req.body.firstname,
    apellido: req.body.lastname,
    correo: req.body.email,
    telefono: req.body.phone,
  };

  db.ref("contactos").push(newContact);
  res.redirect("/");
});

router.get("/delete-contact/:id", (req, res) => {
  db.ref("contactos/" + req.params.id).remove();
  res.redirect("/");
});
module.exports = router;
