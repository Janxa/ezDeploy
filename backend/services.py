import mimetypes



def file_is_valid(ext):
        valid_extensions = [
            ".gif",
            ".png",
            ".jpeg",
            ".jpg",
            ".svg",
            ".mp3",
            ".aac",
            ".avi",
            ".css",
            ".csv",
            ".htm",
            ".js",
            ".txt",
            ".xml",
            ".mpe",
            ".mp4",
            ".mov",
            ".flv"
        ]

        if ext in valid_extensions:
            return True

        else: raise TypeError(f'Error,{ext} is not a supported file type')
        