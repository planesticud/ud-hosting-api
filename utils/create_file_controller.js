const { isValid } = require('./validate')
const { pages } = require('../schema')
const dbQueries = require('./db_queries')
const {createPage} = require('../server-connect')
const {addFiles} = require('./create_files')
const fileController = module.exports

fileController.createPages = async (req, res) => {

    const { body } = req
    const errors = isValid(body,pages.pagesSchema)
    if(errors.length){
        res.status(400).json({error: errors})
    }
    dbQueries.insert('pages', body)
    const { error, status } = await addFiles(body)
     await createPage(body.page_name)
    if(error){
        res.status(400).json({error:error})
    }
    
    res.sendStatus(201)
}

fileController.getPages = async (req, res) => {
    let where = req.query
    let pages = await dbQueries.selectWhere('pages', where)

    res.json(pages)
}

fileController.deletePages = async (req, res) => {
    const { id } = req.query
    const del = await dbQueries.delete('pages', id)
    res.json(del)
}

 