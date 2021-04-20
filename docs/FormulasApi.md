# CodaJsClient.FormulasApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFormula**](FormulasApi.md#getFormula) | **GET** /docs/{docId}/formulas/{formulaIdOrName} | Get a formula
[**listFormulas**](FormulasApi.md#listFormulas) | **GET** /docs/{docId}/formulas | List formulas

<a name="getFormula"></a>
# **getFormula**
> Formula getFormula(docId, formulaIdOrName)

Get a formula

Returns info on a formula.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.FormulasApi();
let docId = "docId_example"; // String | ID of the doc.
let formulaIdOrName = "formulaIdOrName_example"; // String | ID or name of the formula. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it.

apiInstance.getFormula(docId, formulaIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **formulaIdOrName** | **String**| ID or name of the formula. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. | 

### Return type

[**Formula**](Formula.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listFormulas"></a>
# **listFormulas**
> FormulaList listFormulas(docId, opts)

List formulas

Returns a list of named formulas in a Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.FormulasApi();
let docId = "docId_example"; // String | ID of the doc.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example", // String | An opaque token used to fetch the next page of results.
  'sortBy': new CodaJsClient.SortBy() // SortBy | Determines how to sort the given objects.
};
apiInstance.listFormulas(docId, opts).then((data) => {
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

[**FormulaList**](FormulaList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

