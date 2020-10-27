const DmController = require('../controllers/dm.controller');

exports.routesConfig = app => {
    app.route('/').get(DmController.getList);
}