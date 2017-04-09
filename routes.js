'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('./functions/register');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');

const findLand = require('./functions/findLands');
const rewriteLand = require('./functions/rewriteLand');
const getlandscape = require('./functions/findAllLands');
const goToLand=require('./functions/goToLand');

module.exports = router => {

    router.get('/', (req, res) => res.end('Welcome to Learn2Crack !'));
//  router.get('/lands', (req, res) => res.sendFile(__dirname+'/public/lands.html'));


    router.post('/authenticate', (req, res) => {

        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({ message: 'Invalid Request !' });

        } else {

            login.loginUser(credentials.name, credentials.pass)

            .then(result => {

                const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

                res.status(result.status).json({ message: result.message, token: token });

            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/findingLand', (req, res) => {

      const alfaX = req.body.alfaX;
      const alfaY = req.body.alfaY;



        if ((!alfaX)||(!alfaY)) {

            res.status(400).json({ message: 'Invalid Request m !'+alfaX });

        } else {

            findLand.findLands(alfaX, alfaY)

            .then(result => {



                res.status(result.status).json({ message: result.message });

            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/users', (req, res) => {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            register.registerUser(name, email, password)

            .then(result => {

                res.setHeader('Location', '/users/'+email);
                res.status(result.status).json({ message: result.message })
            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/createland', (req, res) => {

        const alfaX = req.body.alfaX;
        const alfaY = req.body.alfaY;
        const type = req.body.type;
        const beta = req.body.beta;


        if (!alfaX || !alfaY || !type|| !beta || !alfaX.trim() || !alfaY.trim()|| !type.trim()) {

            res.status(400).json({message: 'Invalid Request !'});

        } else {


            rewriteLand.rewriteLand(alfaX, alfaY, type, beta)

            .then(result => {


                res.status(result.status).json({ message: result.message})
            })

            .catch(err => res.status(err.status).json({ message: err.message }));



        }
    });

    router.get('/landscape/:id', (req,res) => {

        if (checkToken(req)) {

            getlandscape.findAllLands(req.params.id)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });
    router.get('/landscape/:id/:land', (req,res) => {

        if (checkToken(req)) {
          const land = req.params.land;

            goToLand.goToLand(req.params.id, land)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });
    router.get('/users/:id', (req,res) => {

        if (checkToken(req)) {

            profile.getProfile(req.params.id)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token 1!'+req.headers['x-access-token'] });
        }
    });

    router.put('/users/:id', (req,res) => {

        if (checkToken(req)) {

            const oldPassword = req.body.password;
            const newPassword = req.body.newPassword;

            if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

                res.status(400).json({ message: 'Invalid Request !' });

            } else {

                password.changePassword(req.params.id, oldPassword, newPassword)

                .then(result => res.status(result.status).json({ message: result.message }))

                .catch(err => res.status(err.status).json({ message: err.message }));

            }
        } else {

            res.status(401).json({ message: 'Invalid Token1 !' });
        }
    });

    router.post('/users/:id/password', (req,res) => {

        const email = req.params.id;
        const token = req.body.token;
        const newPassword = req.body.password;

        if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

            password.resetPasswordInit(email)

            .then(result => res.status(result.status).json({ message: result.message }))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            password.resetPasswordFinish(email, token, newPassword)

            .then(result => res.status(result.status).json({ message: result.message }))

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });

    function checkToken(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                  var decoded = jwt.verify(token, config.secret);

                  return decoded.message === req.params.id;

            } catch(err) {

                return false;
            }

        } else {

            return false;
        }
    }
}
