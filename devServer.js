import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';
import graphQLHTTP from 'express-graphql';
import schema from './schema';

const front = express();
const compiler = webpack(config);
const { publicPath } = config.output;

const PORT_BACK  = 3002;
const PORT_FRONT = 3001;


/*
 * front
 */
front.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath
}));

front.use(require('webpack-hot-middleware')(compiler));

front.get('*', (req, res) => res.sendFile(join(__dirname, 'index.html')));

front.listen(PORT_FRONT, err => {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(`front at http://localhost:${ PORT_FRONT }`);
});


/*
 * back
 */
const back = express();

back.use('/', graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true
}));

back.listen(PORT_BACK, err => {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log(`back at http://localhost:${ PORT_BACK }`);
});
