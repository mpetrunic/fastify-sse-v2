declare module "it-to-stream" {

    import {Readable, ReadableOptions} from "stream";

    const toReadable: (source: AsyncIterable<any>, options?: ReadableOptions) => Readable;

    export = toReadable;

}