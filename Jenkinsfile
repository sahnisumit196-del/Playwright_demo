pipeline {
    agent any

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
