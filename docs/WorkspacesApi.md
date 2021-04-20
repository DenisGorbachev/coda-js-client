# CodaJsClient.WorkspacesApi

All URIs are relative to *https://coda.io/apis/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changeUserRole**](WorkspacesApi.md#changeUserRole) | **POST** /workspaces/{workspaceId}/users/role | Updates user role
[**listWorkspaceMembers**](WorkspacesApi.md#listWorkspaceMembers) | **GET** /workspaces/{workspaceId}/users | List workspace users
[**listWorkspaceRoleActivity**](WorkspacesApi.md#listWorkspaceRoleActivity) | **GET** /workspaces/{workspaceId}/roles | List workspace roles

<a name="changeUserRole"></a>
# **changeUserRole**
> ChangeRoleResult changeUserRole(bodyworkspaceId)

Updates user role

Updates the workspace user role of a user that matches the parameters. Only succeeds if the requesting user has admin permissions in the workspace. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.WorkspacesApi();
let body = new CodaJsClient.ChangeRole(); // ChangeRole | Parameters for changing the user role.
let workspaceId = "workspaceId_example"; // String | ID of the workspace.

apiInstance.changeUserRole(bodyworkspaceId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ChangeRole**](ChangeRole.md)| Parameters for changing the user role. | 
 **workspaceId** | **String**| ID of the workspace. | 

### Return type

[**ChangeRoleResult**](ChangeRoleResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listWorkspaceMembers"></a>
# **listWorkspaceMembers**
> WorkspaceMembersList listWorkspaceMembers(workspaceId, opts)

List workspace users

Returns a list of members in the given workspace. This list will be ordered with the requesting user first and then ordered by role. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.WorkspacesApi();
let workspaceId = "workspaceId_example"; // String | ID of the workspace.
let opts = { 
  'includedRoles': [new CodaJsClient.WorkspaceUserRole()], // [WorkspaceUserRole] | Show only the members that match the included roles. Multiple roles can be specified with a comma-delimited list.
  'pageToken': "pageToken_example" // String | An opaque token used to fetch the next page of results.
};
apiInstance.listWorkspaceMembers(workspaceId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **workspaceId** | **String**| ID of the workspace. | 
 **includedRoles** | [**[WorkspaceUserRole]**](WorkspaceUserRole.md)| Show only the members that match the included roles. Multiple roles can be specified with a comma-delimited list. | [optional] 
 **pageToken** | **String**| An opaque token used to fetch the next page of results. | [optional] 

### Return type

[**WorkspaceMembersList**](WorkspaceMembersList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="listWorkspaceRoleActivity"></a>
# **listWorkspaceRoleActivity**
> GetWorkspaceRoleActivity listWorkspaceRoleActivity(workspaceId)

List workspace roles

Returns a list of the counts of users over time by role for the workspace. 

### Example
```javascript
import CodaJsClient from 'coda-js-client';
let defaultClient = CodaJsClient.ApiClient.instance;


let apiInstance = new CodaJsClient.WorkspacesApi();
let workspaceId = "workspaceId_example"; // String | ID of the workspace.

apiInstance.listWorkspaceRoleActivity(workspaceId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **workspaceId** | **String**| ID of the workspace. | 

### Return type

[**GetWorkspaceRoleActivity**](GetWorkspaceRoleActivity.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

