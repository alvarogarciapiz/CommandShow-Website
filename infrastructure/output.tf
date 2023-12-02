output "api_url" {
    value = aws_api_gateway_deployment.mock_api.invoke_url
}