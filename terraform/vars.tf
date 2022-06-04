variable "aws_region" {
  description = "The AWS region to use for resources."
  type        = string
  default     = "us-east-1"
}

variable "domain" {
  description = "The domain name for the site."
  type        = string
  default     = "whichbeatle.jrgermain.dev"
}

variable "youtube_api_key" {
  description = "Key for the YouTube search API."
  type        = string
  sensitive   = true
}
