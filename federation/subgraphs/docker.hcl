variable "DOCKER_REGISTRY" {
  default = ""
}

variable "COMMIT_SHA" {
  default = ""
}

function "image_tag" {
  params = [name, tag]
  result = notequal("", tag) ? "${DOCKER_REGISTRY}${name}:${tag}" : name
}

target "accounts" {
  context = "./accounts/"
  dockerfile = "../Dockerfile.rust"
  tags = [
    image_tag("subgraph-accounts", COMMIT_SHA),
  ]
}

target "reviews" {
  context = "./reviews/"
  dockerfile = "../Dockerfile.rust"
  tags = [
    image_tag("subgraph-reviews", COMMIT_SHA),
  ]
}

target "products" {
  context = "./products/"
  dockerfile = "../Dockerfile.rust"
  tags = [
    image_tag("subgraph-products", COMMIT_SHA),
  ]
}

target "inventory" {
  context = "./inventory/"
  dockerfile = "../Dockerfile.rust"
  tags = [
    image_tag("subgraph-inventory", COMMIT_SHA),
  ]
}

group "subgraphs" {
  targets = [
    "accounts",
    "reviews",
    "products",
    "inventory"
  ]
}
