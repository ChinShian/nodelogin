const express = require('express');
const router = express.Router();

const loginList = {
    'cccccc': {
        pw: '123456',
        username: '小明',
        email:'aa123@gmail.com',
        sex:'男',
        age:'22'
    },
    'aaaaaa': {
        pw: '0000',
        username: '小華',
        email:'nz123456@gmail.com',
        sex:'女',
        age:'20'
    },
};




router.get('/login', (req, res) => {
    const data = {
        isLogin: req.session.loginUser || false,
        loginData: req.session.loginData || false
    };
    res.render('login-test-login', data);
});

router.post('/login', (req, res) => {
    if (req.body.user && req.body.password) {
        if (loginList[req.body.user] && req.body.password === loginList[req.body.user].pw) {

            req.session.loginUser = req.body.user;
            req.session.loginData = loginList[req.body.user];

            return res.json({
                success: true,
                msg: '可登入',
                body: req.body
            });
        }
    }
    res.json({
        success: false,
        msg: '帳號或密碼錯誤',
        body: req.body
    });
});

router.get('/sess', (req, res) => {
    res.json(req.session);
});

router.get('/logout', (req, res) => {
    delete req.session.loginUser;
    delete req.session.loginData;
    res.redirect(req.baseUrl + '/login');
});

module.exports = router;