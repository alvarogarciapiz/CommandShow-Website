terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "command-show-website"
    key    = "tfstate/"
    region = "eu-south-2"
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-south-2"
}
