function Helpers(builder) {

    this.nextSteps = function(session) {
        builder.Prompts.choice(session, 'Shall we to continue?', ['Yes', 'No']);
    };

    this.continue = function(session, results) {
        if (results.response.entity == 'No') {
            session.endDialog();
            return false;
        }

        return true;
    };

    this.createVideoCard = function (session, title, subtitle, url) {
        let channelType = session.message.source;
        let msg = new builder.Message(session);

        if (channelType =='facebook') {
            msg.sourceEvent({
                facebook: {
                    attachment:{
                        type:"template",
                        payload:{
                            template_type:"open_graph",
                            elements:[{
                                url: url,
                            }]
                        }
                    }
                }
            });
        } else {
            let attachment = new builder.VideoCard(session)
                .title(title)
                .subtitle(subtitle)
                .media([
                    { url: url }
                ]
            );
            msg.addAttachment(attachment);
        }

        return msg;
    };

    this.createImageCard = function (session, title, subtitle, text, url, buttons) {
        let channelType = session.message.source;
        let msg = new builder.Message(session);
        let attachment = new builder.HeroCard(session)
            .title(title)
            .subtitle(subtitle)
            .text(text)
            .images([
                builder.CardImage.create(session, url)
            ])
            .buttons(this.buttonsCreator(session, buttons));

        if (channelType =='facebook') {
            msg.sourceEvent({
                facebook: {
                    attachment:{
                        type:"template",
                        payload: {
                            template_type:"open_graph",
                            //text: text,
                            elements:[{
                                url: url,
                                //buttons: this.facebookButtonsCreator(buttons)
                            }]
                        }
                    }
                }
            });
        } else {
            msg.addAttachment(attachment);
        }

        return msg;
    };

    this.buttonsCreator = function (session, buttons) {
        return buttons.map((button) => {
            return builder.CardAction.dialogAction(session, button)
        });
    };

    this.facebookButtonsCreator = function (buttons) {
        return buttons.map((button) => {
            return {
                "type": "postback",
                "title": button,
                "payload": button
            }
        });
    };
}

module.exports = Helpers;