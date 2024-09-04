exports.name = '/img/wallpaperv2';
const axios = require('axios')
const cheerio = require('cheerio')
exports.index = async (req, res, next) => {
  const q = req.query.q
  const page = req.query.page
  if(!q || !page) return res.jsonp({ error: "thiếu dữ liệu"})
  axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=2&q=raiden`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let resl = []
            $('div.grid-item').each(function (a, b) {
                resl.push({
                    title: $(b).find('div.info > a ').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                })
            })
            return res.jsonp(resl)
        })
}