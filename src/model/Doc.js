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

import ApiClient from '../ApiClient';
import DocPublished from './DocPublished';
import DocSize from './DocSize';
import Icon from './Icon';
import ModelObject from './ModelObject';

/**
* The Doc model module.
* @module model/Doc
* @version 1.2.0
*/
export default class Doc {
    /**
    * Constructs a new <code>Doc</code>.
    * Metadata about a Coda doc.
    * @alias module:model/Doc
    * @class
    * @param id {String} ID of the Coda doc.
    * @param type {module:model/Doc.TypeEnum} The type of this resource.
    * @param href {String} API link to the Coda doc.
    * @param browserLink {String} Browser-friendly link to the Coda doc.
    * @param name {String} Name of the doc.
    * @param owner {String} Email address of the doc owner.
    * @param ownerName {String} Name of the doc owner.
    * @param createdAt {Date} Timestamp for when the doc was created.
    * @param updatedAt {Date} Timestamp for when the doc was last modified.
    * @param workspaceId {String} ID of the Coda workspace containing this doc.
    * @param folderId {String} ID of the Coda folder containing this doc.
    */

    constructor(id, type, href, browserLink, name, owner, ownerName, createdAt, updatedAt, workspaceId, folderId) {
        
        
        this['id'] = id;
        this['type'] = type;
        this['href'] = href;
        this['browserLink'] = browserLink;
        this['name'] = name;
        this['owner'] = owner;
        this['ownerName'] = ownerName;
        this['createdAt'] = createdAt;
        this['updatedAt'] = updatedAt;
        this['workspaceId'] = workspaceId;
        this['folderId'] = folderId;
        
    }

    /**
    * Constructs a <code>Doc</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/Doc} obj Optional instance to populate.
    * @return {module:model/Doc} The populated <code>Doc</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Doc();
                        
            
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('href')) {
                obj['href'] = ApiClient.convertToType(data['href'], 'String');
            }
            if (data.hasOwnProperty('browserLink')) {
                obj['browserLink'] = ApiClient.convertToType(data['browserLink'], 'String');
            }
            if (data.hasOwnProperty('icon')) {
                obj['icon'] = Icon.constructFromObject(data['icon']);
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('owner')) {
                obj['owner'] = ApiClient.convertToType(data['owner'], 'String');
            }
            if (data.hasOwnProperty('ownerName')) {
                obj['ownerName'] = ApiClient.convertToType(data['ownerName'], 'String');
            }
            if (data.hasOwnProperty('docSize')) {
                obj['docSize'] = DocSize.constructFromObject(data['docSize']);
            }
            if (data.hasOwnProperty('sourceDoc')) {
                obj['sourceDoc'] = ApiClient.convertToType(data['sourceDoc'], ModelObject);
            }
            if (data.hasOwnProperty('createdAt')) {
                obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
            }
            if (data.hasOwnProperty('updatedAt')) {
                obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
            }
            if (data.hasOwnProperty('published')) {
                obj['published'] = DocPublished.constructFromObject(data['published']);
            }
            if (data.hasOwnProperty('workspaceId')) {
                obj['workspaceId'] = ApiClient.convertToType(data['workspaceId'], 'String');
            }
            if (data.hasOwnProperty('folderId')) {
                obj['folderId'] = ApiClient.convertToType(data['folderId'], 'String');
            }
        }
        return obj;
    }

    /**
    * ID of the Coda doc.
    * @member {String} id
    */
    'id' = undefined;
    /**
    * The type of this resource.
    * @member {module:model/Doc.TypeEnum} type
    */
    'type' = undefined;
    /**
    * API link to the Coda doc.
    * @member {String} href
    */
    'href' = undefined;
    /**
    * Browser-friendly link to the Coda doc.
    * @member {String} browserLink
    */
    'browserLink' = undefined;
    /**
    * @member {module:model/Icon} icon
    */
    'icon' = undefined;
    /**
    * Name of the doc.
    * @member {String} name
    */
    'name' = undefined;
    /**
    * Email address of the doc owner.
    * @member {String} owner
    */
    'owner' = undefined;
    /**
    * Name of the doc owner.
    * @member {String} ownerName
    */
    'ownerName' = undefined;
    /**
    * @member {module:model/DocSize} docSize
    */
    'docSize' = undefined;
    /**
    * @member {module:model/ModelObject} sourceDoc
    */
    'sourceDoc' = undefined;
    /**
    * Timestamp for when the doc was created.
    * @member {Date} createdAt
    */
    'createdAt' = undefined;
    /**
    * Timestamp for when the doc was last modified.
    * @member {Date} updatedAt
    */
    'updatedAt' = undefined;
    /**
    * @member {module:model/DocPublished} published
    */
    'published' = undefined;
    /**
    * ID of the Coda workspace containing this doc.
    * @member {String} workspaceId
    */
    'workspaceId' = undefined;
    /**
    * ID of the Coda folder containing this doc.
    * @member {String} folderId
    */
    'folderId' = undefined;


    /**
    * Returns ID of the Coda doc.
    * @return {String}
    */
    getId() {
        return this.id;
    }

    /**
    * Sets ID of the Coda doc.
    * @param {String} id ID of the Coda doc.
    */
    setId(id) {
        this['id'] = id;
    }
    /**
    * Returns The type of this resource.
    * @return {module:model/Doc.TypeEnum}
    */
    getType() {
        return this.type;
    }

    /**
    * Sets The type of this resource.
    * @param {module:model/Doc.TypeEnum} type The type of this resource.
    */
    setType(type) {
        this['type'] = type;
    }
    /**
    * Returns API link to the Coda doc.
    * @return {String}
    */
    getHref() {
        return this.href;
    }

    /**
    * Sets API link to the Coda doc.
    * @param {String} href API link to the Coda doc.
    */
    setHref(href) {
        this['href'] = href;
    }
    /**
    * Returns Browser-friendly link to the Coda doc.
    * @return {String}
    */
    getBrowserLink() {
        return this.browserLink;
    }

    /**
    * Sets Browser-friendly link to the Coda doc.
    * @param {String} browserLink Browser-friendly link to the Coda doc.
    */
    setBrowserLink(browserLink) {
        this['browserLink'] = browserLink;
    }
    /**
    * @return {module:model/Icon}
    */
    getIcon() {
        return this.icon;
    }

    /**
    * @param {module:model/Icon} icon
    */
    setIcon(icon) {
        this['icon'] = icon;
    }
    /**
    * Returns Name of the doc.
    * @return {String}
    */
    getName() {
        return this.name;
    }

    /**
    * Sets Name of the doc.
    * @param {String} name Name of the doc.
    */
    setName(name) {
        this['name'] = name;
    }
    /**
    * Returns Email address of the doc owner.
    * @return {String}
    */
    getOwner() {
        return this.owner;
    }

    /**
    * Sets Email address of the doc owner.
    * @param {String} owner Email address of the doc owner.
    */
    setOwner(owner) {
        this['owner'] = owner;
    }
    /**
    * Returns Name of the doc owner.
    * @return {String}
    */
    getOwnerName() {
        return this.ownerName;
    }

    /**
    * Sets Name of the doc owner.
    * @param {String} ownerName Name of the doc owner.
    */
    setOwnerName(ownerName) {
        this['ownerName'] = ownerName;
    }
    /**
    * @return {module:model/DocSize}
    */
    getDocSize() {
        return this.docSize;
    }

    /**
    * @param {module:model/DocSize} docSize
    */
    setDocSize(docSize) {
        this['docSize'] = docSize;
    }
    /**
    * @return {module:model/ModelObject}
    */
    getSourceDoc() {
        return this.sourceDoc;
    }

    /**
    * @param {module:model/ModelObject} sourceDoc
    */
    setSourceDoc(sourceDoc) {
        this['sourceDoc'] = sourceDoc;
    }
    /**
    * Returns Timestamp for when the doc was created.
    * @return {Date}
    */
    getCreatedAt() {
        return this.createdAt;
    }

    /**
    * Sets Timestamp for when the doc was created.
    * @param {Date} createdAt Timestamp for when the doc was created.
    */
    setCreatedAt(createdAt) {
        this['createdAt'] = createdAt;
    }
    /**
    * Returns Timestamp for when the doc was last modified.
    * @return {Date}
    */
    getUpdatedAt() {
        return this.updatedAt;
    }

    /**
    * Sets Timestamp for when the doc was last modified.
    * @param {Date} updatedAt Timestamp for when the doc was last modified.
    */
    setUpdatedAt(updatedAt) {
        this['updatedAt'] = updatedAt;
    }
    /**
    * @return {module:model/DocPublished}
    */
    getPublished() {
        return this.published;
    }

    /**
    * @param {module:model/DocPublished} published
    */
    setPublished(published) {
        this['published'] = published;
    }
    /**
    * Returns ID of the Coda workspace containing this doc.
    * @return {String}
    */
    getWorkspaceId() {
        return this.workspaceId;
    }

    /**
    * Sets ID of the Coda workspace containing this doc.
    * @param {String} workspaceId ID of the Coda workspace containing this doc.
    */
    setWorkspaceId(workspaceId) {
        this['workspaceId'] = workspaceId;
    }
    /**
    * Returns ID of the Coda folder containing this doc.
    * @return {String}
    */
    getFolderId() {
        return this.folderId;
    }

    /**
    * Sets ID of the Coda folder containing this doc.
    * @param {String} folderId ID of the Coda folder containing this doc.
    */
    setFolderId(folderId) {
        this['folderId'] = folderId;
    }

    /**
    * Allowed values for the <code>type</code> property.
    * @enum {String}
    * @readonly
    */
    static TypeEnum = {
        /**
         * value: "doc"
         * @const
         */
        "doc": "doc"    };

}
