# CodaJsClient.PagesApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPage**](PagesApi.md#getPage) | **GET** /docs/{docId}/pages/{pageIdOrName} | Get a page
[**listPages**](PagesApi.md#listPages) | **GET** /docs/{docId}/pages | List pages
[**updatePage**](PagesApi.md#updatePage) | **PUT** /docs/{docId}/pages/{pageIdOrName} | Update a page

<a name="getPage"></a>
# **getPage**
> Page getPage(docId, pageIdOrName)

Get a page

Returns details about a page.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PagesApi();
let docId = "docId_example"; // String | ID of the doc.
let pageIdOrName = "pageIdOrName_example"; // String | ID or name of the page. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If you provide a name and there are multiple pages with the same name, an arbitrary one will be selected. 

apiInstance.getPage(docId, pageIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **pageIdOrName** | **String**| ID or name of the page. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If you provide a name and there are multiple pages with the same name, an arbitrary one will be selected.  | 

### Return type

[**Page**](Page.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listPages"></a>
# **listPages**
> PageList listPages(docId, opts)

List pages

Returns a list of pages in a Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PagesApi();
let docId = "docId_example"; // String | ID of the doc.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.listPages(docId, opts).then((data) => {
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

### Return type

[**PageList**](PageList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="updatePage"></a>
# **updatePage**
> PageUpdateResult updatePage(bodydocIdpageIdOrName)

Update a page

Update properties for a page.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PagesApi();
let body = new CodaJsClient.PageUpdate(); // PageUpdate | Parameters for updating a page.
let docId = "docId_example"; // String | ID of the doc.
let pageIdOrName = "pageIdOrName_example"; // String | ID or name of the page. Names are discouraged because they're easily prone to being changed by users. If you're using a name, be sure to URI-encode it. If you provide a name and there are multiple pages with the same name, an arbitrary one will be selected. 

apiInstance.updatePage(bodydocIdpageIdOrName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**PageUpdate**](PageUpdate.md)| Parameters for updating a page. | 
 **docId** | **String**| ID of the doc. | 
 **pageIdOrName** | **String**| ID or name of the page. Names are discouraged because they&#x27;re easily prone to being changed by users. If you&#x27;re using a name, be sure to URI-encode it. If you provide a name and there are multiple pages with the same name, an arbitrary one will be selected.  | 

### Return type

[**PageUpdateResult**](PageUpdateResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

