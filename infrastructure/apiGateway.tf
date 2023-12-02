resource "aws_api_gateway_rest_api" "api" {
    name        = "my-api"
    description = "My API"
}

resource "aws_api_gateway_resource" "resource" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    parent_id   = aws_api_gateway_rest_api.api.root_resource_id
    path_part   = "resource"
}

resource "aws_api_gateway_method" "method" {
    rest_api_id   = aws_api_gateway_rest_api.api.id
    resource_id   = aws_api_gateway_resource.resource.id
    http_method   = "GET"
    authorization = "NONE"
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

resource "aws_api_gateway_integration" "integration" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.resource.id
    http_method = aws_api_gateway_method.method.http_method

    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri                     = aws_lambda_function.get_podcast_episodes.invoke_arn 
}

resource "aws_api_gateway_integration_response" "integration_response" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.resource.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = aws_api_gateway_method_response.response_200.status_code

    response_parameters = {
        "method.response.header.Access-Control-Allow-Headers"     = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
        "method.response.header.Access-Control-Allow-Methods"     = "'GET,OPTIONS,POST,PUT'",
        "method.response.header.Access-Control-Allow-Origin"      = "'*'",
        "method.response.header.Access-Control-Allow-Credentials" = "'true'"
    }
}

resource "aws_lambda_permission" "permission" {
    statement_id  = "AllowAPIGatewayInvoke"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.get_podcast_episodes.function_name  
    principal     = "apigateway.amazonaws.com"

    source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}

resource "aws_api_gateway_deployment" "deployment" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    stage_name  = "test"

    depends_on = [
        aws_api_gateway_method_response.response_200,
        aws_api_gateway_integration_response.integration_response
    ]
}

module "cors" {
    source  = "squidfunk/api-gateway-enable-cors/aws"
    version = "0.3.3"

    api_id            = aws_api_gateway_rest_api.api.id
    api_resource_id   = aws_api_gateway_resource.resource.id
    allow_credentials = true
}