import subprocess

build_path = '.'
image_name = "assets-management-back"
docker_hub_name = "jindev24"
tag_name = docker_hub_name + "/" + image_name

def backend_docker_build(image_name,build_path):
    try:
        result = subprocess.run(["docker", "build", "-t", image_name, build_path], check=True)
        print(f"Docker image '{image_name}' successfully built!!")
    except subprocess.CalledProcessError as e:
        print(f"Error Building Docker image: {e}")
    except Exception as e:
        raise RuntimeError("Unknown Error:", e)
    return result

def tagging_docker_image(image_name, tag_name):

    try:
        result = subprocess.run(["docker", "tag", image_name, tag_name], check=True)
        print(f"Docker tag '{image_name}' successfully tagged!!")
    except subprocess.CalledProcessError as e:
        print(f"Error Tagging Docker image: {e}")
    except Exception as e:
        raise RuntimeError("Unknown Error:", e)
    return result

def push_image_to_docker_registry(tagged_name):
    try:
        result = subprocess.run(["docker", "push", tagged_name ], check=True)
        print(f"Docker push '{image_name}' successfully pushed!!")
    except subprocess.CalledProcessError as e:
        print(f"Error Pushing Docker image: {e}")
    except Exception as e:
        raise RuntimeError("Unknown Error:", e)
    return result

#외부 호출용
def docker_build_tag_push():
    backend_docker_build(image_name, build_path)
    tagging_docker_image(image_name, tag_name)
    push_image_to_docker_registry(tag_name)

if __name__ == '__main__':
    docker_build_tag_push()