const log4js = require('log4js');
const log = log4js.getLogger('controllers/service.controller.js');

const fs = require('fs');

module.exports.list = (req, res, next) => {
    log.info('Incoming image list request is from: ', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    fs.readdir('./app/images', function (err, files) {
        err ? next(err) : res.status(200).send(files.join('\n'));
    });
};
