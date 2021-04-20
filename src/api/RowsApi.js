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

import ApiClient from "../ApiClient";
import InlineResponse400 from '../model/InlineResponse400';
import InlineResponse401 from '../model/InlineResponse401';
import InlineResponse403 from '../model/InlineResponse403';
import InlineResponse404 from '../model/InlineResponse404';
import InlineResponse429 from '../model/InlineResponse429';
import PushButtonResult from '../model/PushButtonResult';
import RowDeleteResult from '../model/RowDeleteResult';
import RowDetail from '../model/RowDetail';
import RowList from '../model/RowList';
import RowUpdate from '../model/RowUpdate';
import RowUpdateResult from '../model/RowUpdateResult';
import RowsDelete from '../model/RowsDelete';
import RowsDeleteResult from '../model/RowsDeleteResult';
import RowsSortBy from '../model/RowsSortBy';
import RowsUpsert from '../model/RowsUpsert';
import RowsUpsertResult from '../model/RowsUpsertResult';
import ValueFormat from '../model/ValueFormat';

/**
* Rows service.
* @module api/RowsApi
* @version 1.2.0
*/
export default class RowsApi {

    /**
    * Constructs a new RowsApi. 
    * @alias module:api/RowsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Delete row
     * Deletes the specified row from the table or view. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row deletions are generally processed within several seconds. When deleting using a name as opposed to an ID, an arbitrary row will be removed. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowDeleteResult} and HTTP response
     */
    deleteRowWithHttpInfo(docId, tableIdOrName, rowIdOrName) {
      let postBody = null;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName,
        'rowIdOrName': rowIdOrName
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = RowDeleteResult;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Delete row
     * Deletes the specified row from the table or view. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row deletions are generally processed within several seconds. When deleting using a name as opposed to an ID, an arbitrary row will be removed. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowDeleteResult}
     */
    deleteRow(docId, tableIdOrName, rowIdOrName) {
      return this.deleteRowWithHttpInfo(docId, tableIdOrName, rowIdOrName)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete multiple rows
     * Deletes the specified rows from the table or view. This endpoint will always return a 202. Row deletions are generally processed within several seconds. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowsDeleteResult} and HTTP response
     */
    deleteRowsWithHttpInfo(body, docId, tableIdOrName) {
      let postBody = body;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RowsDeleteResult;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Delete multiple rows
     * Deletes the specified rows from the table or view. This endpoint will always return a 202. Row deletions are generally processed within several seconds. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowsDeleteResult}
     */
    deleteRows(body, docId, tableIdOrName) {
      return this.deleteRowsWithHttpInfo(body, docId, tableIdOrName)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Get a row
     * Returns details about a row in a table.
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowDetail} and HTTP response
     */
    getRowWithHttpInfo(docId, tableIdOrName, rowIdOrName, opts) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName,
        'rowIdOrName': rowIdOrName
      };
      let queryParams = {
        'useColumnNames': opts['useColumnNames'],
        'valueFormat': opts['valueFormat']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = RowDetail;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Get a row
     * Returns details about a row in a table.
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowDetail}
     */
    getRow(docId, tableIdOrName, rowIdOrName, opts) {
      return this.getRowWithHttpInfo(docId, tableIdOrName, rowIdOrName, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List table rows
     * Returns a list of rows in a table. ### Value results The &#x60;valueFormat&#x60; parameter dictates in what format the API should return values for individual cells. * &#x60;simple&#x60; (default): Returns cell values as the following JSON values: &#x60;string&#x60;, &#x60;number&#x60;, or &#x60;boolean&#x60;. Array values (like multiselects) are returned as comma-delimited strings. * &#x60;simpleWithArrays&#x60;: Singleton values are returned as &#x60;simple&#x60;. Array values are returned as JSON arrays and the values within are &#x60;simple&#x60; values (including nested arrays). * &#x60;rich&#x60;: If applicable, returns many values with further encoding, allowing API users to have lossless access to data in Coda.   * For &#x60;text&#x60; values, returns data in Markdown syntax. If the text field is simple text (e.g. has no formatting),   the field will be fully escaped with triple-ticks. E.g   &#x60;   &#x60;&#x60;&#x60;This is plain text&#x60;&#x60;&#x60;   &#x60;   * For &#x60;currency&#x60;, &#x60;lookup&#x60;, &#x60;image&#x60;, &#x60;person&#x60; and &#x60;hyperlink&#x60; values, the value will be encoded in [JSON-LD](https://json-ld.org/) format.  &#x60;&#x60;&#x60;   // Currency   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;MonetaryAmount\&quot;,     \&quot;currency\&quot;: \&quot;USD\&quot;,     \&quot;amount\&quot;: 42.42   }    // Lookup   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;StructuredValue\&quot;,     \&quot;additionalType\&quot;: \&quot;row\&quot;,     \&quot;name\&quot;: \&quot;Row Name\&quot;,     \&quot;rowId\&quot;: \&quot;i-123456789\&quot;,     \&quot;tableId\&quot;: \&quot;grid-123456789\&quot;,     \&quot;tableUrl\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789#_r42\&quot;,   }    // Hyperlink   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;WebPage\&quot;,     \&quot;name\&quot;: \&quot;Coda\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io\&quot;   }    // Image   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;ImageObject\&quot;,     \&quot;name\&quot;: \&quot;Coda logo\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/logo.jpg\&quot;   }    // People   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;Person\&quot;,     \&quot;name\&quot;: \&quot;Art Vandalay\&quot;,     \&quot;email\&quot;: \&quot;art@vandalayindustries.com\&quot;   } &#x60;&#x60;&#x60; 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowList} and HTTP response
     */
    listRowsWithHttpInfo(docId, tableIdOrName, opts) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName
      };
      let queryParams = {
        'query': opts['query'],
        'sortBy': opts['sortBy'],
        'useColumnNames': opts['useColumnNames'],
        'valueFormat': opts['valueFormat'],
        'visibleOnly': opts['visibleOnly'],
        'limit': opts['limit'],
        'pageToken': opts['pageToken'],
        'syncToken': opts['syncToken']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = RowList;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * List table rows
     * Returns a list of rows in a table. ### Value results The &#x60;valueFormat&#x60; parameter dictates in what format the API should return values for individual cells. * &#x60;simple&#x60; (default): Returns cell values as the following JSON values: &#x60;string&#x60;, &#x60;number&#x60;, or &#x60;boolean&#x60;. Array values (like multiselects) are returned as comma-delimited strings. * &#x60;simpleWithArrays&#x60;: Singleton values are returned as &#x60;simple&#x60;. Array values are returned as JSON arrays and the values within are &#x60;simple&#x60; values (including nested arrays). * &#x60;rich&#x60;: If applicable, returns many values with further encoding, allowing API users to have lossless access to data in Coda.   * For &#x60;text&#x60; values, returns data in Markdown syntax. If the text field is simple text (e.g. has no formatting),   the field will be fully escaped with triple-ticks. E.g   &#x60;   &#x60;&#x60;&#x60;This is plain text&#x60;&#x60;&#x60;   &#x60;   * For &#x60;currency&#x60;, &#x60;lookup&#x60;, &#x60;image&#x60;, &#x60;person&#x60; and &#x60;hyperlink&#x60; values, the value will be encoded in [JSON-LD](https://json-ld.org/) format.  &#x60;&#x60;&#x60;   // Currency   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;MonetaryAmount\&quot;,     \&quot;currency\&quot;: \&quot;USD\&quot;,     \&quot;amount\&quot;: 42.42   }    // Lookup   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;StructuredValue\&quot;,     \&quot;additionalType\&quot;: \&quot;row\&quot;,     \&quot;name\&quot;: \&quot;Row Name\&quot;,     \&quot;rowId\&quot;: \&quot;i-123456789\&quot;,     \&quot;tableId\&quot;: \&quot;grid-123456789\&quot;,     \&quot;tableUrl\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789#_r42\&quot;,   }    // Hyperlink   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;WebPage\&quot;,     \&quot;name\&quot;: \&quot;Coda\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io\&quot;   }    // Image   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;ImageObject\&quot;,     \&quot;name\&quot;: \&quot;Coda logo\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/logo.jpg\&quot;   }    // People   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;Person\&quot;,     \&quot;name\&quot;: \&quot;Art Vandalay\&quot;,     \&quot;email\&quot;: \&quot;art@vandalayindustries.com\&quot;   } &#x60;&#x60;&#x60; 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowList}
     */
    listRows(docId, tableIdOrName, opts) {
      return this.listRowsWithHttpInfo(docId, tableIdOrName, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Push a button
     * Pushes a button on a row in a table. Authorization note: This action is available to API tokens that are authorized to write to the table. However, the underlying button can perform any action on the document, including writing to other tables and performing Pack actions. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/PushButtonResult} and HTTP response
     */
    pushButtonWithHttpInfo(docId, tableIdOrName, rowIdOrName, columnIdOrName) {
      let postBody = null;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName,
        'rowIdOrName': rowIdOrName,
        'columnIdOrName': columnIdOrName
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PushButtonResult;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}/buttons/{columnIdOrName}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Push a button
     * Pushes a button on a row in a table. Authorization note: This action is available to API tokens that are authorized to write to the table. However, the underlying button can perform any action on the document, including writing to other tables and performing Pack actions. 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/PushButtonResult}
     */
    pushButton(docId, tableIdOrName, rowIdOrName, columnIdOrName) {
      return this.pushButtonWithHttpInfo(docId, tableIdOrName, rowIdOrName, columnIdOrName)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update row
     * Updates the specified row in the table. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row updates are generally processed within several seconds. When updating using a name as opposed to an ID, an arbitrary row will be affected. 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowUpdateResult} and HTTP response
     */
    updateRowWithHttpInfo(body, docId, tableIdOrName, rowIdOrName, opts) {
      opts = opts || {};
      let postBody = body;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName,
        'rowIdOrName': rowIdOrName
      };
      let queryParams = {
        'disableParsing': opts['disableParsing']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RowUpdateResult;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Update row
     * Updates the specified row in the table. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row updates are generally processed within several seconds. When updating using a name as opposed to an ID, an arbitrary row will be affected. 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowUpdateResult}
     */
    updateRow(body, docId, tableIdOrName, rowIdOrName, opts) {
      return this.updateRowWithHttpInfo(body, docId, tableIdOrName, rowIdOrName, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Insert/upsert rows
     * Inserts rows into a table, optionally updating existing rows if any upsert key columns are provided. This endpoint will always return a 202, so long as the doc and table exist and are accessible (and the update is structurally valid). Row inserts/upserts are generally processed within several seconds. Note: this endpoint only works for base tables, not views. When upserting, if multiple rows match the specified key column(s), they will all be updated with the specified value. 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/RowsUpsertResult} and HTTP response
     */
    upsertRowsWithHttpInfo(body, docId, tableIdOrName, opts) {
      opts = opts || {};
      let postBody = body;

      let pathParams = {
        'docId': docId,
        'tableIdOrName': tableIdOrName
      };
      let queryParams = {
        'disableParsing': opts['disableParsing']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['Bearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = RowsUpsertResult;

      return this.apiClient.callApi(
        '/docs/{docId}/tables/{tableIdOrName}/rows', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Insert/upsert rows
     * Inserts rows into a table, optionally updating existing rows if any upsert key columns are provided. This endpoint will always return a 202, so long as the doc and table exist and are accessible (and the update is structurally valid). Row inserts/upserts are generally processed within several seconds. Note: this endpoint only works for base tables, not views. When upserting, if multiple rows match the specified key column(s), they will all be updated with the specified value. 
     * @param {Object} opts Optional parameters
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/RowsUpsertResult}
     */
    upsertRows(body, docId, tableIdOrName, opts) {
      return this.upsertRowsWithHttpInfo(body, docId, tableIdOrName, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }

}
