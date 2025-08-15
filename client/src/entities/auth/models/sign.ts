export interface Sign {
    username: string;
    password: string;
    publicKey?: Uint8Array<ArrayBufferLike>;
}
