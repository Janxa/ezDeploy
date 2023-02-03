from argon2 import exceptions

class VerificationError(exceptions.VerifyMismatchError):
    pass
class UserNotFoundError(Exception):
    pass
