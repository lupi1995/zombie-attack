var fs = require('fs');
var FILE_TYPE_EXPORT = ['js', 'json'];
var FILE_EXLUCDES = ['package', 'package-lock', 'webpack.config.dev', 'webpack.config.prod', 'index',
    'alias-generator', 'custom-compile', 'webpack-config-dev', 'webpack-config-prod', 'webpack-embed-config-dev', 'webpack-embed-config-prod'];
var DIRECTORY_EXLUCDES = ['.history', '.vscode', 'node_modules', '.git', 'build', 'dist',"webpack-settings"];
var arrFileData = [];

class AliasGenerator {
    constructor() {

    }

    static GenerateAlias(alias) {
        arrFileData = [];
        var root = __dirname.replace("\webpack-settings", "")

        this.AddFile(root);
        for (let index = 0; index < arrFileData.length; index++) {
            const fileData = arrFileData[index];
            alias[fileData.name] = fileData.path;
        }
        
    }

    static GenerateImporter(){
        
        this.GenerateAlias({});
        var importModules = '';
        var root = __dirname.replace("\webpack-settings", "")

        for (let index = 0; index < arrFileData.length; index++) {
            const fileData = arrFileData[index];
            importModules += `import  ` + `"${fileData.path.replace(root, "..")}"`;
            if (index != arrFileData.length - 1) {
                importModules += "\n";
            }
        }
        fs.writeFile(__dirname + "/auto-import.js", importModules, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }

    static AddFile(path) {
        var stats = fs.lstatSync(path);
        if (stats.isDirectory()) {
            var dirname = path.substring(path.lastIndexOf('/') + 1);
            if (DIRECTORY_EXLUCDES.indexOf(dirname) >= 0) {
                return;
            }
            fs.readdirSync(path).forEach(i => this.AddFile(`${path}/${i}`));
        } else if (stats.isFile()) {
            var extension = path.split('.').pop();
            if (FILE_TYPE_EXPORT.indexOf(extension) >= 0) {
                var fileName = path.substring(path.lastIndexOf('/') + 1).split('.').slice(0, -1).join('.');
                if (FILE_EXLUCDES.indexOf(fileName) >= 0) {
                    return;
                }
                var module = this.ToTitleCase(fileName.replace(/-/g, ' ')).replace(/ /g, '');
                if (module.indexOf('.') >= 0) {
                    return;
                }
                arrFileData.push({
                    name: fileName,
                    module: module,
                    path: path.replace(__dirname, '.')
                })
            }
        }
    }

    static ToTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
}

module.exports = AliasGenerator;