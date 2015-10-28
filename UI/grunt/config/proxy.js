module.exports = {

    dev: {
        targets: [
            {
                context: [
                    '/app'
                ],
                target : 'http://192.168.3.50:5984'
            }
        ]
    },

    local: {
        targets: [
            {
                context: [
                    '/app'
                ],

                // host to forward the request
                target : 'http://localhost:5984'
            }
        ]
    }
};
