from argon2 import exceptions

class VerificationError(exceptions.VerifyMismatchError):
    pass
class UserNotFoundError(Exception):
    pass
class LoginError(Exception):
    pass
class TokenExpiredError(Exception):
    #Returns user_id to create a resend token link
    def __init__(self, message, user_id=None):
        super().__init__(message)
        self.user_id = user_id