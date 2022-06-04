terraform {
  required_version = "~> 1.1"

  cloud {
    organization = "jrgermain"
    workspaces {
      name = "whichbeatle-web"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
