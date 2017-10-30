function computerSetup(builder, bot) {
    bot.dialog('Computer', [
        (session) => {
            builder.Prompts.choice(session, 'What kind of device you want to set up?', [
                'Apple OS',
                'Windows 10',
                'Windows 8',
                'windows 7',
            ]);
        },
        (session, results) => {
            session.beginDialog(results.response.entity);
        }
    ]);
}

module.exports = computerSetup;