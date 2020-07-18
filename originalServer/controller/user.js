const User = require('../../database/User.js');

module.exports = {
  get: (req, res) => {
    console.log('in server GET user loop');
    User.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(`error in get request: ${err}`);
      });
  },
  post: (req, res) => {
    console.log('in server POST user loop');
    const userid = req.body._id;
    const newlikeplace = {
      name: req.body.likeplace,
      list: req.body.list,
      like: req.body.like,
    };
    console.log(newlikeplace);
    User.findByIdAndUpdate(
      { _id: userid },
      { $push: { likeplace: newlikeplace } },
    )
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(404));
  },
  update: (req, res) => {
    console.log('in server PATCH user loop');
    console.log(req.params.placeId);
    console.log(req.body.like);
    User.update(
      { 'likeplace._id': req.params.placeId },
      { $set: { 'likeplace.$.like': req.body.like } },
    )
      .then(() => res.sendStatus(202))
      .catch((e) => {
        console.log(e);
        res.sendStatus(404);
      });
  },

};
