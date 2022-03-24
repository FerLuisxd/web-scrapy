const cheerio = require('cheerio')
const axios = require('axios').default;
const url = 'https://listado.mercadolibre.com.pe/'
// const url = 'https://listado.mercadolibre.com.pe/juegos-juguetes/pokemon-inteleon-vmax-league-b-deck_CostoEnvio_Gratis#applied_filter_id%3Dshipping_cost_highlighted%26applied_filter_name%3DCosto+de+env%C3%ADo%26applied_filter_order%3D1%26applied_value_id%3Dfree%26applied_value_name%3DGratis%26applied_value_order%3D1%26applied_value_results%3D3%26is_custom%3Dfalse'
const {respOK} = require("./resp")

async function getByParams(res,param){
    console.log('param', param)
    console.time('start')
    axios.get(`${url}${param}`).then((response)=>{
        console.timeEnd('start')
        const html = response.data
        // console.log(html)
        const $ = cheerio.load(html)
        const options = []
        $('div[class=ui-search-result__content-wrapper]',html).each(function(){
            const arrayLinks = $(this).find('a')
            // console.log(arrayLinks[0].attribs.href)
            // console.log(arrayLinks[0].attribs.title, arrayLinks[1].attribs.title )
            let obj = {}
            obj.title = arrayLinks[0].attribs.title
            obj.link =  arrayLinks[0].attribs.href
            if(arrayLinks[1]){// Seller
                obj.seller =  arrayLinks[0].attribs.title
            }
            // obj.price = $(this).find('.price-tag-text-sr-only').text()
            const prices = $(this).find('.price-tag-amount')
            const pricelocation = prices.length === 2? 1: 0
            let price = ''
            prices[pricelocation].children.forEach(element => {
                price += element.children[0].data
                // console.log(element.children[0].data)
            });
            obj.price = price
            
            // console.log(prices.find('.price-tag-text-sr-only')._root.children())
            // console.log(prices)
            // obj.price = prices[1]? prices[1].attribs: 0

            options.push(obj)

            // console.log(arrayLinks[0].attribs('href'))
            // console.log(arrayLinks[0].attribs('title'))
            // console.log( arrayLinks[0].())
            // // const seller = arrayLinks[1].text()
            // const body = $(this).find('.price-tag-text-sr-only').text()
            // // console.log('title',title,seller,body)
            // // console.log(i,el)
            // $(this).children('a').each((i,el)=>{
            //     console.log($(el).text(), $(el).attr('href'))
            // })
        })
        // console.log(options)
        res.end(respOK(res,options))
    })
}


module.exports={
    getByParams
}