var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
const Handlebars = require('handlebars');

const createFile = module.exports

createFile.addFiles = async (data) => {
    const { page_name } = data
    const completeFolder = `./files/${page_name}`
    const exist = await existsAsync(completeFolder)
    if (exist) {
        return { error: 'folder_already_exist' }
    }
    fs.mkdirSync(completeFolder);
     const info = await getData('./template/docker-compose_template.txt')
     const template = Handlebars.compile(info);
     const infoNew = template(data)
     await writeFile(`${completeFolder}/docker-compose.yml`,infoNew)
     
    return { status: 'OK' }
}

const getData = (name) => {
    return fs.readFileAsync(name, 'utf8')
}

const existsAsync = (path) => {
    return new Promise(function(resolve, reject){
      fs.exists(path, function(exists){
        resolve(exists);
      })
    })
}

const writeFile = (path, data) => {
    return new Promise(function(resolve, reject){
        fs.writeFile(path, data, function(ok){
          resolve(ok);
        })
      })
}
