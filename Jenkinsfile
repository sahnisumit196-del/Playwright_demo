pipeline {
    agent any

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