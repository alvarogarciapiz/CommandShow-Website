resource "aws_lambda_function" "get_podcast_episodes" {
    filename      = "lambda.zip"
    function_name = "get_podcast_episodes"
    role          = aws_iam_role.lambda_exec.arn
    handler       = "lambda_function.lambda_handler"

    source_code_hash = filebase64sha256("lambda.zip")

    runtime = "python3.8"
}

# Rol y política de IAM para Lambda
resource "aws_iam_role" "lambda_exec" {
    name = "lambda_exec"

    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "sts:AssumeRole"
                Principal = {
                    Service = "lambda.amazonaws.com"
                }
                Effect = "Allow"
            },
        ]
    })
}

resource "aws_iam_role_policy" "lambda_exec" {
    name = "lambda_exec"
    role = aws_iam_role.lambda_exec.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = [
                    "s3:GetObject"
                ]
                Resource = [
                    aws_s3_bucket.react_app.arn
                ]
                Effect = "Allow"
            },
        ]
    })
}