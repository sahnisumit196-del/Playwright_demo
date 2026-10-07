pipeline {
    agent any

    parameters {
        choice(
            name: 'SUITE',
            choices: ['SMOKE', 'REGRESSION', 'ALL'],
            description: 'Select Test Suite'
        )
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        HOME_URL = credentials('HOME_URL')
        USERNAME1 = credentials('USERNAME1')
        PASSWORD = credentials('PASSWORD')
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
            }
        }

        stage('Smoke Tests') {
            when {
                anyOf {
                    expression { params.SUITE == 'SMOKE' }
                    expression { params.SUITE == 'ALL' }
                }
            }
            steps {
                bat 'call npx playwright test tests/smoke'
            }
        }

        stage('Regression Tests') {
            when {
                anyOf {
                    expression { params.SUITE == 'REGRESSION' }
                    expression { params.SUITE == 'ALL' }
                }
            }
            steps {
                bat 'call npx playwright test tests/regression'
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