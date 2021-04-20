# CodaJsClient.PublishingApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listCategories**](PublishingApi.md#listCategories) | **GET** /categories | Get doc categories
[**publishDoc**](PublishingApi.md#publishDoc) | **PUT** /docs/{docId}/publish | Publish doc
[**unpublishDoc**](PublishingApi.md#unpublishDoc) | **DELETE** /docs/{docId}/publish | Unpublish doc

<a name="listCategories"></a>
# **listCategories**
> DocCategoryList listCategories()

Get doc categories

Gets all available doc categories.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PublishingApi();
apiInstance.listCategories().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters
This endpoint does not need any parameter.

### Return type

[**DocCategoryList**](DocCategoryList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="publishDoc"></a>
# **publishDoc**
> PublishResult publishDoc(bodydocId)

Publish doc

Update publish settings for a doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PublishingApi();
let body = new CodaJsClient.DocPublish(); // DocPublish | Parameters for changing publish settings.
let docId = "docId_example"; // String | ID of the doc.

apiInstance.publishDoc(bodydocId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**DocPublish**](DocPublish.md)| Parameters for changing publish settings. | 
 **docId** | **String**| ID of the doc. | 

### Return type

[**PublishResult**](PublishResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="unpublishDoc"></a>
# **unpublishDoc**
> UnpublishResult unpublishDoc(docId)

Unpublish doc

Unpublishes a doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PublishingApi();
let docId = "docId_example"; // String | ID of the doc.

apiInstance.unpublishDoc(docId).then((data) => {
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

[**UnpublishResult**](UnpublishResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

