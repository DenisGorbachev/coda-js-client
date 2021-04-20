# CodaJsClient.RowsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteRow**](RowsApi.md#deleteRow) | **DELETE** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Delete row
[**deleteRows**](RowsApi.md#deleteRows) | **DELETE** /docs/{docId}/tables/{tableIdOrName}/rows | Delete multiple rows
[**getRow**](RowsApi.md#getRow) | **GET** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Get a row
[**listRows**](RowsApi.md#listRows) | **GET** /docs/{docId}/tables/{tableIdOrName}/rows | List table rows
[**pushButton**](RowsApi.md#pushButton) | **POST** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName}/buttons/{columnIdOrName} | Push a button
[**updateRow**](RowsApi.md#updateRow) | **PUT** /docs/{docId}/tables/{tableIdOrName}/rows/{rowIdOrName} | Update row
[**upsertRows**](RowsApi.md#upsertRows) | **POST** /docs/{docId}/tables/{tableIdOrName}/rows | Insert/upsert rows

<a name="deleteRow"></a>
# **deleteRow**
> RowDeleteResult deleteRow(docId, tableIdOrName, rowIdOrName)

Delete row

Deletes the specified row from the table or view. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row deletions are generally processed within several seconds. When deleting using a name as opposed to an ID, an arbitrary row will be removed. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let rowIdOrName = "rowIdOrName_example"; // String | ID or name of the row. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected. 

apiInstance.deleteRow(docId, tableIdOrName, rowIdOrName).then((data) => {
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
 **rowIdOrName** | **String**| ID or name of the row. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected.  | 

### Return type

[**RowDeleteResult**](RowDeleteResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="deleteRows"></a>
# **deleteRows**
> RowsDeleteResult deleteRows(bodydocIdtableIdOrName)

Delete multiple rows

Deletes the specified rows from the table or view. This endpoint will always return a 202. Row deletions are generally processed within several seconds. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let body = new CodaJsClient.RowsDelete(); // RowsDelete | Rows to delete.
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.deleteRows(bodydocIdtableIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RowsDelete**](RowsDelete.md)| Rows to delete. | 
 **docId** | **String**| ID of the doc. | 
 **tableIdOrName** | **String**| ID or name of the table. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 

### Return type

[**RowsDeleteResult**](RowsDeleteResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getRow"></a>
# **getRow**
> RowDetail getRow(docId, tableIdOrName, rowIdOrName, opts)

Get a row

Returns details about a row in a table.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let rowIdOrName = "rowIdOrName_example"; // String | ID or name of the row. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected. 
let opts = { 
  'useColumnNames': true, // Boolean | Use column names instead of column IDs in the returned output. This is generally discouraged as it is fragile. If columns are renamed, code using original names may throw errors. 
  'valueFormat': new CodaJsClient.ValueFormat() // ValueFormat | The format that cell values are returned as.
};
apiInstance.getRow(docId, tableIdOrName, rowIdOrName, opts).then((data) => {
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
 **rowIdOrName** | **String**| ID or name of the row. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected.  | 
 **useColumnNames** | **Boolean**| Use column names instead of column IDs in the returned output. This is generally discouraged as it is fragile. If columns are renamed, code using original names may throw errors.  | [optional] 
 **valueFormat** | [**ValueFormat**](.md)| The format that cell values are returned as. | [optional] 

### Return type

[**RowDetail**](RowDetail.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listRows"></a>
# **listRows**
> RowList listRows(docId, tableIdOrName, opts)

List table rows

Returns a list of rows in a table. ### Value results The &#x60;valueFormat&#x60; parameter dictates in what format the API should return values for individual cells. * &#x60;simple&#x60; (default): Returns cell values as the following JSON values: &#x60;string&#x60;, &#x60;number&#x60;, or &#x60;boolean&#x60;. Array values (like multiselects) are returned as comma-delimited strings. * &#x60;simpleWithArrays&#x60;: Singleton values are returned as &#x60;simple&#x60;. Array values are returned as JSON arrays and the values within are &#x60;simple&#x60; values (including nested arrays). * &#x60;rich&#x60;: If applicable, returns many values with further encoding, allowing API users to have lossless access to data in Coda.   * For &#x60;text&#x60; values, returns data in Markdown syntax. If the text field is simple text (e.g. has no formatting),   the field will be fully escaped with triple-ticks. E.g   &#x60;   &#x60;&#x60;&#x60;This is plain text&#x60;&#x60;&#x60;   &#x60;   * For &#x60;currency&#x60;, &#x60;lookup&#x60;, &#x60;image&#x60;, &#x60;person&#x60; and &#x60;hyperlink&#x60; values, the value will be encoded in [JSON-LD](https://json-ld.org/) format.  &#x60;&#x60;&#x60;   // Currency   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;MonetaryAmount\&quot;,     \&quot;currency\&quot;: \&quot;USD\&quot;,     \&quot;amount\&quot;: 42.42   }    // Lookup   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;StructuredValue\&quot;,     \&quot;additionalType\&quot;: \&quot;row\&quot;,     \&quot;name\&quot;: \&quot;Row Name\&quot;,     \&quot;rowId\&quot;: \&quot;i-123456789\&quot;,     \&quot;tableId\&quot;: \&quot;grid-123456789\&quot;,     \&quot;tableUrl\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/d/_d123456789/grid-123456789#_r42\&quot;,   }    // Hyperlink   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;WebPage\&quot;,     \&quot;name\&quot;: \&quot;Coda\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io\&quot;   }    // Image   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;ImageObject\&quot;,     \&quot;name\&quot;: \&quot;Coda logo\&quot;,     \&quot;url\&quot;: \&quot;https://coda.io/logo.jpg\&quot;   }    // People   {     \&quot;@context\&quot;: \&quot;http://schema.org\&quot;,     \&quot;type\&quot;: \&quot;Person\&quot;,     \&quot;name\&quot;: \&quot;Art Vandalay\&quot;,     \&quot;email\&quot;: \&quot;art@vandalayindustries.com\&quot;   } &#x60;&#x60;&#x60; 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let opts = { 
  'query': "query_example", // String | Query used to filter returned rows, specified as `<column_id_or_name>:<value>`. If you'd like to use a column name instead of an ID, you must quote it (e.g., `\"My Column\":123`). Also note that `value` is a JSON value; if you'd like to use a string, you must surround it in quotes (e.g., `\"groceries\"`). 
  'sortBy': new CodaJsClient.RowsSortBy(), // RowsSortBy | Specifies the sort order of the rows returned. If left unspecified, rows are returned by creation time ascending. \"UpdatedAt\" sort ordering is the order of rows based upon when they were last updated. This does not include updates to calculated values. \"Natural\" sort ordering is the order that the rows appear in the table view in the application. This ordering is only meaningfully defined for rows that are visible (unfiltered). Because of this, using this sort order will imply visibleOnly=true, that is, to only return visible rows. If you pass sortBy=natural and visibleOnly=false explicitly, this will result in a Bad Request error as this condition cannot be satisfied. 
  'useColumnNames': true, // Boolean | Use column names instead of column IDs in the returned output. This is generally discouraged as it is fragile. If columns are renamed, code using original names may throw errors. 
  'valueFormat': new CodaJsClient.ValueFormat(), // ValueFormat | The format that cell values are returned as.
  'visibleOnly': true, // Boolean | If true, returns only visible rows and columns for the table.
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example", // String | An opaque token used to fetch the next page of results.
  'syncToken': "syncToken_example" // String | An opaque token returned from a previous call that can be used to return results that are relevant to the query since the call where the syncToken was generated. 
};
apiInstance.listRows(docId, tableIdOrName, opts).then((data) => {
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
 **query** | **String**| Query used to filter returned rows, specified as &#x60;&lt;column_id_or_name&gt;:&lt;value&gt;&#x60;. If you&#x27;d like to use a column name instead of an ID, you must quote it (e.g., &#x60;\&quot;My Column\&quot;:123&#x60;). Also note that &#x60;value&#x60; is a JSON value; if you&#x27;d like to use a string, you must surround it in quotes (e.g., &#x60;\&quot;groceries\&quot;&#x60;).  | [optional] 
 **sortBy** | [**RowsSortBy**](.md)| Specifies the sort order of the rows returned. If left unspecified, rows are returned by creation time ascending. \&quot;UpdatedAt\&quot; sort ordering is the order of rows based upon when they were last updated. This does not include updates to calculated values. \&quot;Natural\&quot; sort ordering is the order that the rows appear in the table view in the application. This ordering is only meaningfully defined for rows that are visible (unfiltered). Because of this, using this sort order will imply visibleOnly&#x3D;true, that is, to only return visible rows. If you pass sortBy&#x3D;natural and visibleOnly&#x3D;false explicitly, this will result in a Bad Request error as this condition cannot be satisfied.  | [optional] 
 **useColumnNames** | **Boolean**| Use column names instead of column IDs in the returned output. This is generally discouraged as it is fragile. If columns are renamed, code using original names may throw errors.  | [optional] 
 **valueFormat** | [**ValueFormat**](.md)| The format that cell values are returned as. | [optional] 
 **visibleOnly** | **Boolean**| If true, returns only visible rows and columns for the table. | [optional] 
 **limit** | **Number**| Maximum number of results to return in this query. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 
 **syncToken** | **String**| An opaque token returned from a previous call that can be used to return results that are relevant to the query since the call where the syncToken was generated.  | [optional] 

### Return type

[**RowList**](RowList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="pushButton"></a>
# **pushButton**
> PushButtonResult pushButton(docId, tableIdOrName, rowIdOrName, columnIdOrName)

Push a button

Pushes a button on a row in a table. Authorization note: This action is available to API tokens that are authorized to write to the table. However, the underlying button can perform any action on the document, including writing to other tables and performing Pack actions. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let rowIdOrName = "rowIdOrName_example"; // String | ID or name of the row. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected. 
let columnIdOrName = "columnIdOrName_example"; // String | ID or name of the column. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.pushButton(docId, tableIdOrName, rowIdOrName, columnIdOrName).then((data) => {
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
 **rowIdOrName** | **String**| ID or name of the row. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected.  | 
 **columnIdOrName** | **String**| ID or name of the column. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 

### Return type

[**PushButtonResult**](PushButtonResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updateRow"></a>
# **updateRow**
> RowUpdateResult updateRow(bodydocIdtableIdOrNamerowIdOrName, opts)

Update row

Updates the specified row in the table. This endpoint will always return a 202, so long as the row exists and is accessible (and the update is structurally valid). Row updates are generally processed within several seconds. When updating using a name as opposed to an ID, an arbitrary row will be affected. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let body = new CodaJsClient.RowUpdate(); // RowUpdate | Row update.
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let rowIdOrName = "rowIdOrName_example"; // String | ID or name of the row. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected. 
let opts = { 
  'disableParsing': true // Boolean | If true, the API will not attempt to parse the data in any way.
};
apiInstance.updateRow(bodydocIdtableIdOrNamerowIdOrName, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RowUpdate**](RowUpdate.md)| Row update. | 
 **docId** | **String**| ID of the doc. | 
 **tableIdOrName** | **String**| ID or name of the table. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 
 **rowIdOrName** | **String**| ID or name of the row. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If there are multiple rows with the same value in the identifying column, an arbitrary one will be selected.  | 
 **disableParsing** | **Boolean**| If true, the API will not attempt to parse the data in any way. | [optional] 

### Return type

[**RowUpdateResult**](RowUpdateResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="upsertRows"></a>
# **upsertRows**
> RowsUpsertResult upsertRows(bodydocIdtableIdOrName, opts)

Insert/upsert rows

Inserts rows into a table, optionally updating existing rows if any upsert key columns are provided. This endpoint will always return a 202, so long as the doc and table exist and are accessible (and the update is structurally valid). Row inserts/upserts are generally processed within several seconds. Note: this endpoint only works for base tables, not views. When upserting, if multiple rows match the specified key column(s), they will all be updated with the specified value. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.RowsApi();
let body = new CodaJsClient.RowsUpsert(); // RowsUpsert | Rows to insert or upsert.
let docId = "docId_example"; // String | ID of the doc.
let tableIdOrName = "tableIdOrName_example"; // String | ID or name of the table. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.
let opts = { 
  'disableParsing': true // Boolean | If true, the API will not attempt to parse the data in any way.
};
apiInstance.upsertRows(bodydocIdtableIdOrName, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RowsUpsert**](RowsUpsert.md)| Rows to insert or upsert. | 
 **docId** | **String**| ID of the doc. | 
 **tableIdOrName** | **String**| ID or name of the table. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 
 **disableParsing** | **Boolean**| If true, the API will not attempt to parse the data in any way. | [optional] 

### Return type

[**RowsUpsertResult**](RowsUpsertResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

