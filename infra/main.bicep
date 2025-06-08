targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Id of the user or app to assign application roles')
param principalId string = ''

// Tags that should be applied to all resources.
// 
// Note that 'azd-service-name' tags should be applied separately to service host resources.
// Example usage:
//   tags: union(tags, { 'azd-service-name': 'web' })
var tags = {
  'azd-env-name': environmentName
}

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().id, environmentName))

// Monitor application with Azure Monitor
module monitoring './shared/monitoring.bicep' = {
  name: 'monitoring'
  params: {
    location: location
    tags: tags
    logAnalyticsName: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
    applicationInsightsName: '${abbrs.insightsComponents}${resourceToken}'
  }
}

// Store secrets in a keyvault
module keyVault './shared/keyvault.bicep' = {
  name: 'keyvault'
  params: {
    location: location
    tags: tags
    name: '${abbrs.keyVaultVaults}${resourceToken}'
    principalId: principalId
  }
}

// Web frontend - Container App
module web './app/containerapp.bicep' = {
  name: 'web'
  params: {
    location: location
    tags: union(tags, { 'azd-service-name': 'web' })
    name: '${abbrs.appContainerApps}${resourceToken}'
    containerAppsEnvironmentName: '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: 'cr${resourceToken}'
    applicationInsightsConnectionString: monitoring.outputs.applicationInsightsConnectionString
    imageName: 'nginx:latest'  // This will be replaced by azd during deployment
  }
}

// App outputs
output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
output AZURE_KEY_VAULT_ENDPOINT string = keyVault.outputs.endpoint
output AZURE_KEY_VAULT_NAME string = keyVault.outputs.name
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
output RESOURCE_GROUP_ID string = resourceGroup().id
output WEB_URI string = web.outputs.uri
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = web.outputs.containerRegistryLoginServer
output AZURE_CONTAINER_REGISTRY_NAME string = web.outputs.containerRegistryName
