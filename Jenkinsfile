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


    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Smoke Test') {
      steps {
        script {
          sh 'docker run --rm -d --name ${APP_NAME}-smoke -p 3000:3000 ${IMAGE_NAME}'
          sh 'sleep 3'
          sh 'curl -f http://localhost:3000'
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
