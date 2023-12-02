resource "aws_api_gateway_rest_api" "api" {
    name        = "my-api"
    description = "My API"
}

resource "aws_api_gateway_resource" "episodes_resource" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    parent_id   = aws_api_gateway_rest_api.api.root_resource_id
    path_part   = "episodes"
}

resource "aws_api_gateway_method" "method" {
    rest_api_id   = aws_api_gateway_rest_api.api.id
    resource_id   = aws_api_gateway_resource.episodes_resource.id
    http_method   = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.method.http_method

    integration_http_method = "POST"
    type                    = "AWS_PROXY"
    uri = aws_lambda_function.get_podcast_episodes.arn
}

resource "aws_lambda_permission" "permission" {
    statement_id  = "AllowAPIGatewayInvoke"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.get_podcast_episodes.function_name
    principal     = "apigateway.amazonaws.com"

    source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.episodes_resource.path}"
}

resource "aws_api_gateway_method_response" "response_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = "200"

    response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    }

    response_models = {
    "application/json" = "Empty"
    }
}

resource "aws_api_gateway_integration_response" "integration_response_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.method.http_method
    status_code = aws_api_gateway_method_response.response_200.status_code

    response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'https://command-show-website.s3.eu-south-2.amazonaws.com'"
    }

    response_templates = {
    "application/json" = ""
    }
}

resource "aws_api_gateway_method" "options" {
    rest_api_id   = aws_api_gateway_rest_api.api.id
    resource_id   = aws_api_gateway_resource.episodes_resource.id
    http_method   = "OPTIONS"
    authorization = "NONE"
}

resource "aws_api_gateway_method_response" "options_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.options.http_method
    status_code = "200"

    response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    }
}

resource "aws_api_gateway_integration" "options" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.options.http_method

    type                    = "MOCK"
    request_templates       = { "application/json" = "{\"statusCode\": 200}" }
}

resource "aws_api_gateway_integration_response" "options_200" {
    rest_api_id = aws_api_gateway_rest_api.api.id
    resource_id = aws_api_gateway_resource.episodes_resource.id
    http_method = aws_api_gateway_method.options.http_method
    status_code = aws_api_gateway_method_response.options_200.status_code

    response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'https://command-show-website.s3.eu-south-2.amazonaws.com'"
    }

    response_templates = {
    "application/json" = ""
    }
}