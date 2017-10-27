function wifiSetup (builder, bot) {
    require('./wifiSetup/computer/computerSetup.es6')(builder, bot);
    require('./wifiSetup/mobile/mobileSetup.es6')(builder, bot);
    /*require('./gamingConsole.es6')(builder, bot);
    require('./kindleSetup.es6')(builder, bot);
    require('./mobileSetup.es6')(builder, bot);
    require('./powerlineAdapterSetup.es6')(builder, bot);
    require('./smartTVSetup.es6')(builder, bot);
    require('./tabletSetup.es6')(builder, bot);*/

    bot.dialog('WifiSetup', [
        function (session) {
            builder.Prompts.choice(session, 'What kind of device you want to connect with wifi?', [
                'Router',
                'Computer',
                'Gaming Console',
                'Mobile',
                'Tablet',
                'Kindle',
                'Smart TV',
                'Powerline adapter'
            ]);
        },
        function (session, results) {
            session.beginDialog(results.response.entity);
        }
    ]).triggerAction({
        matches: 'WifiSetup'
    });

    bot.dialog('Router', function (session, results) {
        session.beginDialog('RouterSetup');
    });
}

module.exports = wifiSetup;