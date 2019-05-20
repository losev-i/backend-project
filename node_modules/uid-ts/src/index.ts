import base64Url from './base64Url';
import { randomBytes, randomBytesSync } from './randomBytes';

export async function uid(length: number) {
    return base64Url.escape((await randomBytes(length)).toString('base64'));
}

export function uidSync(length: number) {
    return base64Url.escape(randomBytesSync(length).toString('base64'));
}
