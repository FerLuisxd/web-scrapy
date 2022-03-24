const polka = require('polka')
const {json} = require('body-parser')
const resp = require("./utils/resp")
const cheerio = require('cheerio')
const { getByParams } = require('./utils/mercadolibre')
// const config = require("./api.config")
const PORT = 3007

const api = polka()
  .use(json())

// Home route (not protected)
api.get("/",(req,res)=>{
    getByParams(res,req.query.search)
//   res.end(resp.respOK(res,{response:"It works"}))
})

api.listen(PORT,()=>{
    console.log('on', PORT)
    // getByParams({},'')
})