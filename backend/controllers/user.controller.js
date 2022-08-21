const bcrypt = require('bcrypt');
const token = require('../middleware/token.middleware')
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
            const tokenObject = await token.issueJWT(newUser)
            res.status(201).send({
                user: newUser,
                token: tokenObject.token,
                expires : tokenObject.expiresIn,
                message : `Votre compte a bien été créé ${newUser.username} !`
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

exports.login = (req, res, next) => {}

exports.getOneUser = (req, res, next) => {}

exports.updateUser = (req, res, next) => {}

exports.deleteUser = (req, res, next) => {}
