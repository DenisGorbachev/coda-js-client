# CodaJsClient.WorkspaceUser

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **String** | Email of the user. | 
**name** | **String** | Name of the user. | 
**role** | [**WorkspaceUserRole**](WorkspaceUserRole.md) |  | 
**pictureUrl** | **String** | Picture url of the user. | [optional] 
**registeredAt** | **Date** | Timestamp for when the user registered in this workspace | 
**roleChangedAt** | **Date** | Timestamp for when the user&#x27;s role last changed in this workspace. | 
**lastActiveAt** | **Date** | Timestamp for when the user last took an action in this workspace. | [optional] 
**docsLastActiveAt** | **Date** | Timestamp for when someone last loaded a doc that the user owns in this workspace. | [optional] 
**ownedDocIds** | **[String]** | List of IDs of docs owned by the user. | [optional] 
**docCollaboratorCount** | **Number** | Number of collaborators that have interacted with docs owned by the user. | [optional] 
