import _ from "lodash";
import path from 'path';

let config = {
    "staticDir":path.join(__dirname, '..', 'assets'),
    "viewDir": path.join(__dirname, '..', 'views'),
    "env":process.env.NODE_ENV
}

if(process.env.NODE_ENV == "production"){

    const proConfig = {
        port:"8081"
    }
    config = _.extend(config, proConfig);
}

if(process.env.NODE_ENV == "development"){

    const localConfig= {
        port:"8081"
    }
    config = _.extend(config, localConfig);

}

export default  config;