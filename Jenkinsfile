pipeline {

    //parameters
    parameters {
      string defaultValue: 'master', description: '', name: 'BRANCH_NAME', trim: true
    }

    agent any

    stages {
        stage('Clean workspace')
        {
            steps {
                cleanWs()
            }
        }

        stage('checkout scm'){
            steps{
                git branch: params.BRANCH_NAME, changelog: false, credentialsId: 'devboat', poll: false, url: 'https://github.com/mkd63/devboat_client.git'
                script{
                    GIT_COMMIT_SHORT = sh(script: "printf \$(git rev-parse --short HEAD)",
                    returnStdout: true )
                }
            }
        }

        stage('Setting ECR credentials'){
            steps{
                sh 'aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 346305327107.dkr.ecr.eu-central-1.amazonaws.com'
            }
        }

        stage('building image and pushing to ecr'){
            steps{
                //   aws s3 cp s3://ishield-slackbot-env-files/prod/prod.env
                sh """
                    docker build -t devboat_image .
                    docker tag devboat_image:latest 346305327107.dkr.ecr.eu-central-1.amazonaws.com/devboat_image:latest
                    docker push 346305327107.dkr.ecr.eu-central-1.amazonaws.com/devboat_image:latest
                    docker tag devboat_image:latest 346305327107.dkr.ecr.eu-central-1.amazonaws.com/devboat_image:$GIT_COMMIT_SHORT
                    docker push 346305327107.dkr.ecr.eu-central-1.amazonaws.com/devboat_image:$GIT_COMMIT_SHORT
                """
            }
        }

        stage('deploying service'){
            steps{

                sh '''
                    aws ecs update-service --service devboat-service --force-new-deployment --cluster devboat-react --region eu-central-1
                '''
            }
        }
    }

    post{
        always{
            cleanWs()
            sh 'docker system prune -af'
        }
    }
}
