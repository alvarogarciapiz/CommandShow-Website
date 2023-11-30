resource "aws_s3_bucket" "command-show-website" {
  bucket = "command-show-website"

  tags = {
    Name        = "command-show-website"
    Environment = "production"
  }
}

resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.command-show-website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}