resource "aws_s3_bucket" "command-show-website" {
  bucket = "command-show-website"

  tags = {
    Name        = "command-show-website"
    Environment = "production"
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.command-show-website.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
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

# resource "aws_s3_bucket_policy" "public_read" {
#   bucket = aws_s3_bucket.command-show-website.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Sid       = "PublicReadGetObject"
#         Effect    = "Allow"
#         Principal = "*"
#         Action    = ["s3:GetObject"]
#         Resource  = ["arn:aws:s3:::${aws_s3_bucket.command-show-website.id}/*"]
#       },
#     ]
#   })
# }