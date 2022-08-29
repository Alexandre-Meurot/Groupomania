const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;
const getAuthUserId = require('../middleware/getAuthUserId.middleware');


// ---------- CREATION D'UN COMMENTAIRE -----------

exports.createComment = (req, res) => {

    Post.findOne({
        where: { id: req.params.postId }
    })
        .then(postFound => {
            if (postFound) {
                const comment = Comment.build({
                    content: req.body.content,
                    userId: getAuthUserId(req),
                    postId: postFound.id
                })
                comment.save()
                    .then(() => {
                        const message = 'Votre commentaire a bien été publié !'
                        res.status(201).json({ message: message })
                    })
                    .catch(() => {
                        const message = "Une erreur s'est produite lors de la création de votre commentaire !"
                        res.status(400).json({ message, error })
                    })
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

// ---------- RECUPERATION DES COMMENTAIRES -----------

exports.getAllComments = (req, res) => {

    Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: User,
            attributes: [ 'username', 'picture' ]
        }]
    })
        .then(commentFound => {
            if (commentFound) {
                const message = 'Les commentaires ont bien été trouvés !'
                res.status(200).json({ message: message, data: commentFound })
            } else {
                res.status(404).json({  })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ message, error })
        })
}

// ---------- SUPRESSION D'UN COMMENTAIRE -----------

exports.deleteComments = (req, res) => {

    Comment.findOne({
        where: { id: req.params.commentId }
    })
        .then(commentFound => {
            if (commentFound.userId !== getAuthUserId(req)) {
                const message = "Requête non authentifiée, seul l'administrateur peut supprimer le commentaire d'un tiers !"
                return res.status(401).json({ error: message })
            }
            commentFound.destroy()
                .then(() => {
                    const message = 'Le commetaire a bien été supprimé !'
                    res.status(200).json({ message: message, data: commentFound })
                })
                .catch(error => {
                    const message = 'Une erreur est survenue lors de la suppression de votre commentaire !'
                    res.status(500).json({ error: message })
                })
        })
        .catch(error => {
            const message = 'Une erreur est survenue, le commentaire est introuvable !'
            res.status(404).json({ error: message })
        })
}
