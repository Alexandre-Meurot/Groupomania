const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;

// ---------- CREATION D'UN POST -----------

exports.createPost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    if (req.body.content === null || req.body.content.length <= 5) {
        const message = 'Le contenu de votre message doit être supérieur à 5 caractères !'
        return res.status(400).json({ error: message })
    }

    User.findOne({
        where: { id : userId }
    })

        .then(userFound => {
            if (userFound) {
                const post = Post.build({
                    content: req.body.content,
                    media: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.media,
                    post_userId: userFound.id
                })
                post.save()
                    .then(() => {
                        const message = 'Votre post a bien été publié !'
                        res.status(201).json({ message: message })
                    })
                    .catch(error => {
                        const message = "Une erreur s'est produite, votre post n'a pas été publié !"
                        res.status(400).json({ error: message })
                    })
            } else {
                const message = 'Utilisateur non trouvé !'
                return res.status(404).json({ error: message })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ error: message })
        })
}

// ---------- RECUPERATION DES POSTS -----------

exports.getAllPosts = (req, res) => {
    Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [{
            model: User,
            attributes: ['username', 'picture']
        },{
            model: Comment
        }]
    })
        .then(postFound => {
            if (postFound) {
                const message = 'Récupérations des posts réusssi !'
                res.status(200).json({ message: message, data: postFound })
            } else {
                const message = 'Une erreur est survenue lors de la récupération des posts !'
                res.status(404).json({ message: message })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ error: message })
        })
}

// ---------- MODIFICATION D'UN POST -----------

exports.updatePost = (req, res) => {

    const postObject = req.file ?
        {
            content: req.body.content,
            media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    Post.findOne({
        where: { id: req.params.postId }
    })
        .then(postFound => {
            if (postFound) {
                Post.update(postObject, {
                    where: { id: req.params.postId }
                })
                    .then(post => {
                        const message = 'Votre post a bien été modifié !'
                        res.status(200).json({ message: message })
                    })
                    .catch(error =>{
                        const message= "Une erreur s'est produite lors de la modification de votre post !"
                        res.status(400).json({ error: message })
                    })
            } else {
                const message = 'Post non trouvé !'
                res.status(404).json({ error: message })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ error: message })
        })
}

// ---------- SUPRESSION D'UN POST -----------

exports.deletePost = (req, res) => {
    Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
        .then(post => {
            if (post) {
                if (post.media != null) {
                    const filename = post.media.split('/images/')[1]
                    fs.unlink(`images/${filename}`, () => {
                        Post.destroy({
                            where: { id: req.params.postId }
                        })
                            .then(() => {
                                const message = 'Votre publication a bien été supprimé !'
                                res.status(200).json({ message: message })
                            })
                            .catch(() => {
                                const message = "Une erreur s'est produite lors de la supression de votre publication"
                                res.status(500).json({ error: message })
                            })
                    })
                } else {
                    Post.destroy({
                        where: { id: req.params.postId }
                    })
                        .then(() => {
                            const message = 'Votre publication a bien été supprimé !'
                            res.status(200).json({ message: message })
                        })
                        .catch(() => {
                            const message = "Une erreur s'est produite lors de la supression de votre publication"
                            res.status(500).json({ error: message })
                        })
                }
            } else {
                const message = 'Publication non trouvé !'
                return res.status(404).json({ error: message })
            }
        })
        .catch()
}

