const express = require('express');
const fetchDetail = require('./detalhe-lancamento');
const fetchUltimosLancamentos = require('./ultimos-lancamentos');

const app = express();
const routes = express.Router()

routes.get('/',(req,res)=>{
    console.log('home');
    res.send('Route Home');
});

routes.get('/ultimos-lancamentos',(req,res)=>{

    res.setHeader('Content-Type','text/json');

    console.log('ultimos-lancamentos');
    
    fetchUltimosLancamentos(res);
});

routes.get('/detalhe-lancamento',(req,res)=>{

    res.setHeader('Content-Type','text/json');

    const url = req.query.url;
    console.log('Detail-lancamento > ' + url);
    
    fetchDetail(url,res);
});


routes.get('/search/:s',(req,res)=>{

    res.setHeader('Content-Type','text/json');

    const search = req.params.s;

    console.log('Search => ' + search);
    
    res.send('Search => ' + search);
});

app.use('/',routes);
app.listen();