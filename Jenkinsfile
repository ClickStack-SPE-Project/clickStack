pipeline {
    environment{
        DOCKERHUB_USER = 'youngsmith11'
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id') 
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_REGION = 'us-east-2'
        S3_BUCKET_NAME = 'clickstackstorage'
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
                    sh 'mvn clean install'
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
            }
        }
        stage('Run ansible playbook'){
            steps{
                script {
                    ansiblePlaybook(
                        playbook: 'playbook.yml',
                        inventory: 'inventory',
                        extraVars: [
                            aws_access_key_id: "${env.AWS_ACCESS_KEY_ID}",
                            aws_secret_access_key: "${env.AWS_SECRET_ACCESS_KEY}",
                            aws_region: "${env.AWS_REGION}",
                            s3_bucket_name: "${env.S3_BUCKET_NAME}"
                        ]
                    )
                }
            }
        }
    }
}