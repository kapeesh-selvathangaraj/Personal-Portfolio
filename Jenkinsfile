pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kapeesh-selvathangaraj/Personal-Portfolio.git'
            }
        }

        stage('Install Dependencies') {
            steps {
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
                sh 'docker build -t kapeesh/portfolio'
                sh 'docker login -u kapeesh -p selvathangaraj'
                sh 'docker push kapeesh/portfolio'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
            }
        }
    }
}
