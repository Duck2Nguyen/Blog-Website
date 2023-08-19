const Noti = require("../models/notificationmodel");


const init_noti = (req, res) => {
    const noti = new Noti({
        userId: req.body.userId,
        data: req.body.data,
    });
    noti
        .save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
};


const getNotiByUserId = (req, res) => {
    Noti.find({ userId: req.query.userId })
        .sort({ updatedAt: -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send("Error");
        });
};


const editLike = (req, res) => {
    Like.find({ blogId: req.body.blogId })
        .sort({ updatedAt: -1 })
        .then((result) => {
            const id = result[0]._id
            const count = parseInt(result[0].count) + parseInt(req.body.number);
            let listUserId = result[0].listUserId;
            if (listUserId.length !== 0) {
                listUserId.push(req.body.userId)
            } else {
                listUserId = [req.body.userId]
            }
            Like.findByIdAndUpdate(id, {
                blogId: result[0].blogId,
                listUserId: listUserId,
                count: count,
            })
                .then((result2) => {
                    res.send(result2);
                })
                .catch((err) => {
                    res.send(err);
                });

        })
        .catch((err) => {
            res.send("Error");
        });
};




module.exports = { init_noti, getNotiByUserId };