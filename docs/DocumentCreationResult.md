# CodaJsClient.DocumentCreationResult

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID of the Coda doc. | 
**type** | **String** | The type of this resource. | 
**href** | **String** | API link to the Coda doc. | 
**browserLink** | **String** | Browser-friendly link to the Coda doc. | 
**icon** | [**Icon**](Icon.md) |  | [optional] 
**name** | **String** | Name of the doc. | 
**owner** | **String** | Email address of the doc owner. | 
**ownerName** | **String** | Name of the doc owner. | 
**docSize** | [**DocSize**](DocSize.md) |  | [optional] 
**sourceDoc** | [**AllOfDocumentCreationResultSourceDoc**](AllOfDocumentCreationResultSourceDoc.md) |  | [optional] 
**createdAt** | **Date** | Timestamp for when the doc was created. | 
**updatedAt** | **Date** | Timestamp for when the doc was last modified. | 
**published** | [**DocPublished**](DocPublished.md) |  | [optional] 
**workspaceId** | **String** | ID of the Coda workspace containing this doc. | 
**folderId** | **String** | ID of the Coda folder containing this doc. | 
**requestId** | **String** | An arbitrary unique identifier for this request. | [optional] 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `doc` (value: `"doc"`)

