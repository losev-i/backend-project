export function unescape(str: string): string {
    return (`${str}${'==='.slice((str.length + 3) % 4)}`)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
}

export function escape(str: string): string {
    return str.replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export function encode(str: string): string {
    return escape(new Buffer(str).toString('base64'));
}

export function decode(str: string): string {
    return new Buffer(unescape(str), 'base64').toString();
}

export default {
    escape,
    unescape,
    encode,
    decode,
};
