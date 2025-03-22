pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('docker-hub-username') // Add this in Jenkins credentials
        DOCKER_HUB_PASS = credentials('docker-hub-password')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kapeesh-selvathangaraj/Personal-Portfolio.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'node -v'  // Check if Node.js is installed
                sh 'yarn -v'  // Check if Yarn is installed
                sh 'yarn install'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t kapeesh/portfolio .'  // Add `.`
                sh 'echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin'
                sh 'docker push kapeesh/portfolio'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl rollout restart deployment portfolio'
            }
        }
    }
}
