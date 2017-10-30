function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    require('./apple.es6')(builder, bot);
    require('./android.es6')(builder, bot);

    bot.dialog('Mobile', [
        (session) => {
            builder.Prompts.choice(session, 'What kind of device you want to set up?', [
                'Apple',
                'Android',
            ]);
        },
        (session, results) => {
            session.beginDialog(results.response.entity);
        },
        (session, results) => {
            session.beginDialog('EndRouterSetup');
        }
    ]);
}

module.exports = computerSetup;