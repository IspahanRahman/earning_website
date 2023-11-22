const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const flash = require('connect-flash')
const adminRoute = require('./routers/admin/adminAllRoutes');
const apiRoute = require('./routers/api/allApiRoute');
const path = require('path')
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
// app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['ng_task']
}))

app.use('/admin',adminRoute)
app.use('/api',apiRoute);

// app.use('/api',apiRouter)
// app.use('/eComApi',eComApiAllRouter)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

const PORT = 3010
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

app.get('/', (req,res) =>{
    res.render('admin/login')
})

app.get('/logout',(req,res) =>{
    res.clearCookie('adminToken');
    res.redirect('/');
})


