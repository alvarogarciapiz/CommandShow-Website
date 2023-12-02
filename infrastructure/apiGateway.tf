resource "aws_api_gateway_rest_api" "api" {
    name        = "my-api"
    description = "My API"
}

resource "aws_api_gateway_resource" "resource" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    parent_id   = aws_api_gateway_rest_api.api.root_resource_id
    path_part   = "episodes"
}

resource "aws_api_gateway_method" "method" {
    rest_api_id   = aws_api_gateway_rest_api.api.id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.resource.id
    http_method = aws_api_gateway_method.method.http_method
    type        = "MOCK"

    request_templates = {
    "application/json" = jsonencode(
        {
        statusCode = 200
        }
    )
    }
}

resource "aws_lambda_permission" "permission" {
    statement_id  = "AllowAPIGatewayInvoke"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.get_podcast_episodes.function_name
    principal     = "apigateway.amazonaws.com"

    source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}

resource "aws_api_gateway_method_response" "response_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.resource.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = "200"

    response_parameters = {
    "method.response.header.Access-Control-Allow-Headers"     = true,
    "method.response.header.Access-Control-Allow-Methods"     = true,
    "method.response.header.Access-Control-Allow-Origin"      = true,
    "method.response.header.Access-Control-Allow-Credentials" = true
    }
}

resource "aws_api_gateway_integration_response" "integration_response_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.resource.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = aws_api_gateway_method_response.response_200.status_code

    response_parameters = {
    "method.response.header.Access-Control-Allow-Headers"     = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods"     = "'GET,OPTIONS,POST,PUT'",
    "method.response.header.Access-Control-Allow-Origin"      = "'https://command-show-website.s3.eu-south-2.amazonaws.com'",
    "method.response.header.Access-Control-Allow-Credentials" = "'true'"
  }

    response_templates = { "application/json" = "{\"statusCode\": 200}" }
}

# resource "aws_api_gateway_method_response" "options_200" {
#     rest_api_id = aws_api_gateway_rest_api.api.id
#     resource_id = aws_api_gateway_resource.resource.id
#     http_method = aws_api_gateway_method.options.http_method
#     status_code = "200"
#     response_models = {
#     "application/json" = "Empty"
#     }
#     response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers"     = true,
#     "method.response.header.Access-Control-Allow-Methods"     = true,
#     "method.response.header.Access-Control-Allow-Origin"      = true,
#     "method.response.header.Access-Control-Allow-Credentials" = true
#   }
# }

# resource "aws_api_gateway_integration" "options" {
#     rest_api_id = aws_api_gateway_rest_api.api.id
#     resource_id = aws_api_gateway_resource.resource.id
#     http_method = aws_api_gateway_method.options.http_method
#     type                    = "MOCK"
#     request_templates       = { "application/json" = "{\"statusCode\": 200}" }
# }

# resource "aws_api_gateway_integration_response" "options_200" {
#     rest_api_id = aws_api_gateway_rest_api.api.id
#     resource_id = aws_api_gateway_resource.resource.id
#     http_method = aws_api_gateway_method.options.http_method
#     status_code = aws_api_gateway_method_response.options_200.status_code
#     response_parameters = {
#     "method.response.header.Access-Control-Allow-Headers"     = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
#     "method.response.header.Access-Control-Allow-Methods"     = "'GET,OPTIONS,POST,PUT'",
#     "method.response.header.Access-Control-Allow-Origin"      = "'https://command-show-website.s3.eu-south-2.amazonaws.com'",
#     "method.response.header.Access-Control-Allow-Credentials" = "'true'"
#     }

#     response_templates = {
#     "application/json" = <<EOF
# {
#     "statusCode": 200,
#     "message": "OK! Everything in order"
# }
# EOF
#     }
# }

resource "aws_api_gateway_deployment" "mock_api" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    stage_name  = "episodes"

    depends_on = [
    aws_api_gateway_method_response.response_200,
    aws_api_gateway_integration_response.integration_response_200
    ]
}

module "cors" {
  source  = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id            = aws_api_gateway_rest_api.api.id
  api_resource_id   = aws_api_gateway_resource.resource.id
  allow_credentials = true
}