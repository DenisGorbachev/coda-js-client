# coda-js-client

CodaJsClient - JavaScript client for coda-js-client
# Introduction  The Coda API is a RESTful API that lets you programmatically interact with Coda docs:   * List and search Coda docs  * Create new docs and copy existing ones  * Share and publish docs  * Discover pages, tables, formulas, and controls  * Read, insert, upsert, update, and delete rows  Version 1 of the API will be supported until at least January 15, 2021. As we update and release newer versions of the API, we reserve the right to remove older APIs and functionality with a 3-month deprecation notice. We will post about such changes as well as announce new features in the [Developers Central](https://community.coda.io/c/developers-central) section of our Community, and update the [API updates](https://coda.io/api-updates) doc.  # Getting Started  Our [Getting Started Guide](https://coda.io/t/Getting-Started-Guide-Coda-API_toujpmwflfy) helps you learn the basic of working with the API and shows a few ways you can use it. Check it out, and learn how to:  - Read data from Coda tables and write back to them - Build a one-way sync from one Coda doc to another - Automate reminders - Sync your Google Calendar to Coda  # Using the API  Coda's REST API is designed to be straightforward to use. You can use the language and platform of your choice to make requests. To get a feel for the API, you can also use a tool like [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/).  ## API Endpoint  This API uses a base path of `https://coda.io/apis/v1`.  ## Resource IDs and Links  Each resource instance retrieved via the API has the following fields:    - `id`: The resource's immutable ID, which can be used to refer to it within its context   - `type`: The type of resource, useful for identifying it in a heterogenous collection of results   - `href`: A fully qualified URI that can be used to refer to and get the latest details on the resource  Most resources can be queried by their name or ID. We recommend sticking with IDs where possible, as names are fragile and prone to being changed by your doc's users.  ### List Endpoints  Endpoints supporting listing of resources have the following fields:    - `items`: An array containing the listed resources, limited by the `limit` or `pageToken` query parameters   - `nextPageLink`: If more results are available, an API link to the next page of results   - `nextPageToken`: If more results are available, a page token that can be passed into the `pageToken` query parameter  **The maximum page size may change at any time, and may be different for different endpoints.** Please do not rely on it for any behavior of your application. If you pass a `limit` parameter that is larger than our maximum allowed limit, we will only return as many results as our maximum limit. You should look for the presence of the `nextPageToken` on the response to see if there are more results available, rather than relying on a result set that matches your provided limit.  To fetch a subsequent page of results, pass the `pageToken` parameter. Set this parameter to the value given to you as the `nextPageToken` in a page response. If no value is provided, there are no more results available. You only need to pass the `pageToken` to get the next page of results, you don't need to pass any of the parameters from your original request, as they are all implied by the `pageToken`. Any other parameters provided alongside a `pageToken` will be ignored.  ### Doc IDs  While most object IDs will have to be discovered via the API, you may find yourself frequently wanting to get the ID of a specific Coda doc.  Here's a handy tool that will extract it for you. (See if you can find the pattern!)  <form>   <fieldset style=\"margin: 0px 25px 25px 25px; display: inline;\">     <legend>Doc ID Extractor</legend>     <input type=\"text\" id=\"de_docUrl\" placeholder=\"Paste in a Coda doc URL\"            style=\"width: 250px; padding: 8px; margin-right: 20px;\" />     <span>       Your doc ID is:&nbsp;&nbsp;&nbsp;       <input id=\"de_docId\" readonly=\"true\"              style=\"width: 150px; padding: 8px; font-family: monospace; border: 1px dashed gray;\" />   </fieldset> </form>  <script>   (() => {     const docUrl = document.getElementById('de_docUrl');     const docId = document.getElementById('de_docId');     docUrl.addEventListener('input', () => {       docId.value = (docUrl.value.match(/_d([\\w-]+)/) || [])[1] || '';     });     docId.addEventListener('mousedown', () => docId.select());     docId.addEventListener('click', () => docId.select());   })(); </script>  ## Rate Limiting  The Coda API sets a reasonable limit on the number of requests that can be made per minute. Once this limit is reached, calls to the API will start returning errors with an HTTP status code of 429. If you find yourself hitting rate limits and would like your individual rate to be raised, please contact us at <help+api@coda.io>.  ## Consistency  While edits made in Coda are shared with other collaborators in real-time, it can take a few seconds for them to become available via the API. You may also notice that changes made via the API, such as updating a row, are not immediate. These endpoints all return an HTTP 202 status code, instead of a standard 200, indicating that the edit has been accepted and queued for processing. This generally takes a few seconds, and the edit may fail if invalid. Each such edit will return a `requestId` in the response, and you can pass this `requestId` to the [`#getMutationStatus`](#operation/getMutationStatus) endpoint to find out if it has been applied.  ## Volatile Formulas  Coda exposes a number of \"volatile\" formulas, as as `Today()`, `Now()`, and `User()`. When used in a live Coda doc, these formulas affect what's visible in realtime, tailored to the current user.  Such formulas behave differently with the API. Time-based values may only be current to the last edit made to the doc. User-based values may be blank or invalid.  ## Free and Paid Workspaces  We make the Coda API available to all of our users free of charge, in both free and paid workspaces. However, API usage is subject to the role of the user associated with the API token in the workspace applicable to each API request. What this means is:  - For the [`#createDoc`](#operation/createDoc) endpoint specifically, the owner of the API token must be a Doc   Maker (or Admin) in the workspace. If the \"Any member can create docs\" option in enabled in the workspace   settings, they can be an Editor and will get auto-promoted to Doc Maker upon using this endpoint. Lastly, if in   addition, the API key owner matches the \"Approved email domains\" setting, they will be auto-added to the   workspace and promoted to Doc Maker upon using this endpoint  This behavior applies to the API as well as any integrations that may use it, such as Zapier.  ## Examples  To help you get started, this documentation provides code examples in Python, Unix shell, and Google Apps Script. These examples are based on a simple doc that looks something like this:  ![](https://cdn.coda.io/external/img/api_example_doc.png)  ### Python examples  These examples use Python 3.6+. If you don't already have the `requests` module, use `pip` or `easy_install` to get it.  ### Shell examples  The shell examples are intended to be run in a Unix shell. If you're on Windows, you will need to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10).  These examples use the standard cURL utility to pull from the API, and then process it with `jq` to extract and format example output. If you don't already have it, you can either [install it](https://stedolan.github.io/jq/) or run the command without it to see the raw JSON output.  ### Google Apps Script examples  ![](https://cdn.coda.io/external/img/api_gas.png)  [Google Apps Script](https://script.google.com/) makes it easy to write code in a JavaScript-like syntax and easily access many Google products with built-in libraries. You can set up your scripts to run periodically, which makes it a good environment for writing tools without maintaining your own server.  Coda provides a library for Google Apps Script. To use it, go into `Resources -> Libraries...` and enter the following library ID: `15IQuWOk8MqT50FDWomh57UqWGH23gjsWVWYFms3ton6L-UHmefYHS9Vl`. If you want to see the library's source code, it's available [here](https://script.google.com/d/15IQuWOk8MqT50FDWomh57UqWGH23gjsWVWYFms3ton6L-UHmefYHS9Vl/edit).  Google provides autocomplete for API functions as well as generated docs. You can access these docs via the Libraries dialog by clicking on the library name. Required parameters that would be included in the URL path are positional arguments in each of these functions, followed by the request body, if applicable. All remaining parameters can be specified in the options object.  ## OpenAPI/Swagger Spec  In an effort to standardize our API and make it accessible, we offer an OpenAPI 3.0 specification:  - [OpenAPI 3.0 spec - YAML](https://coda.io/apis/v1/openapi.yaml) - [OpenAPI 3.0 spec - JSON](https://coda.io/apis/v1/openapi.json)  ### Swagger 2.0  We also offer a downgraded Swagger 2.0 version of our specification. This may be useful for a number of tools that haven't yet been adapted to OpenAPI 3.0. Here are the links:  - [Swagger 2.0 spec - YAML](https://coda.io/apis/v1/swagger.yaml) - [Swagger 2.0 spec - JSON](https://coda.io/apis/v1/swagger.json)  #### Postman collection  To get started with prototyping the API quickly in Postman, you can use one of links above to import the Coda API into a collection. You'll then need to set the [appropriate header](#section/Authentication) and environment variables.  ## Client libraries  We do not currently support client libraries apart from Google Apps Script. To work with the Coda API, you can either use standard network libraries for your language, or use the appropriate Swagger Generator tool to auto-generate Coda API client libraries for your language of choice. We do not provide any guarantees that these autogenerated libraries are compatible with our API (e.g., some libraries may not work with Bearer authentication).  ### OpenAPI 3.0  [Swagger Generator 3](https://generator3.swagger.io/) (that link takes you to the docs for the generator API) can generate client libraries for [these languages](https://generator3.swagger.io/v2/clients). It's relatively new and thus only has support for a limited set of languages at this time.  ### Swagger 2.0  [Swagger Generator](https://generator.swagger.io/) takes in a legacy Swagger 2.0 specification, but can generate client libraries for [more languages](http://generator.swagger.io/api/gen/clients). You can also use local [CLI tools](https://swagger.io/docs/open-source-tools/swagger-codegen/) to generate these libraries.  ### Third-party client libraries  Some members of our amazing community have written libraries to work with our API. These aren't officially supported by Coda, but are listed here for convenience. (Please let us know if you've written a library and would like to have it included here.)  - [PHP](https://github.com/danielstieber/CodaPHP) by Daniel Stieber - [Node-RED](https://github.com/serene-water/node-red-contrib-coda-io) by Mori Sugimoto - [NodeJS](https://www.npmjs.com/package/coda-js) by Parker McMullin - [Ruby](https://rubygems.org/gems/coda_docs/) by Carlos Muñoz at Getro - [Python](https://github.com/Blasterai/codaio) by Mikhail Beliansky 
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 1.2.0
- Package version: 1.2.0
- Build package: io.swagger.codegen.v3.generators.javascript.JavaScriptClientCodegen
For more information, please visit [https://coda.io](https://coda.io)

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install coda-js-client --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var CodaJsClient = require('coda-js-client');
var defaultClient = CodaJsClient.ApiClient.instance;


var api = new CodaJsClient.AccountApi()
api.whoami().then(function(data) {
  console.log('API called successfully. Returned data: ' + data);
}, function(error) {
  console.error(error);
});

```

## Documentation for API Endpoints

All URIs are relative to *https://coda.io/apis/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*CodaJsClient.AccountApi* | [**whoami**](docs/AccountApi.md#whoami) | **GET** /whoami | Get user info
*CodaJsClient.AnalyticsApi* | [**listDocAnalytics**](docs/AnalyticsApi.md#listDocAnalytics) | **GET** /analytics/docs | List doc analytics
*CodaJsClient.ColumnsApi* | [**getColumn**](docs/ColumnsApi.md#getColumn) | **GET** /docs/{docId}/tables/{tableIdOrName}/columns/{columnIdOrName} | Get a column
*CodaJsClient.ColumnsApi* | [**listColumns**](docs/ColumnsApi.md#listColumns) | **GET** /docs/{docId}/tables/{tableIdOrName}/columns | List columns
*CodaJsClient.ControlsApi* | [**getControl**](docs/ControlsApi.md#getControl) | **GET** /docs/{docId}/controls/{controlIdOrName} | Get a control
*CodaJsClient.ControlsApi* | [**listControls**](docs/ControlsApi.md#listControls) | **GET** /docs/{docId}/controls | List controls
*CodaJsClient.DocsApi* | [**createDoc**](docs/DocsApi.md#createDoc) | **POST** /docs | Create doc
*CodaJsClient.DocsApi* | [**deleteDoc**](docs/DocsApi.md#deleteDoc) | **DELETE** /docs/{docId} | Delete doc
*CodaJsClient.DocsApi* | [**getDoc**](docs/DocsApi.md#getDoc) | **GET** /docs/{docId} | Get info about a doc
*CodaJsClient.DocsApi* | [**listDocs**](docs/DocsApi.md#listDocs) | **GET** /docs | List available docs
*CodaJsClient.FormulasApi* | [**getFormula**](docs/FormulasApi.md#getFormula) | **GET** /docs/{docId}/formulas/{formulaIdOrName} | Get a formula
*CodaJsClient.FormulasApi* | [**listFormulas**](docs/FormulasApi.md#listFormulas) | **GET** /docs/{docId}/formulas | List formulas
*CodaJsClient.MiscellaneousApi* | [**getMutationStatus**](docs/MiscellaneousApi.md#getMutationStatus) | **GET** /mutationStatus/{requestId} | Get mutation status
*CodaJsClient.MiscellaneousApi* | [**resolveBrowserLink**](docs/MiscellaneousApi.md#resolveBrowserLink) | **GET** /resolveBrowserLink | Resolve browser link
*CodaJsClient.PacksApi* | [**addPackPermission**](docs/PacksApi.md#addPackPermission) | **POST** /packs/{packId}/permissions | Add a permission for Pack
*CodaJsClient.PacksApi* | [**createPack**](docs/PacksApi.md#createPack) | **POST** /packs | Create Pack
*CodaJsClient.PacksApi* | [**deletePackPermission**](docs/PacksApi.md#deletePackPermission) | **DELETE** /packs/{packId}/permissions/{permissionId} | Delete a permission for Pack
*CodaJsClient.PacksApi* | [**getPack**](docs/PacksApi.md#getPack) | **GET** /packs/{packId} | Get a single Pack
*CodaJsClient.PacksApi* | [**getPackPermissions**](docs/PacksApi.md#getPackPermissions) | **GET** /packs/{packId}/permissions | List permissions for a Pack
*CodaJsClient.PacksApi* | [**listPacks**](docs/PacksApi.md#listPacks) | **GET** /packs | List Packs
*CodaJsClient.PacksApi* | [**packAssetUploadComplete**](docs/PacksApi.md#packAssetUploadComplete) | **POST** /packs/{packId}/assets/{packAssetId}/assetType/{packAssetType}/uploadComplete | Pack asset upload complete
*CodaJsClient.PacksApi* | [**packVersionUploadComplete**](docs/PacksApi.md#packVersionUploadComplete) | **POST** /packs/{packId}/versions/{packVersion}/uploadComplete | Pack version upload complete
*CodaJsClient.PacksApi* | [**registerPackVersion**](docs/PacksApi.md#registerPackVersion) | **POST** /packs/{packId}/versions/{packVersion}/register | Register Pack version
*CodaJsClient.PacksApi* | [**setPackLiveVersion**](docs/PacksApi.md#setPackLiveVersion) | **PUT** /packs/{packId}/liveVersion | Set live version for Pack
*CodaJsClient.PacksApi* | [**updatePack**](docs/PacksApi.md#updatePack) | **PATCH** /packs/{packId} | Update Pack
*CodaJsClient.PacksApi* | [**uploadPackAsset**](docs/PacksApi.md#uploadPackAsset) | **POST** /packs/{packId}/uploadAsset | Upload a Pack asset.
*CodaJsClient.PagesApi* | [**getPage**](docs/PagesApi.md#getPage) | **GET** /docs/{docId}/pages/{pageIdOrName} | Get a page
*CodaJsClient.PagesApi* | [**listPages**](docs/PagesApi.md#listPages) | **GET** /docs/{docId}/pages | List pages
*CodaJsClient.PagesApi* | [**updatePage**](docs/PagesApi.md#updatePage) | **PUT** /docs/{docId}/pages/{pageIdOrName} | Update a page
*CodaJsClient.PermissionsApi* | [**addPermission**](docs/PermissionsApi.md#addPermission) | **POST** /docs/{docId}/acl/permissions | Add permission
*CodaJsClient.PermissionsApi* | [**deletePermission**](docs/PermissionsApi.md#deletePermission) | **DELETE** /docs/{docId}/acl/permissions/{permissionId} | Delete permission
*CodaJsClient.PermissionsApi* | [**getPermissions**](docs/PermissionsApi.md#getPermissions) | **GET** /docs/{docId}/acl/permissions | List permissions
*CodaJsClient.PermissionsApi* | [**getSharingMetadata**](docs/PermissionsApi.md#getSharingMetadata) | **GET** /docs/{docId}/acl/metadata | Get sharing metadata
*CodaJsClient.PublishingApi* | [**listCategories**](docs/PublishingApi.md#listCategories) | **GET** /categories | Get doc categories
*CodaJsClient.PublishingApi* | [**publishDoc**](docs/PublishingApi.md#publishDoc) | **PUT** /docs/{docId}/publish | Publish doc
*CodaJsClient.PublishingApi* | [**unpublishDoc**](docs/PublishingApi.md#unpublishDoc) | **DELETE** /docs/{docId}/publish | Unpublish doc
*CodaJsClient.RowsApi* | [**deleteRow**](docs/RowsApi.md#deleteRow) | **DELETE** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Delete row
*CodaJsClient.RowsApi* | [**deleteRows**](docs/RowsApi.md#deleteRows) | **DELETE** /docs/{docId}/tables/{tableIdOrName}/rows | Delete multiple rows
*CodaJsClient.RowsApi* | [**getRow**](docs/RowsApi.md#getRow) | **GET** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Get a row
*CodaJsClient.RowsApi* | [**listRows**](docs/RowsApi.md#listRows) | **GET** /docs/{docId}/tables/{tableIdOrName}/rows | List table rows
*CodaJsClient.RowsApi* | [**pushButton**](docs/RowsApi.md#pushButton) | **POST** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}/buttons/{columnIdOrName} | Push a button
*CodaJsClient.RowsApi* | [**updateRow**](docs/RowsApi.md#updateRow) | **PUT** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Update row
*CodaJsClient.RowsApi* | [**upsertRows**](docs/RowsApi.md#upsertRows) | **POST** /docs/{docId}/tables/{tableIdOrName}/rows | Insert/upsert rows
*CodaJsClient.TablesApi* | [**getTable**](docs/TablesApi.md#getTable) | **GET** /docs/{docId}/tables/{tableIdOrName} | Get a table
*CodaJsClient.TablesApi* | [**listTables**](docs/TablesApi.md#listTables) | **GET** /docs/{docId}/tables | List tables
*CodaJsClient.WorkspacesApi* | [**changeUserRole**](docs/WorkspacesApi.md#changeUserRole) | **POST** /workspaces/{workspaceId}/users/role | Updates user role
*CodaJsClient.WorkspacesApi* | [**listWorkspaceMembers**](docs/WorkspacesApi.md#listWorkspaceMembers) | **GET** /workspaces/{workspaceId}/users | List workspace users
*CodaJsClient.WorkspacesApi* | [**listWorkspaceRoleActivity**](docs/WorkspacesApi.md#listWorkspaceRoleActivity) | **GET** /workspaces/{workspaceId}/roles | List workspace roles

## Documentation for Models

 - [CodaJsClient.AccessType](docs/AccessType.md)
 - [CodaJsClient.Acl](docs/Acl.md)
 - [CodaJsClient.AclMetadata](docs/AclMetadata.md)
 - [CodaJsClient.AddPackPermissionRequest](docs/AddPackPermissionRequest.md)
 - [CodaJsClient.AddPackPermissionResponse](docs/AddPackPermissionResponse.md)
 - [CodaJsClient.AddPermissionRequest](docs/AddPermissionRequest.md)
 - [CodaJsClient.AddPermissionResult](docs/AddPermissionResult.md)
 - [CodaJsClient.AllOfAclNextPageLink](docs/AllOfAclNextPageLink.md)
 - [CodaJsClient.AllOfColumnListNextPageLink](docs/AllOfColumnListNextPageLink.md)
 - [CodaJsClient.AllOfControlListNextPageLink](docs/AllOfControlListNextPageLink.md)
 - [CodaJsClient.AllOfDocAnalyticsCollectionNextPageLink](docs/AllOfDocAnalyticsCollectionNextPageLink.md)
 - [CodaJsClient.AllOfDocAnalyticsItemDoc](docs/AllOfDocAnalyticsItemDoc.md)
 - [CodaJsClient.AllOfDocListNextPageLink](docs/AllOfDocListNextPageLink.md)
 - [CodaJsClient.AllOfDocSourceDoc](docs/AllOfDocSourceDoc.md)
 - [CodaJsClient.AllOfDocumentCreationResultSourceDoc](docs/AllOfDocumentCreationResultSourceDoc.md)
 - [CodaJsClient.AllOfFormulaListNextPageLink](docs/AllOfFormulaListNextPageLink.md)
 - [CodaJsClient.AllOfPackSummaryListNextPageLink](docs/AllOfPackSummaryListNextPageLink.md)
 - [CodaJsClient.AllOfPageListNextPageLink](docs/AllOfPageListNextPageLink.md)
 - [CodaJsClient.AllOfRowListNextPageLink](docs/AllOfRowListNextPageLink.md)
 - [CodaJsClient.AllOfTableFilter](docs/AllOfTableFilter.md)
 - [CodaJsClient.AllOfTableListNextPageLink](docs/AllOfTableListNextPageLink.md)
 - [CodaJsClient.AllOfWorkspaceMembersListNextPageLink](docs/AllOfWorkspaceMembersListNextPageLink.md)
 - [CodaJsClient.AnyonePrincipal](docs/AnyonePrincipal.md)
 - [CodaJsClient.ApiLink](docs/ApiLink.md)
 - [CodaJsClient.ApiLinkResolvedResource](docs/ApiLinkResolvedResource.md)
 - [CodaJsClient.CellEdit](docs/CellEdit.md)
 - [CodaJsClient.CellValue](docs/CellValue.md)
 - [CodaJsClient.ChangeRole](docs/ChangeRole.md)
 - [CodaJsClient.ChangeRoleResult](docs/ChangeRoleResult.md)
 - [CodaJsClient.Column](docs/Column.md)
 - [CodaJsClient.ColumnDetail](docs/ColumnDetail.md)
 - [CodaJsClient.ColumnFormat](docs/ColumnFormat.md)
 - [CodaJsClient.ColumnFormatType](docs/ColumnFormatType.md)
 - [CodaJsClient.ColumnList](docs/ColumnList.md)
 - [CodaJsClient.ColumnReference](docs/ColumnReference.md)
 - [CodaJsClient.Control](docs/Control.md)
 - [CodaJsClient.ControlList](docs/ControlList.md)
 - [CodaJsClient.ControlReference](docs/ControlReference.md)
 - [CodaJsClient.ControlType](docs/ControlType.md)
 - [CodaJsClient.CreatePackRequest](docs/CreatePackRequest.md)
 - [CodaJsClient.CreatePackResponse](docs/CreatePackResponse.md)
 - [CodaJsClient.CreatePackVersionResponse](docs/CreatePackVersionResponse.md)
 - [CodaJsClient.CurrencyAmount](docs/CurrencyAmount.md)
 - [CodaJsClient.CurrencyColumnFormat](docs/CurrencyColumnFormat.md)
 - [CodaJsClient.CurrencyFormatType](docs/CurrencyFormatType.md)
 - [CodaJsClient.CurrencyValue](docs/CurrencyValue.md)
 - [CodaJsClient.DateColumnFormat](docs/DateColumnFormat.md)
 - [CodaJsClient.DateTimeColumnFormat](docs/DateTimeColumnFormat.md)
 - [CodaJsClient.DeletePackPermissionResponse](docs/DeletePackPermissionResponse.md)
 - [CodaJsClient.DeletePermissionResult](docs/DeletePermissionResult.md)
 - [CodaJsClient.Doc](docs/Doc.md)
 - [CodaJsClient.DocAnalyticsCollection](docs/DocAnalyticsCollection.md)
 - [CodaJsClient.DocAnalyticsItem](docs/DocAnalyticsItem.md)
 - [CodaJsClient.DocAnalyticsScale](docs/DocAnalyticsScale.md)
 - [CodaJsClient.DocCategory](docs/DocCategory.md)
 - [CodaJsClient.DocCategoryList](docs/DocCategoryList.md)
 - [CodaJsClient.DocCreate](docs/DocCreate.md)
 - [CodaJsClient.DocDelete](docs/DocDelete.md)
 - [CodaJsClient.DocList](docs/DocList.md)
 - [CodaJsClient.DocPublish](docs/DocPublish.md)
 - [CodaJsClient.DocPublishMode](docs/DocPublishMode.md)
 - [CodaJsClient.DocPublished](docs/DocPublished.md)
 - [CodaJsClient.DocReference](docs/DocReference.md)
 - [CodaJsClient.DocSize](docs/DocSize.md)
 - [CodaJsClient.DocumentCreationResult](docs/DocumentCreationResult.md)
 - [CodaJsClient.DocumentMutateResponse](docs/DocumentMutateResponse.md)
 - [CodaJsClient.DomainPrincipal](docs/DomainPrincipal.md)
 - [CodaJsClient.DurationColumnFormat](docs/DurationColumnFormat.md)
 - [CodaJsClient.DurationUnit](docs/DurationUnit.md)
 - [CodaJsClient.EmailColumnFormat](docs/EmailColumnFormat.md)
 - [CodaJsClient.EmailDisplayType](docs/EmailDisplayType.md)
 - [CodaJsClient.EmailPrincipal](docs/EmailPrincipal.md)
 - [CodaJsClient.Formula](docs/Formula.md)
 - [CodaJsClient.FormulaDetail](docs/FormulaDetail.md)
 - [CodaJsClient.FormulaList](docs/FormulaList.md)
 - [CodaJsClient.FormulaReference](docs/FormulaReference.md)
 - [CodaJsClient.GetWorkspaceRoleActivity](docs/GetWorkspaceRoleActivity.md)
 - [CodaJsClient.Icon](docs/Icon.md)
 - [CodaJsClient.IconSet](docs/IconSet.md)
 - [CodaJsClient.Image](docs/Image.md)
 - [CodaJsClient.ImageStatus](docs/ImageStatus.md)
 - [CodaJsClient.ImageUrlValue](docs/ImageUrlValue.md)
 - [CodaJsClient.InlineResponse400](docs/InlineResponse400.md)
 - [CodaJsClient.InlineResponse4001](docs/InlineResponse4001.md)
 - [CodaJsClient.InlineResponse4001CodaDetail](docs/InlineResponse4001CodaDetail.md)
 - [CodaJsClient.InlineResponse401](docs/InlineResponse401.md)
 - [CodaJsClient.InlineResponse403](docs/InlineResponse403.md)
 - [CodaJsClient.InlineResponse404](docs/InlineResponse404.md)
 - [CodaJsClient.InlineResponse410](docs/InlineResponse410.md)
 - [CodaJsClient.InlineResponse429](docs/InlineResponse429.md)
 - [CodaJsClient.Layout](docs/Layout.md)
 - [CodaJsClient.LinkedDataObject](docs/LinkedDataObject.md)
 - [CodaJsClient.LinkedDataType](docs/LinkedDataType.md)
 - [CodaJsClient.MutationStatus](docs/MutationStatus.md)
 - [CodaJsClient.NextPageLink](docs/NextPageLink.md)
 - [CodaJsClient.NextPageToken](docs/NextPageToken.md)
 - [CodaJsClient.NextSyncToken](docs/NextSyncToken.md)
 - [CodaJsClient.NumberOrNumberFormula](docs/NumberOrNumberFormula.md)
 - [CodaJsClient.NumericColumnFormat](docs/NumericColumnFormat.md)
 - [CodaJsClient.OneOfCellValue](docs/OneOfCellValue.md)
 - [CodaJsClient.OneOfColumnFormat](docs/OneOfColumnFormat.md)
 - [CodaJsClient.OneOfCurrencyAmount](docs/OneOfCurrencyAmount.md)
 - [CodaJsClient.OneOfNumberOrNumberFormula](docs/OneOfNumberOrNumberFormula.md)
 - [CodaJsClient.OneOfPackPrincipal](docs/OneOfPackPrincipal.md)
 - [CodaJsClient.OneOfPrincipal](docs/OneOfPrincipal.md)
 - [CodaJsClient.OneOfRichSingleValue](docs/OneOfRichSingleValue.md)
 - [CodaJsClient.OneOfRichValue](docs/OneOfRichValue.md)
 - [CodaJsClient.OneOfScalarValue](docs/OneOfScalarValue.md)
 - [CodaJsClient.OneOfValue](docs/OneOfValue.md)
 - [CodaJsClient.Pack](docs/Pack.md)
 - [CodaJsClient.PackAccessType](docs/PackAccessType.md)
 - [CodaJsClient.PackAssetType](docs/PackAssetType.md)
 - [CodaJsClient.PackAssetUploadCompleteRequest](docs/PackAssetUploadCompleteRequest.md)
 - [CodaJsClient.PackAssetUploadCompleteResponse](docs/PackAssetUploadCompleteResponse.md)
 - [CodaJsClient.PackAssetUploadInfo](docs/PackAssetUploadInfo.md)
 - [CodaJsClient.PackGlobalPrincipal](docs/PackGlobalPrincipal.md)
 - [CodaJsClient.PackPermission](docs/PackPermission.md)
 - [CodaJsClient.PackPermissionList](docs/PackPermissionList.md)
 - [CodaJsClient.PackPrincipal](docs/PackPrincipal.md)
 - [CodaJsClient.PackPrincipalType](docs/PackPrincipalType.md)
 - [CodaJsClient.PackRateLimit](docs/PackRateLimit.md)
 - [CodaJsClient.PackSummary](docs/PackSummary.md)
 - [CodaJsClient.PackSummaryList](docs/PackSummaryList.md)
 - [CodaJsClient.PackUserPrincipal](docs/PackUserPrincipal.md)
 - [CodaJsClient.PackVersionUploadInfo](docs/PackVersionUploadInfo.md)
 - [CodaJsClient.PackWorkspacePrincipal](docs/PackWorkspacePrincipal.md)
 - [CodaJsClient.PacksSortBy](docs/PacksSortBy.md)
 - [CodaJsClient.Page](docs/Page.md)
 - [CodaJsClient.PageList](docs/PageList.md)
 - [CodaJsClient.PageReference](docs/PageReference.md)
 - [CodaJsClient.PageUpdate](docs/PageUpdate.md)
 - [CodaJsClient.PageUpdateResult](docs/PageUpdateResult.md)
 - [CodaJsClient.Permission](docs/Permission.md)
 - [CodaJsClient.PersonValue](docs/PersonValue.md)
 - [CodaJsClient.Principal](docs/Principal.md)
 - [CodaJsClient.PrincipalType](docs/PrincipalType.md)
 - [CodaJsClient.PublishResult](docs/PublishResult.md)
 - [CodaJsClient.PushButtonResult](docs/PushButtonResult.md)
 - [CodaJsClient.ReferenceColumnFormat](docs/ReferenceColumnFormat.md)
 - [CodaJsClient.RichSingleValue](docs/RichSingleValue.md)
 - [CodaJsClient.RichValue](docs/RichValue.md)
 - [CodaJsClient.Row](docs/Row.md)
 - [CodaJsClient.RowDeleteResult](docs/RowDeleteResult.md)
 - [CodaJsClient.RowDetail](docs/RowDetail.md)
 - [CodaJsClient.RowEdit](docs/RowEdit.md)
 - [CodaJsClient.RowList](docs/RowList.md)
 - [CodaJsClient.RowUpdate](docs/RowUpdate.md)
 - [CodaJsClient.RowUpdateResult](docs/RowUpdateResult.md)
 - [CodaJsClient.RowValue](docs/RowValue.md)
 - [CodaJsClient.RowsDelete](docs/RowsDelete.md)
 - [CodaJsClient.RowsDeleteResult](docs/RowsDeleteResult.md)
 - [CodaJsClient.RowsSortBy](docs/RowsSortBy.md)
 - [CodaJsClient.RowsUpsert](docs/RowsUpsert.md)
 - [CodaJsClient.RowsUpsertResult](docs/RowsUpsertResult.md)
 - [CodaJsClient.ScalarValue](docs/ScalarValue.md)
 - [CodaJsClient.ScaleColumnFormat](docs/ScaleColumnFormat.md)
 - [CodaJsClient.SetPackLiveVersionRequest](docs/SetPackLiveVersionRequest.md)
 - [CodaJsClient.SetPackLiveVersionResponse](docs/SetPackLiveVersionResponse.md)
 - [CodaJsClient.SimpleColumnFormat](docs/SimpleColumnFormat.md)
 - [CodaJsClient.SliderColumnFormat](docs/SliderColumnFormat.md)
 - [CodaJsClient.Sort](docs/Sort.md)
 - [CodaJsClient.SortBy](docs/SortBy.md)
 - [CodaJsClient.SortDirection](docs/SortDirection.md)
 - [CodaJsClient.Table](docs/Table.md)
 - [CodaJsClient.TableList](docs/TableList.md)
 - [CodaJsClient.TableReference](docs/TableReference.md)
 - [CodaJsClient.TableType](docs/TableType.md)
 - [CodaJsClient.TimeColumnFormat](docs/TimeColumnFormat.md)
 - [CodaJsClient.Type](docs/Type.md)
 - [CodaJsClient.UnpublishResult](docs/UnpublishResult.md)
 - [CodaJsClient.UpdatePackRequest](docs/UpdatePackRequest.md)
 - [CodaJsClient.UpdatePackRequestOverallRateLimit](docs/UpdatePackRequestOverallRateLimit.md)
 - [CodaJsClient.UploadPackAssetRequest](docs/UploadPackAssetRequest.md)
 - [CodaJsClient.UrlValue](docs/UrlValue.md)
 - [CodaJsClient.User](docs/User.md)
 - [CodaJsClient.ValidationError](docs/ValidationError.md)
 - [CodaJsClient.Value](docs/Value.md)
 - [CodaJsClient.ValueFormat](docs/ValueFormat.md)
 - [CodaJsClient.Workspace](docs/Workspace.md)
 - [CodaJsClient.WorkspaceMembersList](docs/WorkspaceMembersList.md)
 - [CodaJsClient.WorkspaceReference](docs/WorkspaceReference.md)
 - [CodaJsClient.WorkspaceRoleActivity](docs/WorkspaceRoleActivity.md)
 - [CodaJsClient.WorkspaceUser](docs/WorkspaceUser.md)
 - [CodaJsClient.WorkspaceUserRole](docs/WorkspaceUserRole.md)

## Documentation for Authorization


### Bearer


