function makeAPICall (url, options = {}, skipDefaults) {
    if (!skipDefaults) {
        options.accept = options.accept || 'application/json';
        options.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
        options.credentials = options.credentials || 'same-origin';
        options.headers = options.headers || {};
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch(logError);
}

function checkStatus (response) {
    if (response.redirected) { // Former session is still alive.
        window.location.href = response.url;
    } else if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.status === 403) { // Forbidden status, the user is not logged in or session has expired
        window.location = '/';
        throw new Error('Session expired!');
    } else { // Parse the response to see if there is a message in it
        return response.json()
            .then((parsedResponse) => { // If there is, use that to make a new Error, otherwise just use a default message
                const error = new Error(parsedResponse.message ? parsedResponse.message : `HTTP Error ${response.statusText}`);
                error.status = response.statusText;
                error.response = response;
                throw error;
            });
    }
}

function parseJSON (response) {
    if (response.headers.get('content-type').includes('json')) {
        return response.json();
    }
    return response;
}

function logError (error) {
    console.error(error);
    throw error;
}

const Client = { fetch: makeAPICall };
export default Client;
