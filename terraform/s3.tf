resource "aws_s3_bucket" "frontend" {
  bucket = "jrgermain-whichbeatle-frontend"
}

resource "aws_s3_bucket_acl" "frontend_acl" {
  bucket = aws_s3_bucket.frontend.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "CloudFrontAccess"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.frontend.arn}/*"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.oai.iam_arn
        }
      }
    ]
  })
}

