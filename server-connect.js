const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')
const { HOST: host,
  USERNAME: userName,
  KEY: key} = process.env


const createPage = async (pageName) => {
const ssh = new NodeSSH()
 
ssh.connect({
  host: 'desarrollo.planestic.udistrital.edu.co',
  username: 'ec2-user',
  privateKey: `./desarrollo.pem`
})
.then(function() {
  const failed = []
  const successful = []
  ssh.putDirectory(`./files/${pageName}`, `./pages/${pageName}`, {
    recursive: true,
    concurrency: 10,
    validate: function(itemPath) {
      const baseName = path.basename(itemPath)
      return baseName.substr(0, 1) !== '.' && 
             baseName !== 'node_modules' 
    },
    tick: function(localPath, remotePath, error) {
      if (error) {
        failed.push(localPath)
      } else {
        successful.push(localPath)
      }
    }
  }).then(function(status) {
    console.log('the directory transfer was', status ? 'successful' : 'unsuccessful')
    console.log('failed transfers', failed.join(', '))
    console.log('successful transfers', successful.join(', '))
    ssh.execCommand(`docker exec -i  mysql mysql -uroot -pplanestic2023*  <<< "CREATE DATABASE ${pageName};" && docker-compose up -d`, { cwd:`./pages/${pageName}` }).then(function(result) {
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
      })

  })
 
})

return {error: null, status: "ok"}
}



module.exports = {
  createPage
}