function Helpers(builder) {
    this.createVideoCard = function (session, title, subtitle, url) {
        let channelType = session.message.source;
        let msg = new builder.Message(session);
        let attachment = new builder.VideoCard(session)
            .title(title)
            .subtitle(subtitle)
            .media([
                { url: url }
            ]);

        if (channelType =='facebook') {
            msg.sourceEvent({
                facebook: {
                    attachment:{
                        type:"template",
                        payload:{
                            template_type:"generic",
                            elements:[{
                                title: title,
                                subtitle: subtitle,
                                image_url: url,
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
                            template_type:"generic",
                            //text: text,
                            elements:[{
                                title: title,
                                subtitle: subtitle,
                                image_url: url,
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
        } );
    };

    this.facebookButtonsCreator = function (buttons) {
        return buttons.map((button) => {
            return {
                "type": "postback",
                "title": button,
                "payload": button
            }
        } );
    };
}

module.exports = Helpers;