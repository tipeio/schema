exports.templateFormatter = template => {
  let formattedTemplate = {}

  const formattedFields = Object.keys(template.fields).map(apiId => {
    return {
      id: apiId,
      ...template.fields[apiId]
    }
  })

  formattedTemplate = {
    ...template,
    fields: formattedFields
  }

  if (template.refs) {
    const formattedRefs = Object.keys(template.refs).map(apiId => {
      return {
        id: apiId,
        ...template.refs[apiId]
      }
    })

    formattedTemplate = { ...formattedTemplate, refs: formattedRefs }
  }

  return formattedTemplate
}
