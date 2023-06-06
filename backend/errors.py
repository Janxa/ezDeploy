
class UnsupportedExtensionError(Exception):
    def __init__(self,filename,extension ):
        self.filename = filename
        if extension == "":
            self.extension="no extension"
        else: self.extension = extension
        self.message = f'UnsupportedExtensionError: {self.filename} is not a supported file type ({self.extension})'

    def __str__(self):
        return self.message


class UnsupportedNameError(Exception):
    def __init__(self,filename, whitespace=False):
        self.filename = filename
        if whitespace:
            self.message=f'UnsupportedNameError: {filename}  whitespaces are not allowed, please replace whitespaces'
        else: self.message = f'UnsupportedNameError: {filename} is not a valid file name, please refer to our unauthorized names list'

    def __str__(self):
        return self.message


class ErrorList(Exception):
    def __init__(self,errors):
         self.errors=errors
    def get_list(self):
        return self.errors
    def __iter__(self):
        self.index = 0
        return self
    def __next__(self):
        if self.index >= len(self.errors):
            raise StopIteration()
        error = self.errors[self.index]
        self.index += 1
        return error
    def __str__(self):
        message="Program encountered multiple erors:"
        for error in self.errors:
            message += '\n'
            message += str(error)
        return message


class FileTooLargeError(Exception):
    def __init__(self,max_size, filename=None,folder=False):
        self.filename=filename
        self.max_size=max_size
        if folder == False:
           self.message = f'FileTooLargeError: {filename} is too large ( max size : {max_size})'
        else:self.message = f'FileTooLargeError: folder is is too large ( {max_size} excessed, try to compress your images to free some space )'
    def __str__(self):
        return self.message

class WebsiteNotFoundError(Exception):
    pass

class UserNotFoundError(Exception):
    pass