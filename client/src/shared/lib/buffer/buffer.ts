const arrayBufferToArray = (buffer: ArrayBuffer | Uint8Array): number[] => {
    return Array.from(
        buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer),
    );
};

const arrayToArrayBuffer = (array: number[]): ArrayBuffer => {
    return new Uint8Array(array).buffer;
};

const stringToArrayBuffer = (str: string): ArrayBuffer => {
    return new TextEncoder().encode(str).buffer;
};

const arrayBufferToString = (buffer: ArrayBuffer): string => {
    return new TextDecoder().decode(buffer);
};

export const bufferUtils = {
    arrayBufferToArray,
    arrayToArrayBuffer,
    stringToArrayBuffer,
    arrayBufferToString,
};
