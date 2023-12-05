terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket = "alvarogarciapiz-tfstates"
    key    = "command-show-website"
    region = "eu-south-2"
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  alias = "eu-south-2"
  region = "eu-south-2"
}
