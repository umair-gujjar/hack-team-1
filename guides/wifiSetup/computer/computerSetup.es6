function computerSetup(builder, bot) {
    let HelpersConstructor = require('../../../common/helpers.es6');
    let helpers = new HelpersConstructor(builder);

    require('./appleOS.es6')(builder, bot);
    require('./windows10.es6')(builder, bot);

    bot.dialog('Computer', [
        function (session) {
            builder.Prompts.choice(session, 'What kind of operating system you have on that device?', [
                'Apple OS',
                'Windows 10',
                'Windows 8',
                'Windows 7',
            ]);
        },
        function (session, results) {
            session.beginDialog(results.response.entity);
        },
        function (session, results) {
            session.endDialog('Can I help you with anything else?');
        }

    ]);
}

module.exports = computerSetup;