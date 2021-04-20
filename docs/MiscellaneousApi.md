# CodaJsClient.MiscellaneousApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getMutationStatus**](MiscellaneousApi.md#getMutationStatus) | **GET** /mutationStatus/{requestId} | Get mutation status
[**resolveBrowserLink**](MiscellaneousApi.md#resolveBrowserLink) | **GET** /resolveBrowserLink | Resolve browser link

<a name="getMutationStatus"></a>
# **getMutationStatus**
> MutationStatus getMutationStatus(requestId)

Get mutation status

Get the status for an asynchronous mutation to know whether or not it has been completed. Each API endpoint that mutates a document will return a request id that you can pass to this endpoint to check the completion status. Status information is not guaranteed to be available for more than one day after the mutation was completed. It is intended to be used shortly after the request was made. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.MiscellaneousApi();
let requestId = "requestId_example"; // String | ID of the request.

apiInstance.getMutationStatus(requestId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **requestId** | **String**| ID of the request. | 

### Return type

[**MutationStatus**](MutationStatus.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="resolveBrowserLink"></a>
# **resolveBrowserLink**
> ApiLink resolveBrowserLink(url, opts)

Resolve browser link

Given a browser link to a Coda object, attempts to find it and return metadata that can be used to get more info on it. Returns a 400 if the URL does not appear to be a Coda URL or a 404 if the resource cannot be located with the current credentials. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.MiscellaneousApi();
let url = "url_example"; // String | The browser link to try to resolve.
let opts = { 
  'degradeGracefully': true // Boolean | By default, attempting to resolve the Coda URL of a deleted object will result in an error. If this flag is set, the next-available object, all the way up to the doc itself, will be resolved. 
};
apiInstance.resolveBrowserLink(url, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **url** | **String**| The browser link to try to resolve. | 
 **degradeGracefully** | **Boolean**| By default, attempting to resolve the Coda URL of a deleted object will result in an error. If this flag is set, the next-available object, all the way up to the doc itself, will be resolved.  | [optional] 

### Return type

[**ApiLink**](ApiLink.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

