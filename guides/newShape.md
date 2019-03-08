`new Shape`
===========
#### Arguments
```
new Shape([API ID], [NAME], [FIELDS])
```
1. API ID (Must be a string): used to fetch documents from the API
2. Name (Optional): used as the name found on dashboard. Should be used if you want the name to be different from the API ID
3. Object representing shape [fields](./fields.md) using valid [Types](../src/types.ts)

### Example
```
new Shape('Author', 'Author', {}) === new Shape('Author', {})
```