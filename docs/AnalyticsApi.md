# CodaJsClient.AnalyticsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listDocAnalytics**](AnalyticsApi.md#listDocAnalytics) | **GET** /analytics/docs | List doc analytics

<a name="listDocAnalytics"></a>
# **listDocAnalytics**
> DocAnalyticsCollection listDocAnalytics(opts)

List doc analytics

Returns analytics data for available docs per day in reverse chronological order. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.AnalyticsApi();
let opts = { 
  'isPublished': true, // Boolean | Show analytics only for published docs.
  'sinceDate': new Date("2013-10-20"), // Date | Limit results to activity on or after this date.
  'untilDate': new Date("2013-10-20"), // Date | Limit results to activity on or before this date.
  'scale': new CodaJsClient.DocAnalyticsScale(), // DocAnalyticsScale | Quantization period over which to view analytics. Defaults to daily.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.listDocAnalytics(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isPublished** | **Boolean**| Show analytics only for published docs. | [optional] 
 **sinceDate** | **Date**| Limit results to activity on or after this date. | [optional] 
 **untilDate** | **Date**| Limit results to activity on or before this date. | [optional] 
 **scale** | [**DocAnalyticsScale**](.md)| Quantization period over which to view analytics. Defaults to daily. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 

### Return type

[**DocAnalyticsCollection**](DocAnalyticsCollection.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

