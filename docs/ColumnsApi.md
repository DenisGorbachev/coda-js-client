# CodaJsClient.ColumnsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getColumn**](ColumnsApi.md#getColumn) | **GET** /docs/{docId}/tables/{tableIdOrName}/columns/{columnIdOrName} | Get a column
[**listColumns**](ColumnsApi.md#listColumns) | **GET** /docs/{docId}/tables/{tableIdOrName}/columns | List columns

<a name="getColumn"></a>
# **getColumn**
> ColumnDetail getColumn(docId, tableIdOrName, columnIdOrName)

Get a column

Returns details about a column in a table.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.ColumnsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let columnIdOrName = "columnIdOrName_example"; // String | ID or name of the column. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.getColumn(docId, tableIdOrName, columnIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **tableIdOrName** | **String**| ID or name of the table. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 
 **columnIdOrName** | **String**| ID or name of the column. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 

### Return type

[**ColumnDetail**](ColumnDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listColumns"></a>
# **listColumns**
> ColumnList listColumns(docId, tableIdOrName, opts)

List columns

Returns a list of columns in a table.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.ColumnsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example", // String | An opaque token used to fetch the next page of results.
  'visibleOnly': true // Boolean | If true, returns only visible columns for the table.
};
apiInstance.listColumns(docId, tableIdOrName, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **tableIdOrName** | **String**| ID or name of the table. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 
 **limit** | **Number**| Maximum number of results to return in this query. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 
 **visibleOnly** | **Boolean**| If true, returns only visible columns for the table. | [optional] 

### Return type

[**ColumnList**](ColumnList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

