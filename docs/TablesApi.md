# CodaJsClient.TablesApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getTable**](TablesApi.md#getTable) | **GET** /docs/{docId}/tables/{tableIdOrName} | Get a table
[**listTables**](TablesApi.md#listTables) | **GET** /docs/{docId}/tables | List tables

<a name="getTable"></a>
# **getTable**
> Table getTable(docId, tableIdOrName)

Get a table

Returns details about a specific table or view.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.TablesApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.getTable(docId, tableIdOrName).then((data) => {
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

### Return type

[**Table**](Table.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listTables"></a>
# **listTables**
> TableList listTables(docId, opts)

List tables

Returns a list of tables in a Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.TablesApi();
let docId = "docId_example"; // String | ID of the doc.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example", // String | An opaque token used to fetch the next page of results.
  'sortBy': new CodaJsClient.SortBy(), // SortBy | Determines how to sort the given objects.
  'tableTypes': [new CodaJsClient.TableType()] // [TableType] | Comma-separated list of table types to include in results. If omitted, includes both tables and views.
};
apiInstance.listTables(docId, opts).then((data) => {
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
 **tableTypes** | [**[TableType]**](TableType.md)| Comma-separated list of table types to include in results. If omitted, includes both tables and views. | [optional] 

### Return type

[**TableList**](TableList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

