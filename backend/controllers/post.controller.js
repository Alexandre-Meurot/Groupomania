const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('../models');
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;
const getAuthUserId = require('../middleware/getAuthUserId.middleware');


// ---------- CREATION D'UN POST -----------

exports.createPost = (req, res) => {

    if (req.body.content === null || req.body.content.length <= 5) {
        const message = 'Le contenu de votre message doit être supérieur à 5 caractères !'
        return res.status(400).json({ error: message })
    }

    if (req.file) {
        Post.create({
            userId: getAuthUserId(req),
            content: req.body.content,
            media: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then(() => {
                const message = 'Votre publication et son média ont bien été créée !'
                res.status(201).json({ message: message })
            })
            .catch(error => {
                const message = 'Une erreur est survenue lors de la création de votre publication et son média !'
                res.status(400).json({ error: message })
            })
    } else {
        Post.create({
            userId: getAuthUserId(req),
            content: req.body.content
        })
            .then(() => {
                const message = 'Votre publication a bien été créée !'
                res.status(201).json({ message: message })
            })
            .catch(error => {
                const message = 'Une erreur est survenue lors de la création de votre publication !'
                res.status(400).json({ error: message })
            })
    }
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
            res.status(500).json({ error })
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

            if (postFound.userId !== getAuthUserId(req)) {
                const message = "Requête non authentifiée, seul l'auteur peut modifier sa propre publication !"
                return res.status(404).json({ error: message })
            }

            if (postFound) {
                Post.update(postObject, {
                    where: { id: req.params.postId }
                })
                    .then(post => {
                        const message = 'Votre post a bien été modifié !'
                        res.status(200).json({ message: message, data: post })
                    })
                    .catch(error =>{
                        const message= "Une erreur s'est produite lors de la modification de votre post !"
                        res.status(400).json({ message, error })
                    })
            } else {
                const message = 'Post non trouvé !'
                res.status(404).json({ message, error })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ message, error })
        })
}

// ---------- SUPRESSION D'UN POST -----------

exports.deletePost = (req, res) => {

    Post.findOne({
        where: { id: req.params.postId }
    })
        .then(post => {

            if (post.userId !== getAuthUserId(req)) {
                const message = "Requête non authentifiée, seul l'administrateur peut supprimer une publication tierse !"
                return res.status(404).json({ error: message })
            }

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
                                res.status(500).json({ message, error })
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
                            res.status(500).json({ message, error })
                        })
                }
            } else {
                const message = 'Publication non trouvé !'
                return res.status(404).json({ message, error })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ message, error })
        })
}



