const axios = require('axios');
const cheerio = require('cheerio')
const { lancamentosURL } = require('./config');

async function fetchUltimosLancamentos(res){
    const response = await axios.get(lancamentosURL);
    
    const lancamentos = await parseData(response.data);

    if(lancamentos != null)
        res.send(JSON.stringify(lancamentos));
    else
        res.send(JSON.stringify({
            'code':'404',
            'message':'Not Data Found',
        }));
}

const parseData = async (content)=>{
    let ultimoLancamentos = [];
    const $ = cheerio.load(content);
    
    const urlNextPage = '/page/';
    const pages = numPages($);

    const res = $('#page article').each((i,e)=>{
        const title = $(e).find('article header .title').text();
        const img = $(e).find('.featured-thumbnail img').attr('data-src');
        const url = $(e).find('article header h2 a').attr('href');
        
        const data = {
            'url':url,
            'img':img,
            'title':title,
            'currentPage':'1',
            'limPages':pages,
        }

        ultimoLancamentos.push(data);
    });

    return ultimoLancamentos;
}

const numPages = ($)=>{
    pages = []
    const numPages = $('.page-numbers').each((i,e)=>{
        const num = $(e).text();

        if(num != '')
            pages.push(num);
    });
    return pages.pop();
}

module.exports = fetchUltimosLancamentos