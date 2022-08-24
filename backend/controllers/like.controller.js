const jwt = require('jsonwebtoken');
const db = require('../models');
const Like = db.Like;
const Post = db.Post;


// ---------- LIKER UN POST -----------

exports.likePost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    const isLiked = req.body.like;

    Post.findOne({
        where: { id: req.params.postId }
    })

        .then(postFound => {

            if (!postFound) {

                const message = "La publication n'a pas été trouvé !"
                return res.status(404).json({ message, error })

            } else if (isLiked === false) {

                Like.create({
                    userId: userId,
                    postId: req.params.postId
                })
                    .then(response => {
                        console.log("likes => "+ postFound.likes)
                        Post.update({
                            likes: postFound.likes +1
                        },{
                            where: { id: req.params.postId }
                        })
                            .then(() => {
                                const message = 'Votre like a bien été pris en compte !'
                                res.status(201).json({ message: message })
                            })
                            .catch(error => {
                                const message = "Une erreur s'est produite lors de votre like !"
                                res.status(500).json({ message, error })
                            })
                    })
                    .catch(error => {
                        const message = "Une erreur s'est produite !"
                        res.status(400).json({ message, error })
                    })

            } else if (isLiked === true) {

                Like.destroy({
                    where: {
                        userId: userId,
                        postId: req.params.postId
                    }
                })
                    .then(() => {
                        console.log("likes => "+ postFound.likes)
                        Post.update({
                            likes: postFound.likes -1
                        },{
                            where: { id: req.params.postId }
                        })
                            .then(() => {
                                const message = "Votre dislike a bien été pris en compte"
                                res.status(201).json({ message: message })
                            })
                            .catch(error => {
                                const message = "Une erreur s'est produite lors de votre dislike !"
                                res.status(500).json({ message, error })
                            })
                    })
                    .catch(error => {
                        const message = "Une erreur s'est produite, votre dislike n'a pas été pris en compte !"
                        res.status(400).json({ message, error })
                    })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(400).json({ message, error })
        })
}


// ---------- RECUPERATION DES LIKES -----------

exports.getAllLikes = (req, res, next) => {}