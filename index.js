const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { getLogger } = require('log4js')
const cors = require('cors')
const passport = require('passport')

const createFile = require('./utils/create_file_controller')
const apiController = require('./utils/api_controller')
const auth = require('./auth/validate_token')
const googleStratergy = require('./auth/google_strategy')
const microsoftStratergy = require('./auth/microsoft_strategy')
const wrap = require('./wrap')
const logger = getLogger('index.js')
const app = express()
const port = 3000

logger.level = 'debug'
app.use(morgan('tiny'))
app.use(cors())
app.use(passport.initialize())
app.use(bodyParser.json());

app.get('/callback', passport.authenticate('google', { scope: ['email', 'profile'] }), wrap(apiController.callback))

app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => { });


app.get('/pages', createFile.getPages)
app.post('/pages', createFile.createPages)
app.delete('/pages', createFile.deletePages)

app.get('/microsoft',
passport.authenticate('microsoft', {
  // Optionally define any authentication parameters here
  // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

  prompt: 'select_account',
}));

app.get('/microsoft/callback', 
passport.authenticate('microsoft', { failureRedirect: '/login' }), wrap(apiController.callbackMicrosoft));

app.listen(port, () => {
    logger.info(`servidor en puerto ${port}`)
})