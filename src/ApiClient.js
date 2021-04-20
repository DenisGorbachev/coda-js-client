/**
 * Coda API
 * # Introduction  The Coda API is a RESTful API that lets you programmatically interact with Coda docs:   * List and search Coda docs  * Create new docs and copy existing ones  * Share and publish docs  * Discover pages, tables, formulas, and controls  * Read, insert, upsert, update, and delete rows  Version 1 of the API will be supported until at least January 15, 2021. As we update and release newer versions of the API, we reserve the right to remove older APIs and functionality with a 3-month deprecation notice. We will post about such changes as well as announce new features in the [Developers Central](https://community.coda.io/c/developers-central) section of our Community, and update the [API updates](https://coda.io/api-updates) doc.  # Getting Started  Our [Getting Started Guide](https://coda.io/t/Getting-Started-Guide-Coda-API_toujpmwflfy) helps you learn the basic of working with the API and shows a few ways you can use it. Check it out, and learn how to:  - Read data from Coda tables and write back to them - Build a one-way sync from one Coda doc to another - Automate reminders - Sync your Google Calendar to Coda  # Using the API  Coda's REST API is designed to be straightforward to use. You can use the language and platform of your choice to make requests. To get a feel for the API, you can also use a tool like [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/).  ## API Endpoint  This API uses a base path of `https://coda.io/apis/v1`.  ## Resource IDs and Links  Each resource instance retrieved via the API has the following fields:    - `id`: The resource's immutable ID, which can be used to refer to it within its context   - `type`: The type of resource, useful for identifying it in a heterogenous collection of results   - `href`: A fully qualified URI that can be used to refer to and get the latest details on the resource  Most resources can be queried by their name or ID. We recommend sticking with IDs where possible, as names are fragile and prone to being changed by your doc's users.  ### List Endpoints  Endpoints supporting listing of resources have the following fields:    - `items`: An array containing the listed resources, limited by the `limit` or `pageToken` query parameters   - `nextPageLink`: If more results are available, an API link to the next page of results   - `nextPageToken`: If more results are available, a page token that can be passed into the `pageToken` query parameter  **The maximum page size may change at any time, and may be different for different endpoints.** Please do not rely on it for any behavior of your application. If you pass a `limit` parameter that is larger than our maximum allowed limit, we will only return as many results as our maximum limit. You should look for the presence of the `nextPageToken` on the response to see if there are more results available, rather than relying on a result set that matches your provided limit.  To fetch a subsequent page of results, pass the `pageToken` parameter. Set this parameter to the value given to you as the `nextPageToken` in a page response. If no value is provided, there are no more results available. You only need to pass the `pageToken` to get the next page of results, you don't need to pass any of the parameters from your original request, as they are all implied by the `pageToken`. Any other parameters provided alongside a `pageToken` will be ignored.  ### Doc IDs  While most object IDs will have to be discovered via the API, you may find yourself frequently wanting to get the ID of a specific Coda doc.  Here's a handy tool that will extract it for you. (See if you can find the pattern!)  <form>   <fieldset style=\"margin: 0px 25px 25px 25px; display: inline;\">     <legend>Doc ID Extractor</legend>     <input type=\"text\" id=\"de_docUrl\" placeholder=\"Paste in a Coda doc URL\"            style=\"width: 250px; padding: 8px; margin-right: 20px;\" />     <span>       Your doc ID is:&nbsp;&nbsp;&nbsp;       <input id=\"de_docId\" readonly=\"true\"              style=\"width: 150px; padding: 8px; font-family: monospace; border: 1px dashed gray;\" />   </fieldset> </form>  <script>   (() => {     const docUrl = document.getElementById('de_docUrl');     const docId = document.getElementById('de_docId');     docUrl.addEventListener('input', () => {       docId.value = (docUrl.value.match(/_d([\\w-]+)/) || [])[1] || '';     });     docId.addEventListener('mousedown', () => docId.select());     docId.addEventListener('click', () => docId.select());   })(); </script>  ## Rate Limiting  The Coda API sets a reasonable limit on the number of requests that can be made per minute. Once this limit is reached, calls to the API will start returning errors with an HTTP status code of 429. If you find yourself hitting rate limits and would like your individual rate to be raised, please contact us at <help+api@coda.io>.  ## Consistency  While edits made in Coda are shared with other collaborators in real-time, it can take a few seconds for them to become available via the API. You may also notice that changes made via the API, such as updating a row, are not immediate. These endpoints all return an HTTP 202 status code, instead of a standard 200, indicating that the edit has been accepted and queued for processing. This generally takes a few seconds, and the edit may fail if invalid. Each such edit will return a `requestId` in the response, and you can pass this `requestId` to the [`#getMutationStatus`](#operation/getMutationStatus) endpoint to find out if it has been applied.  ## Volatile Formulas  Coda exposes a number of \"volatile\" formulas, as as `Today()`, `Now()`, and `User()`. When used in a live Coda doc, these formulas affect what's visible in realtime, tailored to the current user.  Such formulas behave differently with the API. Time-based values may only be current to the last edit made to the doc. User-based values may be blank or invalid.  ## Free and Paid Workspaces  We make the Coda API available to all of our users free of charge, in both free and paid workspaces. However, API usage is subject to the role of the user associated with the API token in the workspace applicable to each API request. What this means is:  - For the [`#createDoc`](#operation/createDoc) endpoint specifically, the owner of the API token must be a Doc   Maker (or Admin) in the workspace. If the \"Any member can create docs\" option in enabled in the workspace   settings, they can be an Editor and will get auto-promoted to Doc Maker upon using this endpoint. Lastly, if in   addition, the API key owner matches the \"Approved email domains\" setting, they will be auto-added to the   workspace and promoted to Doc Maker upon using this endpoint  This behavior applies to the API as well as any integrations that may use it, such as Zapier.  ## Examples  To help you get started, this documentation provides code examples in Python, Unix shell, and Google Apps Script. These examples are based on a simple doc that looks something like this:  ![](https://cdn.coda.io/external/img/api_example_doc.png)  ### Python examples  These examples use Python 3.6+. If you don't already have the `requests` module, use `pip` or `easy_install` to get it.  ### Shell examples  The shell examples are intended to be run in a Unix shell. If you're on Windows, you will need to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).  These examples use the standard cURL utility to pull from the API, and then process it with `jq` to extract and format example output. If you don't already have it, you can either [install it](https://stedolan.github.io/jq/) or run the command without it to see the raw JSON output.  ### Google Apps Script examples  ![](https://cdn.coda.io/external/img/api_gas.png)  [Google Apps Script](https://script.google.com/) makes it easy to write code in a JavaScript-like syntax and easily access many Google products with built-in libraries. You can set up your scripts to run periodically, which makes it a good environment for writing tools without maintaining your own server.  Coda provides a library for Google Apps Script. To use it, go into `Resources -> Libraries...` and enter the following library ID: `15IQuWOk8MqT50FDWomh57UqWGH23gjsWVWYFms3ton6L-UHmefYHS9Vl`. If you want to see the library's source code, it's available [here](https://script.google.com/d/15IQuWOk8MqT50FDWomh57UqWGH23gjsWVWYFms3ton6L-UHmefYHS9Vl/edit).  Google provides autocomplete for API functions as well as generated docs. You can access these docs via the Libraries dialog by clicking on the library name. Required parameters that would be included in the URL path are positional arguments in each of these functions, followed by the request body, if applicable. All remaining parameters can be specified in the options object.  ## OpenAPI/Swagger Spec  In an effort to standardize our API and make it accessible, we offer an OpenAPI 3.0 specification:  - [OpenAPI 3.0 spec - YAML](https://coda.io/apis/v1/openapi.yaml) - [OpenAPI 3.0 spec - JSON](https://coda.io/apis/v1/openapi.json)  ### Swagger 2.0  We also offer a downgraded Swagger 2.0 version of our specification. This may be useful for a number of tools that haven't yet been adapted to OpenAPI 3.0. Here are the links:  - [Swagger 2.0 spec - YAML](https://coda.io/apis/v1/swagger.yaml) - [Swagger 2.0 spec - JSON](https://coda.io/apis/v1/swagger.json)  #### Postman collection  To get started with prototyping the API quickly in Postman, you can use one of links above to import the Coda API into a collection. You'll then need to set the [appropriate header](#section/Authentication) and environment variables.  ## Client libraries  We do not currently support client libraries apart from Google Apps Script. To work with the Coda API, you can either use standard network libraries for your language, or use the appropriate Swagger Generator tool to auto-generate Coda API client libraries for your language of choice. We do not provide any guarantees that these autogenerated libraries are compatible with our API (e.g., some libraries may not work with Bearer authentication).  ### OpenAPI 3.0  [Swagger Generator 3](https://generator3.swagger.io/) (that link takes you to the docs for the generator API) can generate client libraries for [these languages](https://generator3.swagger.io/v2/clients). It's relatively new and thus only has support for a limited set of languages at this time.  ### Swagger 2.0  [Swagger Generator](https://generator.swagger.io/) takes in a legacy Swagger 2.0 specification, but can generate client libraries for [more languages](http://generator.swagger.io/api/gen/clients). You can also use local [CLI tools](https://swagger.io/docs/open-source-tools/swagger-codegen/) to generate these libraries.  ### Third-party client libraries  Some members of our amazing community have written libraries to work with our API. These aren't officially supported by Coda, but are listed here for convenience. (Please let us know if you've written a library and would like to have it included here.)  - [PHP](https://github.com/danielstieber/CodaPHP) by Daniel Stieber - [Node-RED](https://github.com/serene-water/node-red-contrib-coda-io) by Mori Sugimoto - [NodeJS](https://www.npmjs.com/package/coda-js) by Parker McMullin - [Ruby](https://rubygems.org/gems/coda_docs/) by Carlos Muñoz at Getro - [Python](https://github.com/Blasterai/codaio) by Mikhail Beliansky 
 *
 * OpenAPI spec version: 1.2.0
 * Contact: help+api@coda.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

import superagent from "superagent";
import querystring from "querystring";

/**
* @module ApiClient
* @version 1.2.0
*/

/**
* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
* application to use this class directly - the *Api and model classes provide the public API for the service. The
* contents of this file should be regarded as internal but are documented for completeness.
* @alias module:ApiClient
* @class
*/
export default class ApiClient {
    constructor() {
        /**
         * The base URL against which to resolve every API call's (relative) path.
         * @type {String}
         * @default https://coda.io/apis/v1
         */
        this.basePath = 'https://coda.io/apis/v1'.replace(/\/+$/, '');

        /**
         * The authentication methods to be included for all API calls.
         * @type {Array.<String>}
         */
        this.authentications = {
        }

        /**
         * The default HTTP headers to be included for all API calls.
         * @type {Array.<String>}
         * @default {}
         */
        this.defaultHeaders = {};

        /**
         * The default HTTP timeout for all API calls.
         * @type {Number}
         * @default 60000
         */
        this.timeout = 60000;

        /**
         * If set to false an additional timestamp parameter is added to all API GET calls to
         * prevent browser caching
         * @type {Boolean}
         * @default true
         */
        this.cache = true;

        /**
         * If set to true, the client will save the cookies from each server
         * response, and return them in the next request.
         * @default false
         */
        this.enableCookies = false;

        /*
         * Used to save and return cookies in a node.js (non-browser) setting,
         * if this.enableCookies is set to true.
         */
        if (typeof window === 'undefined') {
          this.agent = new superagent.agent();
        }

        /*
         * Allow user to override superagent agent
         */
         this.requestAgent = null;

    }

    /**
    * Returns a string representation for an actual parameter.
    * @param param The actual parameter.
    * @returns {String} The string representation of <code>param</code>.
    */
    paramToString(param) {
        if (param == undefined || param == null) {
            return '';
        }
        if (param instanceof Date) {
            return param.toJSON();
        }

        return param.toString();
    }

    /**
    * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
    * NOTE: query parameters are not handled here.
    * @param {String} path The path to append to the base URL.
    * @param {Object} pathParams The parameter values to append.
    * @returns {String} The encoded path with parameter values substituted.
    */
    buildUrl(path, pathParams) {
        if (!path.match(/^\//)) {
            path = '/' + path;
        }

        var url = this.basePath + path;
        url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
            var value;
            if (pathParams.hasOwnProperty(key)) {
                value = this.paramToString(pathParams[key]);
            } else {
                value = fullMatch;
            }

            return encodeURIComponent(value);
        });

        return url;
    }

    /**
    * Checks whether the given content type represents JSON.<br>
    * JSON content type examples:<br>
    * <ul>
    * <li>application/json</li>
    * <li>application/json; charset=UTF8</li>
    * <li>APPLICATION/JSON</li>
    * </ul>
    * @param {String} contentType The MIME content type to check.
    * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
    */
    isJsonMime(contentType) {
        return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
    }

    /**
    * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
    * @param {Array.<String>} contentTypes
    * @returns {String} The chosen content type, preferring JSON.
    */
    jsonPreferredMime(contentTypes) {
        for (var i = 0; i < contentTypes.length; i++) {
            if (this.isJsonMime(contentTypes[i])) {
                return contentTypes[i];
            }
        }

        return contentTypes[0];
    }

    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */
    isFileParam(param) {
        // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
        if (typeof require === 'function') {
            let fs;
            try {
                fs = require('fs');
            } catch (err) {}
            if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
                return true;
            }
        }

        // Buffer in Node.js
        if (typeof Buffer === 'function' && param instanceof Buffer) {
            return true;
        }

        // Blob in browser
        if (typeof Blob === 'function' && param instanceof Blob) {
            return true;
        }

        // File in browser (it seems File object is also instance of Blob, but keep this for safe)
        if (typeof File === 'function' && param instanceof File) {
            return true;
        }

        return false;
    }

    /**
    * Normalizes parameter values:
    * <ul>
    * <li>remove nils</li>
    * <li>keep files and arrays</li>
    * <li>format to string with `paramToString` for other cases</li>
    * </ul>
    * @param {Object.<String, Object>} params The parameters as object properties.
    * @returns {Object.<String, Object>} normalized parameters.
    */
    normalizeParams(params) {
        var newParams = {};
        for (var key in params) {
            if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
                var value = params[key];
                if (this.isFileParam(value) || Array.isArray(value)) {
                    newParams[key] = value;
                } else {
                    newParams[key] = this.paramToString(value);
                }
            }
        }

        return newParams;
    }

    /**
    * Enumeration of collection format separator strategies.
    * @enum {String}
    * @readonly
    */
    static CollectionFormatEnum = {
        /**
         * Comma-separated values. Value: <code>csv</code>
         * @const
         */
        CSV: ',',

        /**
         * Space-separated values. Value: <code>ssv</code>
         * @const
         */
        SSV: ' ',

        /**
         * Tab-separated values. Value: <code>tsv</code>
         * @const
         */
        TSV: '\t',

        /**
         * Pipe(|)-separated values. Value: <code>pipes</code>
         * @const
         */
        PIPES: '|',

        /**
         * Native array. Value: <code>multi</code>
         * @const
         */
        MULTI: 'multi'
    };

    /**
    * Builds a string representation of an array-type actual parameter, according to the given collection format.
    * @param {Array} param An array parameter.
    * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
    * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
    * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
    */
    buildCollectionParam(param, collectionFormat) {
        if (param == null) {
            return null;
        }
        switch (collectionFormat) {
            case 'csv':
                return param.map(this.paramToString).join(',');
            case 'ssv':
                return param.map(this.paramToString).join(' ');
            case 'tsv':
                return param.map(this.paramToString).join('\t');
            case 'pipes':
                return param.map(this.paramToString).join('|');
            case 'multi':
                //return the array directly as SuperAgent will handle it as expected
                return param.map(this.paramToString);
            default:
                throw new Error('Unknown collection format: ' + collectionFormat);
        }
    }

    /**
    * Applies authentication headers to the request.
    * @param {Object} request The request object created by a <code>superagent()</code> call.
    * @param {Array.<String>} authNames An array of authentication method names.
    */
    applyAuthToRequest(request, authNames) {
        authNames.forEach((authName) => {
            var auth = this.authentications[authName];
            switch (auth.type) {
                case 'basic':
                    if (auth.username || auth.password) {
                        request.auth(auth.username || '', auth.password || '');
                    }

                    break;
                case 'apiKey':
                    if (auth.apiKey) {
                        var data = {};
                        if (auth.apiKeyPrefix) {
                            data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
                        } else {
                            data[auth.name] = auth.apiKey;
                        }

                        if (auth['in'] === 'header') {
                            request.set(data);
                        } else {
                            request.query(data);
                        }
                    }

                    break;
                case 'oauth2':
                    if (auth.accessToken) {
                        request.set({'Authorization': 'Bearer ' + auth.accessToken});
                    }

                    break;
                default:
                    throw new Error('Unknown authentication type: ' + auth.type);
            }
        });
    }

    /**
    * Deserializes an HTTP response body into a value of the specified type.
    * @param {Object} response A SuperAgent response object.
    * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
    * all properties on <code>data<code> will be converted to this type.
    * @returns A value of the specified type.
    */
    deserialize(response, returnType) {
        if (response == null || returnType == null || response.status == 204) {
            return null;
        }

        // Rely on SuperAgent for parsing response body.
        // See http://visionmedia.github.io/superagent/#parsing-response-bodies
        var data = response.body;
        if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
            // SuperAgent does not always produce a body; use the unparsed response as a fallback
            data = response.text;
        }

        return ApiClient.convertToType(data, returnType);
    }

    

    /**
    * Invokes the REST service using the supplied settings and parameters.
    * @param {String} path The base URL to invoke.
    * @param {String} httpMethod The HTTP method to use.
    * @param {Object.<String, String>} pathParams A map of path parameters and their values.
    * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
    * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
    * @param {Object.<String, Object>} formParams A map of form parameters and their values.
    * @param {Object} bodyParam The value to pass as the request body.
    * @param {Array.<String>} authNames An array of authentication type names.
    * @param {Array.<String>} contentTypes An array of request MIME types.
    * @param {Array.<String>} accepts An array of acceptable response MIME types.
    * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
    * constructor for a complex type.
    * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
    */
    callApi(path, httpMethod, pathParams,
        queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
        returnType) {

        var url = this.buildUrl(path, pathParams);
        var request = superagent(httpMethod, url);

        // apply authentications
        this.applyAuthToRequest(request, authNames);

        // set query parameters
        if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
            queryParams['_'] = new Date().getTime();
        }

        request.query(this.normalizeParams(queryParams));

        // set header parameters
        request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

        // set requestAgent if it is set by user
        if (this.requestAgent) {
          request.agent(this.requestAgent);
        }

        // set request timeout
        request.timeout(this.timeout);

        var contentType = this.jsonPreferredMime(contentTypes);
        if (contentType) {
            // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
            if(contentType != 'multipart/form-data') {
                request.type(contentType);
            }
        } else if (!request.header['Content-Type']) {
            request.type('application/json');
        }

        if (contentType === 'application/x-www-form-urlencoded') {
            request.send(querystring.stringify(this.normalizeParams(formParams)));
        } else if (contentType == 'multipart/form-data') {
            var _formParams = this.normalizeParams(formParams);
            for (var key in _formParams) {
                if (_formParams.hasOwnProperty(key)) {
                    if (this.isFileParam(_formParams[key])) {
                        // file field
                        request.attach(key, _formParams[key]);
                    } else {
                        request.field(key, _formParams[key]);
                    }
                }
            }
        } else if (bodyParam) {
            request.send(bodyParam);
        }

        var accept = this.jsonPreferredMime(accepts);
        if (accept) {
            request.accept(accept);
        }

        if (returnType === 'Blob') {
          request.responseType('blob');
        } else if (returnType === 'String') {
          request.responseType('string');
        }

        // Attach previously saved cookies, if enabled
        if (this.enableCookies){
            if (typeof window === 'undefined') {
                this.agent.attachCookies(request);
            }
            else {
                request.withCredentials();
            }
        }

        return new Promise((resolve, reject) => {
            request.end((error, response) => {
                if (error) {
                    reject(error);
                } else {
                    try {
                        var data = this.deserialize(response, returnType);
                        if (this.enableCookies && typeof window === 'undefined'){
                            this.agent.saveCookies(response);
                        }

                        resolve({data, response});
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
        
    }

    /**
    * Parses an ISO-8601 string representation of a date value.
    * @param {String} str The date value as a string.
    * @returns {Date} The parsed date object.
    */
    static parseDate(str) {
        return new Date(str);
    }

    /**
    * Converts a value to the specified type.
    * @param {(String|Object)} data The data to convert, as a string or object.
    * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
    * all properties on <code>data<code> will be converted to this type.
    * @returns An instance of the specified type or null or undefined if data is null or undefined.
    */
    static convertToType(data, type) {
        if (data === null || data === undefined)
            return data

        switch (type) {
            case 'Boolean':
                return Boolean(data);
            case 'Integer':
                return parseInt(data, 10);
            case 'Number':
                return parseFloat(data);
            case 'String':
                return String(data);
            case 'Date':
                return ApiClient.parseDate(String(data));
            case 'Blob':
                return data;
            default:
                if (type === Object) {
                    // generic object, return directly
                    return data;
                } else if (typeof type === 'function') {
                    // for model type like: User
                    return type.constructFromObject(data);
                } else if (Array.isArray(type)) {
                    // for array type like: ['String']
                    var itemType = type[0];

                    return data.map((item) => {
                        return ApiClient.convertToType(item, itemType);
                    });
                } else if (typeof type === 'object') {
                    // for plain object type like: {'String': 'Integer'}
                    var keyType, valueType;
                    for (var k in type) {
                        if (type.hasOwnProperty(k)) {
                            keyType = k;
                            valueType = type[k];
                            break;
                        }
                    }

                    var result = {};
                    for (var k in data) {
                        if (data.hasOwnProperty(k)) {
                            var key = ApiClient.convertToType(k, keyType);
                            var value = ApiClient.convertToType(data[k], valueType);
                            result[key] = value;
                        }
                    }

                    return result;
                } else {
                    // for unknown type, return the data directly
                    return data;
                }
        }
    }

    /**
    * Constructs a new map or array model from REST data.
    * @param data {Object|Array} The REST data.
    * @param obj {Object|Array} The target object or array.
    */
    static constructFromObject(data, obj, itemType) {
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                if (data.hasOwnProperty(i))
                    obj[i] = ApiClient.convertToType(data[i], itemType);
            }
        } else {
            for (var k in data) {
                if (data.hasOwnProperty(k))
                    obj[k] = ApiClient.convertToType(data[k], itemType);
            }
        }
    };
}

/**
* The default API client implementation.
* @type {module:ApiClient}
*/
ApiClient.instance = new ApiClient();
