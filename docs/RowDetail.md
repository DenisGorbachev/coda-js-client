# CodaJsClient.RowDetail

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID of the row. | 
**type** | **String** | The type of this resource. | 
**href** | **String** | API link to the row. | 
**name** | **String** | The display name of the row, based on its identifying column. | 
**index** | **Number** | Index of the row within the table. | 
**browserLink** | **String** | Browser-friendly link to the row. | 
**createdAt** | **Date** | Timestamp for when the row was created. | 
**updatedAt** | **Date** | Timestamp for when the row was last modified. | 
**values** | [**{String: CellValue}**](CellValue.md) | Values for a specific row, represented as a hash of column IDs (or names with &#x60;useColumnNames&#x60;) to values.  | 
**parent** | [**TableReference**](TableReference.md) |  | 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `row` (value: `"row"`)

