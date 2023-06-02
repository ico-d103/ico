pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2'
    }
    
    stages {
        
        stage('github_clone') {
            steps {
                git branch: 'BE', credentialsId: 'github_token', url: 'https://github.com/ico-d103/ico.git'
            }
        }
        
        stage('secret.yml download') {
            steps {
                withCredentials([file(credentialsId: 'db-credentials', variable: 'dbConfigFile'),
                                file(credentialsId: 'login-credentials', variable: 'loginConfigFile'),
                                file(credentialsId: 'aws-credentials', variable: 'awsConfigFile')]) {
                    script {
                        sh 'cp $dbConfigFile Back-end/api-module/src/main/resources/application-db.yml'
                        sh 'cp $loginConfigFile Back-end/api-module/src/main/resources/application-login.yml'
                        sh 'cp $awsConfigFile Back-end/api-module/src/main/resources/application-aws.yml'
                        
                        sh 'cp $dbConfigFile Back-end/batch-module/src/main/resources/application-db.yml'
                        sh 'cp $loginConfigFile Back-end/batch-module/src/main/resources/application-login.yml'
                        sh 'cp $awsConfigFile Back-end/batch-module/src/main/resources/application-aws.yml'
                    }
                }
            }
        }
        
        stage('build') {
            steps {
                dir('Back-end'){
                    sh "chmod +x ./gradlew"
                    sh "./gradlew clean build"
                }
            }
        }
        
        stage('docker-clean-up') {
            steps {
                script {
                    sshagent(credentials: ['ec2_ssh_key']) {
                    
                    sh '''
                    if test "`docker ps -aq --filter ancestor=back/api-module`"; then
                    
					ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker stop $(docker ps -aq --filter ancestor=back/api-module)"
                    ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker rm -f $(docker ps -aq --filter ancestor=back/api-module)"
                    ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker rmi back/api-module"

                    fi
                    '''
                    
                    sh '''
                    if test "`docker ps -aq --filter ancestor=back/batch-module`"; then
                    
					ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker stop $(docker ps -aq --filter ancestor=back/batch-module)"
                    ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker rm -f $(docker ps -aq --filter ancestor=back/batch-module)"
                    ssh -o StrictHostKeyChecking=no ubuntu@k8d103.p.ssafy.io "docker rmi back/batch-module"

                    fi
                    '''
                    }
                }
                
            }
        }
        
        stage('docker-build'){
            steps {
                script {
                    echo 'Build Docker'
                    dir('Back-end') {
                        script {
                            
                            sh """
                                if ! command -v docker > /dev/null; then
                                    curl -fsSL https://get.docker.com -o get-docker.sh
                                    sh get-docker.sh
                                fi
                            """

                            
                            sh 'docker-compose -f docker-compose.yml build'
                        }
                    }
                }
            }
        }
        
        stage('Docker run') {
            steps {
                dir('Back-end') {
                    script {
                        sh 'docker-compose -f docker-compose.yml up -d'
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'good', 
                message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/m3x6f36pktbudkboif1ebrhf3o', 
                channel: 'D103-Jenkins',
                icon: 'https://www.jenkins.io/images/logos/cute/cute.png'   
                )
            }
        }
        failure {
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (color: 'danger', 
                message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)", 
                endpoint: 'https://meeting.ssafy.com/hooks/m3x6f36pktbudkboif1ebrhf3o', 
                channel: 'D103-Jenkins',
                icon: 'https://www.jenkins.io/images/logos/chatterbox/chatterbox.png'
                )
            }
        }
    }
}
