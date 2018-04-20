module.exports = function (app) {
    const db = require('../../Database/database.js');

    app.route('/blackboard/posts').get(function (req, res) {
        const circleId = req.query.circleId;

        if (argumentMissing(res, circleId)) return;

        db.Blackboard.Post.findAll({
            where: {CircleId: circleId}, include: [{model: db.User, attributes: ['id', 'name']},
                {model: db.Blackboard.Comment, include: [db.User], limit: 3},
            ], order: [['createdAt', 'DESC']]
        }).then(result => {
            if (result.length === 0) {
                res.json({msg: 'No Circles'});
            }
            else {
                console.log(result);
                res.status(200).json(result);
            }
        }).error(err => {
            res.status(500).json({
                message: "Error while reading posts",
                error: err
            });
        });
    });

    app.route('/blackboard/newPost').post(function (req, res) {
        const circleId = req.body.circleId;
        const userId = req.body.userId;
        const title = req.body.title;
        const text = req.body.text;

        if (argumentMissing(res, circleId, userId, title, text)) return;

        db.Blackboard.create({
            userId: userId,
            circleId: circleId,
            title: title,
            body: text,
        }).then(post => {
            res.status(200).json(post);
        }).error(err => {
            res.status(500).json({
                message: 'Post not created',
                error: err
            })
        });
    });

    app.route('/blackboard/newComment').post(function (req, res) {
        const comment = req.body.com;
        console.log("\n\nComment", comment);
        db.Blackboard.Comment.create({
            "body": comment.body,
            "PostId": comment.postID,
            "UserId": req.session.userId,
        }).then(result => {
            console.log(result);
        }).error(err => {
            res.status(500).send("Error while posting comment");
        });
    });

    app.route('/blackboard/comments').get(function (req, res) {
        const postID = req.query.postID;

        db.Blackboard.Comment.findAll({
            where: {Postid: postID}, include: [{model: db.User, attributes: ['id', 'name']},
            ], order: [['createdAt', 'ASC']]
        }).then(result => {
            if (result.length === 0) {
                res.json({msg: 'No Comments'});
            } else {
                console.log(result);
                res.status(200).json(result);
            }
        }).error(err => {
            res.status(500).json({
                message: "Error while reading comments",
                error: err
            });
        });
    });

    app.route('/blackboard/deletePost').post(function (req, res) {
        const postID = req.body.postID;
        const userId = req.session.userId;

        console.log('controller: deletePost', postID);
        db.Blackboard.Post.destroy({
            where: {
                PostId: postID
                // UserId: userId
            }
        }).error(err => {
            res.json({
                message: "No Posts found or you are not allowed",
                error: err
            });
        });
    });
};