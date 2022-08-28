const bcrypt = require('bcrypt');
require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator')
const db = require('../models');
const User = db.User;
const getAuthUserId = require('../middleware/getAuthUserId.middleware')

const schema = new passwordValidator();
schema
    .is().min(6) /*** minimum 6 caractères ***/
    .is().max(15) /*** maximum 15 caractères ***/
    .has().uppercase() /*** mot de passe doit contenir des lettres majuscules ***/
    .has().lowercase() /*** mot de passe doit contenir des lettres miniscules  ***/
    .has().digits(2) /*** mot de passe doit contenir deux chiffres minimun ***/
    .has().not().spaces() /*** mot de passe ne doit pas avoir d'espace ***/


// ---------- CREATION D'UN UTILISATEUR -----------

// TODO redéfinir un regEx pour le username : avec chiffres autorisés + la mettre en place

exports.signup = async (req, res) => {

    const usernameRegex = /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z\s]{3,20})$/;
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    try {

        const userMail = await User.findOne({
            where: {email: req.body.email}
        })
        const userUsername = await User.findOne({
            where: {username: req.body.username}
        })

        if (userMail !== null) {
            if (userMail.email === req.body.email) {
                const message = "Cet adresse email est déjà utilisé !"
                return res.status(400).json({error: message})
            }

        } else if (userUsername !== null) {
            if (userUsername.username === req.body.username) {
                const message = "Ce nom d'utilisateur est déjà utilisé !"
                return res.status(400).json({error: message})
            }

        } else {

            if (!schema.validate(req.body.password)) {
                const message = 'Le mot de passe doit faire entre 6 et 15 caractères, contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et ne doit pas contenir d\'espace !'
                return res.status(400).json({error: message})
            }
            if (!mailRegex.test(req.body.email)) {
                const message = 'Votre email ne respecte pas les règles de validation !'
                return res.status(400).json({error: message})
            }
            const hash = await bcrypt.hash(req.body.password, 10)
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            const message = 'Votre compte a bien été créé !'
            return res.status(201).json({message: message, data: newUser})
        }
    } catch (error) {
        const message = "Une erreur est survenue !"
        return res.status(500).json({error: message})
    }

}

// ---------- CONNEXION D'UN UTILISATEUR -----------

exports.login = (req, res) => {

    User.findOne({
        where: { email: req.body.email }
    })
        .then(userFound => {
            if (userFound) {
                bcrypt.compare(req.body.password, userFound.password)
                    .then(passwordIsValid => {
                        if (!passwordIsValid) {
                            const message = 'Mot de passe incorrect !'
                            return res.status(401).json({ message: message, error })
                        }
                        res.status(200).json({
                            userId: userFound.id,
                            username: userFound.username,
                            picture: userFound.picture,
                            isAdmin: userFound.isAdmin,
                            token: jwt.sign(
                                { userId: userFound.id, isAdmin: userFound.isAdmin },
                                 process.env.JWT_SECRET_TOKEN,
                                { expiresIn: '24h' }
                            )
                        })
                    })
                    .catch(error => {
                        const message = 'Une erreur est survenue !'
                        res.status(500).json({ message: message, error })
                    })
            } else {
                const message = 'Cet email ne correspond à aucun utilisateur, veuillez créer un compte !'
                res.status(404).json({ message: message, error })
            }
        })
        .catch(error => {
            const message = 'Une erreur est survenue !'
            res.status(404).json({ message: message, error })
        })
}

// ---------- RECUPERATION D'UN UTILISATEUR -----------

exports.getOneUser = (req, res) => {

    const id = req.params.id

    User.findOne({
        attributes: [ 'id', 'username', 'email', 'picture', 'isAdmin' ],
        where: { id: id }
    })
        .then(userFound => {
            if (userFound) {
                const message = 'Utilisateur trouvé !'
                res.status(200).json({ message: message, data: userFound })
            } else {
                const message = 'Utilisateur non trouvé !'
                res.status(404).json({ message: message, error })
            }
        })
        .catch(error => {
            const message = 'Une erreur est survenue !'
            res.status(404).json({ message: message, error })
        })
}

// ---------- MODIFICATON D'UN UTILISATEUR -----------

exports.updateUser = (req, res) => {

    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageProfile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    User.findOne({
        where: { id: req.params.id },
    })

        .then(userFound => {

            if (userFound.id !== getAuthUserId(req)) {
                const message = "Requête non authentifiée, seul l'auteur peut modifier son propre compte !"
                return res.status(401).json({ error: message })
            }

            if(userFound) {

                User.update(userObject, {
                    where: { id: req.params.id}
                })
                    .then(user => {
                        const message = 'Votre profil a bien été modifié !'
                        res.status(200).json({ message: message })
                    })
                    .catch(error => {
                        const message = 'Une erreur est survenue !'
                        res.status(400).json({ message: message, error  })
                    })
            } else {
                const message = 'Utilisateur non trouvé !'
                res.status(404).json({ message: message, error });
            }
        })
        .catch(error => {
            const message = 'Une erreur est survenue !'
            res.status(500).json({ message: message, error })
        });
}

// ---------- SUPPRESSION D'UN UTILISATEUR -----------

exports.deleteUser = (req, res) => {

    User.findOne({
        where: { id: req.params.id }
    })
        .then(userFound => {

            if (userFound.id !== getAuthUserId(req)) {
                const message = "Requête non authentifiée, seul l'administrateur peut supprimer un compte tiers !"
                return res.status(401).json({ error: message })
            }

            userFound.destroy({
                where: { id: req.params.id }
            })
                .then(() => {
                    res.status(200).json({ message: 'Votre profil a bien été supprimé !' })
                })
                .catch(error => {
                    res.status(409).json({ error })
                })
        })
        .catch(error => {
            res.status(500).json({ message: 'Une erreur est survenue !' })
        })
}

// ---------- SUPPRESSION D'UN UTILISATEUR DEPUIS UN COMPTE ADMIN -----------

exports.adminDeleteUser = (req, res) => {

    User.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).json({ message: 'Profil du user supprimé !' })
        })
        .catch(error => {
            res.status(403).json({ error })
        })
}
