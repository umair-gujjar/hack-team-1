function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    require('./apple.es6')(builder, bot);
    require('./android.es6')(builder, bot);

    bot.dialog('Mobile', [
        function (session) {
            builder.Prompts.choice(session, 'What kind of device you want to set up?', [
                'Apple',
                'Android',
            ]);
        },
        function (session, results) {
            session.beginDialog(results.response.entity);
        }
    ]);
}

module.exports = computerSetup;