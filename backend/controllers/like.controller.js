const jwt = require('jsonwebtoken');
const db = require('../models');
const Like = db.Like;
const Post = db.Post;
const User = db.User;
const getAuthUserId = require('../middleware/getAuthUserId.middleware')


// ---------- LIKER UN POST -----------

exports.likePost = (req, res) => {

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
                    userId: getAuthUserId(req),
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
                        userId: getAuthUserId(req),
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

exports.getAllLikes = (req, res) => {

    Like.findAll({
        where: { postId: req.params.postId },
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(likePostFound => {
            if (likePostFound) {
                const message = 'Les likes de cette publication ont bien été trouvés !'
                res.status(200).json({ message: message, data: likePostFound })
            } else {
                const message = "Aucun like(s) trouvé(s) !"
                res.status(404).json({ message, error })
            }

        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ message, error })
        })
}