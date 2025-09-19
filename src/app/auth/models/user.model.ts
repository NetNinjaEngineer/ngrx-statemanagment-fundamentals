export class User {
    constructor(
        private readonly email: string,
        private readonly localId: string,
        private readonly token: string,
        private readonly expirationDate: Date
    ) { }

    get Email(): string {
        return this.email;
    }

    get Token(): string {
        return this.token;
    }

}