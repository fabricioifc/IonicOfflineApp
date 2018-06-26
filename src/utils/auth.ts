import PouchDB from 'pouchdb';

export class Auth {

    username: string;
    password: string;
    remote_url_base: string;
    local: any;
    remote: any;
    options: any;

    constructor(database) {
        this.username = 'ounernsitserettedeloonez';
        this.password = '1af479d38acf0f1c1559046997308cc2af084615';
        this.remote_url_base = 'https://39ecc5f5-64de-4c9f-b7bb-346db331a495-bluemix.cloudant.com/';
        
        this.options = {
            live: true,
            retry: true,
            continuous: true,  
            auth: {
                username: this.username,
                password: this.password
            }
        };
        this.local = new PouchDB(database);
        this.remote = this.remote_url_base + database;
    }

    getLocal() {
        return this.local;
    }

    getRemote() {
        return this.remote;
    }

    sync() {
        this.getLocal().sync(this.getRemote(), this.options);
    }
}