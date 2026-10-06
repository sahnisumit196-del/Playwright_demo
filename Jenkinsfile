pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['QA', 'UAT', 'PROD'],
            description: 'Select environment'
        )
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        HOME_URL = credentials('HOME_URL')
        USERNAME1 = credentials('USERNAME1')
        PASSWORD = credentials('PASSWORD')
    }

    stages {

        stage('Set Environment URL') {
            steps {
                script {

                    if (params.ENVIRONMENT == 'QA') {
                        env.TEST_URL = 'https://qa.example.com'
                    }

                    if (params.ENVIRONMENT == 'UAT') {
                        env.TEST_URL = 'https://uat.example.com'
                    }

                    if (params.ENVIRONMENT == 'PROD') {
                        env.TEST_URL = 'https://prod.example.com'
                    }

                    echo "Running on URL: ${env.TEST_URL}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Selected Environment: ${params.ENVIRONMENT}"
                bat 'call npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'call npx playwright test'
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
