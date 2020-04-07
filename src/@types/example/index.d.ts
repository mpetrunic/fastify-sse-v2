// declare module "bcrypto/lib/random" {
//   export function randomBytes(length: number): Buffer;
// }

// declare module "bcrypto/lib/sha256" {

//   class SHA256 {
//     native: number;
//     id: string;
//     size: number;
//     bits: number;
//     blockSize: number;
//     zero: Buffer;
//     ctx: SHA256;
//     constructor();
//     init(): this;
//     update(data: Buffer): this;
//     final(): Buffer;

//     static hash(): SHA256;
//     // static hmac(): HMAC;
//     static digest(data: Buffer): Buffer;
//     static root(left: Buffer, right: Buffer): Buffer;
//     static multi(x: Buffer, y: Buffer, z: Buffer): Buffer;
//     static mac(data: Buffer, key: Buffer): Buffer;
//   }
//   export = SHA256;
// }

// declare module "bcrypto/lib/hkdf" {

//   import SHA256 = require("bcrypto/lib/sha256");

//   class HKDF {

//     static extract(hash: typeof SHA256, prk: Buffer, salt: Buffer): Buffer;
//     static expand(hash: typeof SHA256, prk: Buffer, info: Buffer, length: number): Buffer;

//   }

//   export = HKDF;

// }