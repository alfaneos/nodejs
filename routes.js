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

const findMonster=require('./functions/monster/search');
const createMonster=require('./functions/monster/create');
const createHero=require('./functions/hero/create');
const overwriteHero=require('./functions/hero/overwrite');

const battle=require('./functions/battle');

module.exports = router => {

    router.get('/', (req, res) => res.end('Welcome to Learn2Crack !'));
        //  router.get('/lands', (req, res) => res.sendFile(__dirname+'/public/lands.html'));


    router.post('/authenticate', (req, res) => {
        //адрес для логирования
        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({ message: 'Invalid Request !' });

        } else {

            login.loginUser(credentials.name, credentials.pass)

            .then(result => {

                const token = jwt.sign(result, config.secret, { expiresIn: 60*60*24 });

                res.status(result.status).json({ message: result.message, token: token });

            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/findingLand', (req, res) => {
          //адрес для поиска определенной ячейки
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
    router.post('/findingmonster', (req, res) => {
        //адрес для поиска монстра по уровню
      const name = req.body.name;


        if (!name) {

            res.status(400).json({ message: 'Invalid Request m !' });

        } else {

            findMonster.search(name)

            .then(result => {

                //res.status(result.status).json({ message: result.message });
                res.json(result);

            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/users', (req, res) => {
        //адрес для регистрации
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
    router.post('/createhero', (req, res) => {
        //адрес для создания героя
        const name = req.body.name;
        const email = req.body.email;
        const class1 = [];
        const inventorysize = 10;
        const inventory = [0];
        const abilities = [1];
        const level = [1,0];
        const maxCharacteristics = [10,10,10];
        const currentCharacteristics = [10,10,10];
        const maxStats=[1,1,1,1,1];
        const currentStats=[1,1,1,1,1];
        const currentCoordinates = [0,0,0,0,0];
        const destinationCoordinates = [0,0,0,0,0];
        const logonDate = new Date();
        const lastEnemy = [0,0,0,0,0,0];
        const lastStrike=false;

        if (!name || !email || !name.trim() || !email.trim()) {

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            createHero.createHero(name, email, class1, inventorysize, inventory, abilities, level,
              maxCharacteristics, currentCharacteristics, maxStats, currentStats, currentCoordinates,
            destinationCoordinates, logonDate, lastEnemy, lastStrike)

            .then(result => {

                res.setHeader('Location', '/hero/'+email);
                res.status(result.status).json({ message: result.message })
            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/createmonster', (req, res) => {
      //адрес для создания монстра
        const name = req.body.name;
        const level = req.body.level;
        const class1 = req.body.class1;
        const characteristics = req.body.characteristics;
        const stats=req.body.stats;
        const inventory = req.body.inventory;
        const abilities = req.body.abilities;

        if (!name || !level || !class1 || !name.trim()) {

            res.status(400).json({message: 'Invalid Request !'});

        } else {

            createMonster.createMonster(name, level, class1, characteristics, stats, inventory, abilities)

            .then(result => {

                res.setHeader('Location', '/monster/'+level);
                res.status(result.status).json({ message: result.message })
            })

            .catch(err => res.status(err.status).json({ message: err.message }));
        }
    });
    router.post('/createland', (req, res) => {
      //адрес для создания ячейки
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
    router.get('/battle/:id', (req,res) => {
    //адрес для получения всех ячеек открытых героем
        if (checkToken(req)) {

            battle.getBattle(req.params.id)

            .then(result =>{


              res.json(result);
            })

            .catch(err => res.status(err.status).json({ message: err.message }));


        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });
    router.get('/landscape/:id', (req,res) => {
      //адрес для получения всех ячеек открытых героем
        if (checkToken(req)) {

            getlandscape.findAllLands(req.params.id)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }
    });
    router.get('/landscape/:id/:land', (req,res) => {
//адрес для поиска определенной ячейки
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
//адрес для открытия профиля
        if (checkToken(req)) {

            profile.getProfile(req.params.id)

            .then(result => res.json(result))

            .catch(err => res.status(err.status).json({ message: err.message }));

        } else {

            res.status(401).json({ message: 'Invalid Token 1!'+req.headers['x-access-token'] });
        }
    });

    router.put('/users/:id', (req,res) => {
//адрес для смены пароля
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
//адрес для сброса пароля
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
