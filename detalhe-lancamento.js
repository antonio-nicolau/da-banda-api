const cheerio = require('cheerio');
const axios = require('axios');

const fetchDetail = async (url,res)=>{

    const response = await axios.get(url);

    const detail = await parseDetail(response.data);
    
    if(detail != null)
        res.send(JSON.stringify(detail));
    else
        res.send(JSON.stringify({
            'code':'404',
            'message':'no detail found',
        }));
}

const parseDetail = async (content)=>{

    const $ = cheerio.load(content);

    let artist = '';
    const title = $('.single_post .title').text();    
     
    const downloadUrl = $('.wp-block-file__button').attr('href');
    const category = $('.thecategory a').text();
    const anoLancamento = $('.post-info .thetime').text();
    artist = title.split("– ")[0].trim();

    //artist = serialiseArtist(artist);

    const detail = {
        'title':title,
        'artist':artist,
        'category':category,
        'anoLancamento':anoLancamento,
        'downloadUrl':downloadUrl,
    }

    return detail;
}

function serialiseArtist(artist){
    return artist = artist.slice(0,artist.length - 1);
}

module.exports = fetchDetail