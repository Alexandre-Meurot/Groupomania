const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator')
const db = require('../models');
const User = db.User;

const schema = new passwordValidator();
schema
    .is().min(6) /*** minimum 6 caractères ***/
    .is().max(15) /*** maximum 15 caractères ***/
    .has().uppercase() /*** mot de passe doit contenir des lettres majuscules ***/
    .has().lowercase() /*** mot de passe doit contenir des lettres miniscules  ***/
    .has().digits(2) /*** mot de passe doit contenir deux chiffres minimun ***/
    .has().not().spaces() /*** mot de passe ne doit pas avoir d'espace ***/

exports.signup = async (req, res) => {
    try {
        const userMail = await User.findOne({
            where: { email: req.body.email }
        })
        const userName = await User.findOne({
            where: { username: req.body.username }
        })
        if (userMail !== null) {
            const message = 'Un compte existe déjà avec cette adresse email !'
            return res.status(400).json({ error: message })
        }
        if (userName !== null) {
            const message = "Un compte existe déjà avec ce nom d'utilisateur"
            return res.status(400).json({ error: message })
        }
        if (!schema.validate(req.body.password)) {
            const message = "Le mot de passe doit faire entre 6 et 15 caractères, contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et ne doit pas contenir d'espace !"
            return res.status(400).json({ error: message })
        }
        const usernameRegex = /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z\s]{3,20})$/;
        const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (usernameRegex.test(req.body.username) && mailRegex.test(req.body.email)) {
            const hash = await bcrypt.hash(req.body.password, 10)
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            const message = `Votre compte a bien été créé ${newUser.username} !`
            res.status(201).send({
                user: newUser,
                message : message
            })
        } else {
            const message = 'Votre Pseudo et/ou votre Email sont incorrect !'
            res.status(400).json({ error: message })
        }
    } catch (error) {
        const message = `Une erreur est survenue : ${error}`
        return res.status(400).json({ error: message })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        })
        if (user === null) {
            const message = 'Aucun compte ne correspond à cet email !'
            return res.status(401).json({ error: message })
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password)
            if (!hash) {
                const message = 'Le mot de passe est incorrect !'
                return res.status(401).json({ error: message })
            } else {
                const message = `Vous êtes bien connecté(e) ${user.username} :)`
                res.status(200).send({
                    user: user,
                    message: message,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.JWT_SECRET_TOKEN,
                        {expiresIn: '24h'}
                    )
                })
            }
        }
    } catch (error) {
        const message = 'Une erreur est survenue !'
        return res.status(500).json({ error: message })
    }
}

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        })
        res.status(200).send({
            user: user,
            message: 'Le profil a bien été trouvé !'
        })
    } catch (error) {
        const message = 'Une erreur est survenue !'
        return res.status(500).json({ error: message })
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;

    const userObject = req.file ?
        { ...JSON.parse(req.body.user),
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    User.findOne({
        where: { id: id },
    })
        .then(userFound => {
            if(userFound) {
                User.update(userObject, {
                    where: { id: id }
                })
                    .then(user => res.status(200).json({ message: 'Votre profil a bien été modifié !' }))
                    .catch(error => res.status(400).json({ error: 'Une erreur est survenue !' }))
            }
            else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue !' }));
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    User.findOne({
        where: { id: id }
    })
        .then(user => {
            if (user) {
                User.destroy({
                    where: { id: id }
                })
                    .then(() => res.status(200).json({ message: 'Votre compte a bien été supprimé !' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur est survenue !' }))
            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé !' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Une erreur est survenue !' }))
}
