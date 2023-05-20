const { CREATED, BAD_REQUEST } = require('http-status-codes')


const logger = require('./logger')
const log = logger.getLogger('apiController')

const apiController = module.exports
const url = process.env.FRONT_URL

apiController.callback = async (req, res) => {
  const { user: { emails, displayName, token, image } } = req
  log.info(token)
  const email = emails[0].value
  const rol = 'ADMINISTRADOR'
   // return res.redirect(`https://repository.planestic.udistrital.edu.co/login?token=${token}&name=${displayName}&url_image=${image}&rol=${user[0].rol}&email=${user[0].email}`)
    return res.redirect(`${url}?token=${token}&name=${displayName}&url_image=${image}&rol=${rol}&email=${email}`)
 

}


apiController.callbackMicrosoft = async (req, res) => {
  console.log("aquiiii")

  const { user: { emails, displayName, token, image } } = req
  log.info(token)
  const email = emails[0].value
  const rol = 'ADMINISTRADOR'
   // return res.redirect(`https://repository.planestic.udistrital.edu.co/login?token=${token}&name=${displayName}&url_image=${image}&rol=${user[0].rol}&email=${user[0].email}`)
    return res.redirect(`${url}?token=${token}&name=${displayName}&url_image=${image}&rol=${rol}&email=${email}`)
 

}
