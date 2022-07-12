"use strict";
class PrivateMessageQueue {
    constructor(messages) {
        this.messages = messages;
    }
}
class MessageQueue {
    constructor(messages) {
        this.messages = messages;
    }
    static create(messages) {
        return new MessageQueue(messages);
    }
}
MessageQueue.create([]);
class BalletFlat {
    constructor() {
        this.purpose = 'dancing';
    }
}
class Boot {
    constructor() {
        this.purpose = 'woodcutting';
    }
}
class Sneaker {
    constructor() {
        this.purpose = 'walking';
    }
}
let Shoe = {
    create(type) {
        switch (type) {
            case 'balletFlat':
                return new BalletFlat();
            case 'boot':
                return new Boot();
            case 'sneaker':
                return new Sneaker();
        }
    },
};
Shoe.create('boot');
class RequestBuilder {
    constructor() {
        this.url = null;
        this.data = null;
        this.method = null;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    send() { }
}
new RequestBuilder()
    .setURL('/users')
    .setData({ firstName: 'Anna' })
    .setMethod('get')
    .send();
