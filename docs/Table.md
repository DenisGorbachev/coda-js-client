# CodaJsClient.Table

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | ID of the table. | 
**type** | **String** | The type of this resource. | 
**tableType** | [**TableType**](TableType.md) |  | 
**href** | **String** | API link to the table. | 
**browserLink** | **String** | Browser-friendly link to the table. | 
**name** | **String** | Name of the table. | 
**parent** | [**PageReference**](PageReference.md) |  | 
**parentTable** | [**TableReference**](TableReference.md) |  | [optional] 
**displayColumn** | [**ColumnReference**](ColumnReference.md) |  | 
**rowCount** | **Number** | Total number of rows in the table. | 
**sorts** | [**[Sort]**](Sort.md) | Any sorts applied to the table. | 
**layout** | [**Layout**](Layout.md) |  | 
**filter** | [**AllOfTableFilter**](AllOfTableFilter.md) |  | [optional] 
**createdAt** | **Date** | Timestamp for when the table was created. | 
**updatedAt** | **Date** | Timestamp for when the table was last modified. | 

<a name="TypeEnum"></a>
## Enum: TypeEnum

* `table` (value: `"table"`)

