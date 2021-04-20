# CodaJsClient.PermissionsApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addPermission**](PermissionsApi.md#addPermission) | **POST** /docs/{docId}/acl/permissions | Add permission
[**deletePermission**](PermissionsApi.md#deletePermission) | **DELETE** /docs/{docId}/acl/permissions/{permissionId} | Delete permission
[**getPermissions**](PermissionsApi.md#getPermissions) | **GET** /docs/{docId}/acl/permissions | List permissions
[**getSharingMetadata**](PermissionsApi.md#getSharingMetadata) | **GET** /docs/{docId}/acl/metadata | Get sharing metadata

<a name="addPermission"></a>
# **addPermission**
> AddPermissionResult addPermission(bodydocId)

Add permission

Adds a new permission to the doc. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PermissionsApi();
let body = new CodaJsClient.AddPermissionRequest(); // AddPermissionRequest | Parameters for adding the new permission.
let docId = "docId_example"; // String | ID of the doc.

apiInstance.addPermission(bodydocId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AddPermissionRequest**](AddPermissionRequest.md)| Parameters for adding the new permission. | 
 **docId** | **String**| ID of the doc. | 

### Return type

[**AddPermissionResult**](AddPermissionResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deletePermission"></a>
# **deletePermission**
> DeletePermissionResult deletePermission(docId, permissionId)

Delete permission

Deletes an existing permission. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PermissionsApi();
let docId = "docId_example"; // String | ID of the doc.
let permissionId = "permissionId_example"; // String | ID of a permission on a doc.

apiInstance.deletePermission(docId, permissionId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **docId** | **String**| ID of the doc. | 
 **permissionId** | **String**| ID of a permission on a doc. | 

### Return type

[**DeletePermissionResult**](DeletePermissionResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getPermissions"></a>
# **getPermissions**
> Acl getPermissions(docId, opts)

List permissions

Returns a list of permissions for this Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PermissionsApi();
let docId = "docId_example"; // String | ID of the doc.
let opts = { 
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.getPermissions(docId, opts).then((data) => {
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

[**Acl**](Acl.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getSharingMetadata"></a>
# **getSharingMetadata**
> AclMetadata getSharingMetadata(docId)

Get sharing metadata

Returns metadata associated with sharing for this Coda doc.

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PermissionsApi();
let docId = "docId_example"; // String | ID of the doc.

apiInstance.getSharingMetadata(docId).then((data) => {
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

[**AclMetadata**](AclMetadata.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

