const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');

// post 傳送格式有兩種 urlencoded 和 json
app.use(bodyParser.urlencoded({ extended: false })) //解析urlencoded格式
app.use(bodyParser.json()) //解析json格式

app.use(session({
    saveUninitialized: false,// 新用戶沒有使用到 session 物件時不會建立 session 和發送 cookie 
    resave: false, // 沒變更內容是否強制回存 
    secret: 'skdfjhdksfj',//加密用的字串
    cookie: {
        maxAge: 1200000 // 20分鐘，單位毫秒
    }
}));


app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/login-test', require(__dirname + '/routers/login-test'));

app.use(express.static(__dirname + '/../public'))

app.use((req, res) => {
    res.type('text/html');
    res.status(404);
    res.send('<h2>找不到網頁</h2>')
});

app.listen(3000, () => {
    console.log('express server start');
});
