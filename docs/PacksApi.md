# CodaJsClient.PacksApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addPackPermission**](PacksApi.md#addPackPermission) | **POST** /packs/{packId}/permissions | Add a permission for Pack
[**createPack**](PacksApi.md#createPack) | **POST** /packs | Create Pack
[**deletePackPermission**](PacksApi.md#deletePackPermission) | **DELETE** /packs/{packId}/permissions/{permissionId} | Delete a permission for Pack
[**getPack**](PacksApi.md#getPack) | **GET** /packs/{packId} | Get a single Pack
[**getPackPermissions**](PacksApi.md#getPackPermissions) | **GET** /packs/{packId}/permissions | List permissions for a Pack
[**listPacks**](PacksApi.md#listPacks) | **GET** /packs | List Packs
[**packAssetUploadComplete**](PacksApi.md#packAssetUploadComplete) | **POST** /packs/{packId}/assets/{packAssetId}/assetType/{packAssetType}/uploadComplete | Pack asset upload complete
[**packVersionUploadComplete**](PacksApi.md#packVersionUploadComplete) | **POST** /packs/{packId}/versions/{packVersion}/uploadComplete | Pack version upload complete
[**registerPackVersion**](PacksApi.md#registerPackVersion) | **POST** /packs/{packId}/versions/{packVersion}/register | Register Pack version
[**setPackLiveVersion**](PacksApi.md#setPackLiveVersion) | **PUT** /packs/{packId}/liveVersion | Set live version for Pack
[**updatePack**](PacksApi.md#updatePack) | **PATCH** /packs/{packId} | Update Pack
[**uploadPackAsset**](PacksApi.md#uploadPackAsset) | **POST** /packs/{packId}/uploadAsset | Upload a Pack asset.

<a name="addPackPermission"></a>
# **addPackPermission**
> AddPackPermissionResponse addPackPermission(bodypackId)

Add a permission for Pack

Create or modify user, workspace, or global permissions for a given Pack. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let body = new CodaJsClient.AddPackPermissionRequest(); // AddPackPermissionRequest | Parameters for creating/updating Pack permissions.
let packId = 56; // Number | ID of a Pack

apiInstance.addPackPermission(bodypackId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AddPackPermissionRequest**](AddPackPermissionRequest.md)| Parameters for creating/updating Pack permissions. | 
 **packId** | **Number**| ID of a Pack | 

### Return type

[**AddPackPermissionResponse**](AddPackPermissionResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createPack"></a>
# **createPack**
> CreatePackResponse createPack(body)

Create Pack

Creates a new Pack, essentially registering a new Pack id. The contents of the Pack will be uploaded separately. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let body = new CodaJsClient.CreatePackRequest(); // CreatePackRequest | Parameters for creating the Pack.

apiInstance.createPack(body).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**CreatePackRequest**](CreatePackRequest.md)| Parameters for creating the Pack. | 

### Return type

[**CreatePackResponse**](CreatePackResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deletePackPermission"></a>
# **deletePackPermission**
> DeletePackPermissionResponse deletePackPermission(packId, permissionId)

Delete a permission for Pack

Delete user, workspace, or global permissions for a given Pack. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack
let permissionId = "permissionId_example"; // String | ID of a permission on a doc.

apiInstance.deletePackPermission(packId, permissionId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 
 **permissionId** | **String**| ID of a permission on a doc. | 

### Return type

[**DeletePackPermissionResponse**](DeletePackPermissionResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getPack"></a>
# **getPack**
> Pack getPack(packId)

Get a single Pack

Returns a single Pack. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack

apiInstance.getPack(packId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 

### Return type

[**Pack**](Pack.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="getPackPermissions"></a>
# **getPackPermissions**
> PackPermissionList getPackPermissions(packId)

List permissions for a Pack

Get user, workspace, and/or global permissions for a given Pack. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack

apiInstance.getPackPermissions(packId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 

### Return type

[**PackPermissionList**](PackPermissionList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listPacks"></a>
# **listPacks**
> PackSummaryList listPacks(opts)

List Packs

Get the list of accessible Packs. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let opts = { 
  'accessType': new CodaJsClient.PackAccessType(), // PackAccessType | Filter to only return the Packs for which the current user has this access type
  'sortBy': new CodaJsClient.PacksSortBy(), // PacksSortBy | The sort order of the Packs returned.
  'limit': 56, // Number | Maximum number of results to return in this query.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.listPacks(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accessType** | [**PackAccessType**](.md)| Filter to only return the Packs for which the current user has this access type | [optional] 
 **sortBy** | [**PacksSortBy**](.md)| The sort order of the Packs returned. | [optional] 
 **limit** | **Number**| Maximum number of results to return in this query. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 

### Return type

[**PackSummaryList**](PackSummaryList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="packAssetUploadComplete"></a>
# **packAssetUploadComplete**
> PackAssetUploadCompleteResponse packAssetUploadComplete(packId, packAssetId, packAssetType)

Pack asset upload complete

Note the completion of the upload of a Pack asset. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack
let packAssetId = "packAssetId_example"; // String | Unique identifier for a Pack asset
let packAssetType = new CodaJsClient.PackAssetType(); // PackAssetType | Pack asset type.

apiInstance.packAssetUploadComplete(packId, packAssetId, packAssetType).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 
 **packAssetId** | **String**| Unique identifier for a Pack asset | 
 **packAssetType** | [**PackAssetType**](.md)| Pack asset type. | 

### Return type

[**PackAssetUploadCompleteResponse**](PackAssetUploadCompleteResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="packVersionUploadComplete"></a>
# **packVersionUploadComplete**
> CreatePackVersionResponse packVersionUploadComplete(packId, packVersion)

Pack version upload complete

Note the completion of the upload of a Pack version bundle in order to create that Pack version. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack
let packVersion = "packVersion_example"; // String | Semantic version of a Pack

apiInstance.packVersionUploadComplete(packId, packVersion).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 
 **packVersion** | **String**| Semantic version of a Pack | 

### Return type

[**CreatePackVersionResponse**](CreatePackVersionResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="registerPackVersion"></a>
# **registerPackVersion**
> PackVersionUploadInfo registerPackVersion(packId, packVersion)

Register Pack version

Registers a new Pack version. This simply returns a signed url to use for uploading the Pack version definition. Following the completion of the upload, POST to /apis/v1/packs/{packId}/versions/{packVersion} trigger the rest of the creation process. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let packId = 56; // Number | ID of a Pack
let packVersion = "packVersion_example"; // String | Semantic version of a Pack

apiInstance.registerPackVersion(packId, packVersion).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **packId** | **Number**| ID of a Pack | 
 **packVersion** | **String**| Semantic version of a Pack | 

### Return type

[**PackVersionUploadInfo**](PackVersionUploadInfo.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="setPackLiveVersion"></a>
# **setPackLiveVersion**
> SetPackLiveVersionResponse setPackLiveVersion(bodypackId)

Set live version for Pack

Set the Pack version that is installable for users. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let body = new CodaJsClient.SetPackLiveVersionRequest(); // SetPackLiveVersionRequest | The Pack version to set live.
let packId = 56; // Number | ID of a Pack

apiInstance.setPackLiveVersion(bodypackId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**SetPackLiveVersionRequest**](SetPackLiveVersionRequest.md)| The Pack version to set live. | 
 **packId** | **Number**| ID of a Pack | 

### Return type

[**SetPackLiveVersionResponse**](SetPackLiveVersionResponse.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updatePack"></a>
# **updatePack**
> Pack updatePack(bodypackId)

Update Pack

Update an existing Pack for non-versioned fields. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let body = new CodaJsClient.UpdatePackRequest(); // UpdatePackRequest | Parameters for updating the Pack.
let packId = 56; // Number | ID of a Pack

apiInstance.updatePack(bodypackId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UpdatePackRequest**](UpdatePackRequest.md)| Parameters for updating the Pack. | 
 **packId** | **Number**| ID of a Pack | 

### Return type

[**Pack**](Pack.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="uploadPackAsset"></a>
# **uploadPackAsset**
> PackAssetUploadInfo uploadPackAsset(bodypackId)

Upload a Pack asset.

Request a signed s3 URL to upload your Pack asset. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.PacksApi();
let body = new CodaJsClient.UploadPackAssetRequest(); // UploadPackAssetRequest | Parameters to specify the asset being uploaded.
let packId = 56; // Number | ID of a Pack

apiInstance.uploadPackAsset(bodypackId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UploadPackAssetRequest**](UploadPackAssetRequest.md)| Parameters to specify the asset being uploaded. | 
 **packId** | **Number**| ID of a Pack | 

### Return type

[**PackAssetUploadInfo**](PackAssetUploadInfo.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

