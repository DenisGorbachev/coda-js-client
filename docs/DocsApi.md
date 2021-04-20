# CodaJsClient.DocsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDoc**](DocsApi.md#createDoc) | **POST** /docs | Create doc
[**deleteDoc**](DocsApi.md#deleteDoc) | **DELETE** /docs/{docId} | Delete doc
[**getDoc**](DocsApi.md#getDoc) | **GET** /docs/{docId} | Get info about a doc
[**listDocs**](DocsApi.md#listDocs) | **GET** /docs | List available docs

<a name="createDoc"></a>
# **createDoc**
> DocumentCreationResult createDoc(body)

Create doc

Creates a new Coda doc, optionally copying an existing doc. Note that creating a doc requires you to be a Doc Maker in the applicable workspace (or be auto-promoted to one). 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.DocsApi();
let body = new CodaJsClient.DocCreate(); // DocCreate | Parameters for creating the doc.

apiInstance.createDoc(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DocCreate**](DocCreate.md)| Parameters for creating the doc. | 

### Return type

[**DocumentCreationResult**](DocumentCreationResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteDoc"></a>
# **deleteDoc**
> DocDelete deleteDoc(docId)

Delete doc

Deletes a doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.DocsApi();
let docId = "docId_example"; // String | ID of the doc.

apiInstance.deleteDoc(docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 

### Return type

[**DocDelete**](DocDelete.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getDoc"></a>
# **getDoc**
> Doc getDoc(docId)

Get info about a doc

Returns metadata for the specified doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.DocsApi();
let docId = "docId_example"; // String | ID of the doc.

apiInstance.getDoc(docId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 

### Return type

[**Doc**](Doc.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listDocs"></a>
# **listDocs**
> DocList listDocs(opts)

List available docs

Returns a list of Coda docs accessible by the user. These are returned in the same order as on the docs page: reverse chronological by the latest event relevant to the user (last viewed, edited, or shared). 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.DocsApi();
let opts = { 
  'isOwner': true, // Boolean | Show only docs owned by the user.
  'isPublished': true, // Boolean | Show only published docs.
  'query': "query_example", // String | Search term used to filter down results.
  'sourceDoc': "sourceDoc_example", // String | Show only docs copied from the specified doc ID.
  'isStarred': true, // Boolean | If true, returns docs that are starred. If false, returns docs that are not starred.
  'inGallery': true, // Boolean | Show only docs visible within the gallery.
  'workspaceId': "workspaceId_example", // String | Show only docs belonging to the given workspace.
  'folderId': "folderId_example", // String | Show only docs belonging to the given folder.
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.listDocs(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isOwner** | **Boolean**| Show only docs owned by the user. | [optional] 
 **isPublished** | **Boolean**| Show only published docs. | [optional] 
 **query** | **String**| Search term used to filter down results. | [optional] 
 **sourceDoc** | **String**| Show only docs copied from the specified doc ID. | [optional] 
 **isStarred** | **Boolean**| If true, returns docs that are starred. If false, returns docs that are not starred. | [optional] 
 **inGallery** | **Boolean**| Show only docs visible within the gallery. | [optional] 
 **workspaceId** | **String**| Show only docs belonging to the given workspace. | [optional] 
 **folderId** | **String**| Show only docs belonging to the given folder. | [optional] 
 **limit** | **Number**| Maximum number of results to return in this query. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 

### Return type

[**DocList**](DocList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

