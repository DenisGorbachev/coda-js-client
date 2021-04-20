# CodaJsClient.ControlsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getControl**](ControlsApi.md#getControl) | **GET** /docs/{docId}/controls/{controlIdOrName} | Get a control
[**listControls**](ControlsApi.md#listControls) | **GET** /docs/{docId}/controls | List controls

<a name="getControl"></a>
# **getControl**
> Control getControl(docId, controlIdOrName)

Get a control

Returns info on a control.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.ControlsApi();
let docId = "docId_example"; // String | ID of the doc.
let controlIdOrName = "controlIdOrName_example"; // String | ID or name of the control. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.getControl(docId, controlIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **controlIdOrName** | **String**| ID or name of the control. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 

### Return type

[**Control**](Control.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listControls"></a>
# **listControls**
> ControlList listControls(docId, opts)

List controls

Returns a list of controls in a Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.ControlsApi();
let docId = "docId_example"; // String | ID of the doc.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example", // String | An opaque token used to fetch the next page of results.
  'sortBy': new CodaJsClient.SortBy() // SortBy | Determines how to sort the given objects.
};
apiInstance.listControls(docId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **limit** | **Number**| Maximum number of results to return in this query. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 
 **sortBy** | [**SortBy**](.md)| Determines how to sort the given objects. | [optional] 

### Return type

[**ControlList**](ControlList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

