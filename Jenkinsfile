pipeline {
    environment{
        DOCKERHUB_USER = 'youngsmith11'
    }
    agent any
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ClickStack-SPE-Project/clickStack'
            }
        }
        stage('Maven Build Backend'){
            steps{
                echo 'Building Job'
                dir('backend') {
                    sh 'mvn clean install -X'
                }
            }
        }
        stage('Build Image for Backend'){
            steps{
                echo 'Building docker Image'
                sh "docker build -t $DOCKERHUB_USER/clickstackbackend -f dockerfile/Dockerfile .";
                sh "docker build -t $DOCKERHUB_USER/clickstackfrontend -f dockerfile/FrontendDockerFile .";   
            }
        }
        stage('Login into docker hub & Push Image to DockerHub'){
            steps{
                echo 'Pushing Images into DockerHub'
                script {
                    docker.withRegistry('', 'youngsmithdocker') {
                        sh 'docker push $DOCKERHUB_USER/clickstackbackend';
                        sh 'docker push $DOCKERHUB_USER/clickstackfrontend';
                    }
                }
            }
        }
        stage('Delete Image from localsystem'){
            steps{
                echo 'Deleting Docker Image in docker'
                sh 'docker rmi $DOCKERHUB_USER/clickstackbackend';
                sh 'docker rmi $DOCKERHUB_USER/clickstackfrontend';
                sh 'docker rm clickstackfrontend';
                sh 'docker rm clickstackbackend';
            }
        }
        stage('Run ansible playbook'){
            steps{
                script {
                    ansiblePlaybook(
                        playbook: 'playbook.yml',
                        inventory: 'inventory'
                    )
                }
            }
        }
    }
}