terraform {
    required_providers {
      azurerm = {
        source = "hashicorp/azurerm"
        }
    }
}
provider "azurerm" {
  features {}
}
resource "azurerm_resource_group" "dvopsResourceGroup" {
  name = "dvopsResourceGroup"
  location = "East US"
}
resource "azurerm_kubernetes_cluster" "dvopsAKSCluster" {
  name = "dvopsAKSCluster"
  location = azurerm_resource_group.dvopsResourceGroup.location
  resource_group_name = azurerm_resource_group.dvopsResourceGroup.name
  dns_prefix = "rms-aks"

  default_node_pool {
    name = "default"
    node_count = 1
    vm_size = "Standard_DS2_v2"
}
  service_principal {
    client_id = "9bb5d2b4-ace7-4d47-a046-3df96fd6b34b"
    client_secret = "j5b8Q~YQnD9jI_Mj99DzZ~0iB6Pog1VkSBKp2csY"
}
}