pipeline {
  agent any

  environment {
    APP_NAME = 'topnotch-launch-page'
    IMAGE_NAME = "${APP_NAME}:latest"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Smoke Test') {
      steps {
        script {
          sh 'docker run --rm -d --name ${APP_NAME}-smoke -p 8080:8080 ${IMAGE_NAME}'
          sh 'sleep 3'
          sh 'curl -f http://localhost:8080'
        }
      }
    }
  }

  post {
    always {
      sh '''
      docker rm -f ${APP_NAME}-smoke || true
      '''
    }
  }
}
