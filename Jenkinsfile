pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        IMAGE_NAME = 'saheb2324/sahebsingh:latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'gitlab-credentials', url: 'https://gitlab.com/sahebsinghisher1/BeyondChats-Chatbot-Setup.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                        echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin
                        docker push ${IMAGE_NAME}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Docker image build and push successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
