'use strict';

module.exports = class Follow {

    user_id_follower;
    user_id_followed;

    constructor(user_id_follower, user_id_followed) {
        this.user_id_follower = user_id_follower;
        this.user_id_followed = user_id_followed;
    }
}