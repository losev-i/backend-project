import * as crypto from 'crypto';

const GENERATE_ATTEMPTS = crypto.randomBytes === crypto.pseudoRandomBytes ? 1 : 3;
/**
 * Generates strong pseudo-random bytes.
 */
function generateRandomBytes(size: number, attempts: number, callback: (err, result: Buffer) => void) {
    crypto.randomBytes(size, (err, buf) => {
        if (!err) {
            return callback(null, buf);
        }
        if (!--attempts) {
            return callback(err, null);
        }
        setTimeout(() => { generateRandomBytes(size, attempts, callback); }, 10);
    });
}

/**
 * Generates strong pseudo-random bytes.
 *
 */
export function randomBytes(size: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        generateRandomBytes(size, GENERATE_ATTEMPTS, (err, buf) => err ? reject(err) : resolve(buf));
    });
}

/**
 * Generates strong pseudo-random bytes sync.
 *
 */
export function randomBytesSync(size: number): Buffer {
    let err = null;

    for (let i = 0; i < GENERATE_ATTEMPTS; i++) {
        try {
            return crypto.randomBytes(size);
        } catch (e) {
            err = e;
        }
    }

    throw err;
}

export default {
    randomBytes,
    randomBytesSync,
};
