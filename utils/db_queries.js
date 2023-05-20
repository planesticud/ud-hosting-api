const db = require('./db.js')


const dbQueries = module.exports

dbQueries.insert = async (table, data) => {
    const query = await db(table).insert(data)
    return query
}

dbQueries.selectWhere = async (table, where) => {
    const data = await db(table).select('*').where(where)
     return data
}

dbQueries.select = async (table) => {
    const data = await db(table).select('*')
     return data
}

dbQueries.delete = async (table, id) => {
    const del = await db(table).where({id}).delete()
     return del
}

dbQueries.update = async (table, id, data) => {
    const update = await db(table).where({id}).update(data)
     return update
}