//Configuracion de las variables de entorno
const { config } = require('dotenv');
config();

//Dependencias de configuración
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

/**
 * Configuración basica para un proyecto usando webpack para mejorar un entorno 
 * de desarrollo:
 * 
 * Para mayor información acerca de webpack visita: https://webpack.js.org/
 */

//Configuraciones de webpack
module.exports = {
    /**
     * Se define donde es encontrara el archivo principal que ejecutara la aplicación.
     * 
     * Tambien se agrega la configuración de babel/polyfill, esto con la finalidad de 
     * tener las nuevas versiones de javascript en el entorno de trabajo.
     */
    entry: {
        app: [
            "@babel/polyfill",
            "./src/index.js"
        ]
    },
    /**
     * Se define la salida del los archivos compilados y/o traspilados para su ejecusión.
     * 
     * En caso opcional que desee cambiar la ruta de salida debe canbiar los textos
     * en los siguientes lugares:
     * 
     *  output: {
     *      path: path.resolve(__dirname, "Nombre de la carpeta de salida"),
     *      filename: "Nombre del archivo de salida"
     *  }
     *  
     */
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/bandle.js"
    },
    /**
     * Se establesen todas las reglas basicas en la lectura y escaneo de los achivos:
     *      -javascript
     *      -hadlebars
     *      -HTML
     *      -Sass
     *      -CSS
     *      Imagenes (tipo: jpg, png, gif o jpeg)
     * 
     * En caso de nesesitarlo, puede cambiar esta configuración a la que mas le agrade
     * y requiera el proyecto. 
     */
    module: {
        rules: [
            //Lectura de los archivos javascript (.js)
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            //Lectura los archivos handlebars (.hbs o .handlebars)
            {
                test: /\.(hbs|handlebars)$/,
                use: 'handlebars-loader'
            },
            //Lectura de los archivos de estilo (.sass, .scss o .css)
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            //Lectura de los archivos media (jpg, png, gif o jpeg)
            {
                test: /\.(ico|jpg|png|gif|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "static/",
                        useRelativePath: true
                    }
                }]
            }
        ]
    },
    /**
     * Se establesen 2 plugin basicos en esta configuración:
     *      -**html-webpack-plugin: Con el fin de manejar todo los archivos
     *      HTML que existan en la aplicación.
     * 
     *      -**mini-css-extract-plugin: Con la finalidad de manegar los 
     *      archivos que sean "Styles" la aplicación
     * 
     * Si se desea cambiar la alguna configuración, verifique sus documentaciones en:
     *      
     */
    plugins: [
        //Manejo de todo el HTML o algun motor de platillas que se desee ocupar
        new htmlWebpackPlugin({
            template: path.relative(__dirname, './src/views/index.hbs'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        //Manejo de todo el CSS o archivos de un pre procesador de CSS
        new miniCssExtractPlugin({
            filename: 'bandle.css'
        }),
        //Manejo de variables de entorno en el proyecto
        new DotEnv()
    ],
    /**
     * Se establesen las configuraciones de un servidor de desarrollo para una
     * mejor facilidad de creación.
     * 
     * Si se desean cambiar, verifique la documentacion en: https://www.npmjs.com/package/webpack-dev-server
     */
    devServer: {
        port: process.env.PORT
    }
}