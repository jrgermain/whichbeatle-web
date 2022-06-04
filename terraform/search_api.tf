resource "aws_apigatewayv2_api" "api" {
  name          = "whichbeatle-search-api"
  protocol_type = "HTTP"
}


resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "search" {
  api_id               = aws_apigatewayv2_api.api.id
  integration_type     = "HTTP_PROXY"
  integration_method   = "GET"
  integration_uri      = "https://www.googleapis.com/youtube/v3/search"
  timeout_milliseconds = 10000
  request_parameters = {
    "overwrite:querystring.key"        = var.youtube_api_key
    "overwrite:querystring.maxResults" = "1"
    "overwrite:querystring.part"       = "snippet"
    "overwrite:querystring.q"          = "the beatles - $request.querystring.song"
    "remove:querystring.song"          = null
  }
}

resource "aws_apigatewayv2_route" "search" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /api/search"
  target    = "integrations/${aws_apigatewayv2_integration.search.id}"
}
