
class LoginSessionException(Exception):
    def __init__(self, message="Login Session is wrong."):
        self.message = message
        super().__init__(self.message)



