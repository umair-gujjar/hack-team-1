function Helpers() {
    this.createVideoCard = function (session) {
        return new builder.VideoCard(session)
            .title('Video guide')
            .subtitle('Setting up your Super Router')
            .media([
                { url: 'https://www.youtube.com/watch?v=5S8O_S_k5ek&t=15s' }
            ]);
    }
}

module.exports = new Helpers();