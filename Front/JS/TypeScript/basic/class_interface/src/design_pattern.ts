/* final class simulate */
class PrivateMessageQueue {
  private constructor(private messages: string[]) {}
}

// class BadQueue extends PrivateMessageQueue {}   /* prevent extending class */
// new PrivateMessageQueue([])                     /* prevent instatiation */

class MessageQueue {
  private constructor(private messages: string[]) {}
  static create(messages: string[]) {
    return new MessageQueue(messages);
  }
}
// class BadQueue extends MessageQueue {}           /* prevent extending class */
MessageQueue.create([]);

/* Factory Pattern */
type Shoe = {
  purpose: string;
};
class BalletFlat implements Shoe {
  purpose = 'dancing';
}
class Boot implements Shoe {
  purpose = 'woodcutting';
}
class Sneaker implements Shoe {
  purpose = 'walking';
}

let Shoe = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
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

/* builder pattern */
class RequestBuilder {
  private url: string | null = null;
  private data: object | null = null;
  private method: 'get' | 'post' | null = null;

  setURL(url: string): this {
    this.url = url;
    return this;
  }
  setData(data: object): this {
    this.data = data;
    return this;
  }
  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }
  send() {}
}
new RequestBuilder()
  .setURL('/users')
  .setData({ firstName: 'Anna' })
  .setMethod('get')
  .send();
