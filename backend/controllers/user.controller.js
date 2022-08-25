const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
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


// ---------- CREATION D'UN UTILISATEUR -----------

exports.signup =  (req, res) => {

    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    const usernameRegex = /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z\s]{3,20})$/;
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (email == null || email === '' || username == null || username === '' || password == null || password === '') {
        const message = 'Tous les champs doivent être renseignés (username, email, password)'
        return res.status(400).json({ message: message, error })
    }

    if (!usernameRegex.test(username)) {
        const message = 'Votre pseudo ne respecte pas les règles de validation !'
        return res.status(400).json({ message: message, error })
    }

    if (!mailRegex.test(email)) {
        const message = 'Votre email ne respecte pas les règles de validation !'
        return res.status(400).json({ message: message, error })
    }

    if (!schema.validate(password)) {
        const message = 'Le mot de passe doit faire entre 6 et 15 caractères, contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et ne doit pas contenir d\'espace !'
        return res.status(400).json({ message: message, error })
    }

    User.findOne({
        attributes: ['username' || 'email'],
        where: {
            username: username,
            email: email
        }
    })
        .then(userFound => {
            if (!userFound) {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        const user = User.build({
                            username: username,
                            email: email,
                            password: hash
                        })
                        user.save()
                            .then(() => {
                                const message = 'Votre compte a bien été créé !'
                                res.status(201).json({ message: message })
                            })
                            .catch(error => {
                                const message = 'Une erreur est survenue lors de la création de votre compte !'
                                res.status(400).json({ message: message, error })
                            })
                    })
                    .catch(error => {
                        const message = 'Une erreur est survenue lors de la création de votre compte !'
                        res.status(500).json({ message: message, error })
                    })
            } else {
                const message = 'Cet utilisateur existe déjà !'
                return res.status(404).json({ message: message, error })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ message: message, error })
        })
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
                                { userId: userFound.id },
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

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    req.body.user = userId

    console.log('bodyUser', req.body.user);

    const userObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageProfile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    User.findOne({
        where: { id: userId },
    })
        .then(userFound => {
            if(userFound) {
                User.update(userObject, {
                    where: { id: userId}
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
    const id = req.params.id;
    User.findOne({
        where: { id: id }
    })
        .then(user => {
            if (user) {
                User.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        const message = 'Votre compte a bien été supprimé !'
                        res.status(200).json({ message: message })
                    })
                    .catch(() => {
                        const message = 'Une erreur est survenue !'
                        res.status(500).json({ message: message, error })
                    })
            } else {
                const message = 'Utilisateur non trouvé !'
                return res.status(404).json({ message: message, error })
            }
        })
        .catch(error => {
            const message = 'Une erreur est survenue !'
            res.status(500).json({ message: message, error })
        })
}
