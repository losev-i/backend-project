import { parse, Url } from 'url';

/**
 * Pattern for a simple path case.
 * See: https://github.com/joyent/node/pull/7878
 */

export interface ParsedUrl extends Url {
    _raw?: string;
}

const simplePathRegExp = /^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/;

/**
 * Parse the `req` url with memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */
export function parseurl(req) {
    const url = req.url;

    if (url === undefined) {
        // URL is undefined
        return undefined;
    }

    let parsed: ParsedUrl = req._parsedUrl;

    if (fresh(url, parsed)) {
        // Return cached URL parse
        return parsed;
    }

    // Parse the URL
    parsed = fastparse(url);

    return req._parsedUrl = parsed;
}

/**
 * Parse the `req` original url with fallback and memoization.
 *
 * @param {ServerRequest} req
 * @return {Object}
 * @api public
 */

export function originalurl(req) {
    const url = req.originalUrl;

    if (typeof url !== 'string') {
        // Fallback
        return parseurl(req);
    }

    let parsed = req._parsedOriginalUrl;

    if (fresh(url, parsed)) {
        // Return cached URL parse
        return parsed;
    }

    // Parse the URL
    parsed = fastparse(url);

    return req._parsedOriginalUrl = parsed;
}

/**
 * Parse the `str` url with fast-path short-cut.
 *
 * @param {string} str
 * @return {Object}
 * @api private
 */

function fastparse(str): Url {
    // Try fast path regexp
    // See: https://github.com/joyent/node/pull/7878
    const simplePath = typeof str === 'string' && simplePathRegExp.exec(str);

    // Construct simple URL
    if (simplePath) {
        const pathname = simplePath[1];
        const search = simplePath[2] || null;
        const url: ParsedUrl = {
            path: str,
            href: str,
            pathname,
            search,
            query: search && search.substr(1),
            _raw: str,
        };
        return url;
    }

    return parse(str);
}

/**
 * Determine if parsed is still fresh for url.
 *
 * @param {string} url
 * @param {object} parsedUrl
 * @return {boolean}
 * @api private
 */
function fresh(url, parsedUrl: ParsedUrl) {
    return typeof parsedUrl === 'object'
        && parsedUrl !== null
        && parsedUrl._raw === url;
}

export default {
    parseurl,
    originalurl,
};
