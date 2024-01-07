import paramiko
import os

aws_endpoint = "ec2-13-125-237-137.ap-northeast-2.compute.amazonaws.com"
path = "./"
key = "asset-management-1.pem"
user = "ec2-user"
frontend_docker_image = "jindev24/assets-management"
backend_docker_image = "jindev24/assets-management-back"

def ssh_aws(func):
    def aws_connection():
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        try:
            client.connect(aws_endpoint,port=22,username=user, key_filename= path + key)
            func(client)
        except Exception as e:
            raise ConnectionError(e)
        finally:
            client.close()
    return aws_connection


@ssh_aws
def docker_pull_image_compose_down_up(client: paramiko.SSHClient):
    commands = [
        "docker pull " + frontend_docker_image,
        "docker pull " + backend_docker_image ,
        "docker compose down",
        "docker compose up -d",
    ]

    for command in commands:
        stdin, stdout, stderr = client.exec_command(command)
        output = stdout.read().decode()
        error = stderr.read().decode()
        print(output, error)

def frontend_build():
    os.chdir("./asset-management")
    os.system("yarn-build-docker-push.py")
    os.chdir("..")
def backend_build():
    os.chdir("./backend/venv")
    os.system("docker-build-tag-push.py")
    os.chdir("..")
    os.chdir("..")

if __name__ == '__main__':
    frontend_build()
    backend_build()
    docker_pull_image_compose_down_up()