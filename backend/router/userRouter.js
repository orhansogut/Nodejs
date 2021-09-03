const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", async (request, response) => {
  const usersList = await User.find({});
  response.json(usersList);
});

router.get('/:id', (req, res) => {
    const arananUser = User.find(user => user.id === parseInt(req.params.id));
    if (arananUser) {
        res.send(arananUser)
    } else {
        res.send('<h1>Kullanıcı Bulunamadı....</h1>')
    }
})

router.post("/", async (req, res) => {
  try {
    const eklenecekUser = new User(req.body);
    const { error, value } = eklenecekUser.joiValidation(req.body);
    if (!error) {
      const sonuc = await eklenecekUser.save();
      res.json(sonuc);
    } else {
        res.json({
            mesaj: "Bir Hata Oluştu..."
          });
    }
  } catch (e) {
    res.json({
        mesaj: "Bir Hata Oluştu..."+e.message
      });
  }
});

router.patch('/:id', async (req, res) => {
  delete req.body.createdAt;
  delete req.body.uptadeAt;
  delete req.body.sifre;
    
  const { error, value } = User.joiValidationForUpdate(req.body);
  if (error) {
    res.json({
        mesaj: "Hata"
      });
  } else {
    try {
      const sonuc = await User.findByIdAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true,useFindAndModify :false});
      if (sonuc) {
        return res.json(sonuc);
      } 
      else {
        return res.json({
          mesaj: "Kullanıcı Bulunamadı..."
        });
      }
    } catch (e) {
        res.json({
            mesaj: "Kullanıcı Bulunamadı..."
          });
    }
  }
});

// router.delete('/:id', (req, res) => {
//     const arananUser = usersList.find(user => user.id === parseInt(req.params.id));
//     if (arananUser) {
//         const index = usersList.indexOf(arananUser)
//         usersList.splice(index, 1)
//         res.send(arananUser)
//     } else {
//         res.send('<h1>Kullanıcı Bulunamadı....</h1>')
//     }
// })

module.exports = router;
