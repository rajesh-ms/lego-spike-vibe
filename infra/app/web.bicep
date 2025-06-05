@description('The Azure region into which the resources should be deployed.')
param location string

@description('The name of the Static Web App.')
param name string

@description('The Application Insights connection string.')
param applicationInsightsConnectionString string

@description('A dictionary of tag names and values to apply to the resources.')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: name
  location: location
  tags: tags
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/rajesh-ms/lego-spike-vibe'
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
    buildProperties: {
      skipGithubActionWorkflowGeneration: false
      appLocation: '/'
      apiLocation: ''
      outputLocation: 'out'
      appBuildCommand: 'npm run build'
    }
  }
}

// Configure app settings for the static web app
resource staticWebAppSettings 'Microsoft.Web/staticSites/config@2024-04-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    APPLICATIONINSIGHTS_CONNECTION_STRING: applicationInsightsConnectionString
    NODE_ENV: 'production'
  }
}

output defaultHostName string = staticWebApp.properties.defaultHostname
output id string = staticWebApp.id
output name string = staticWebApp.name
output uri string = 'https://${staticWebApp.properties.defaultHostname}'
