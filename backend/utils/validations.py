from ..errors import UnsupportedExtensionError,ErrorList,FileTooLargeError,UnsupportedNameError
import os
from werkzeug.datastructures import ImmutableMultiDict,FileStorage

def validate_all_files(files):
        errorlist=[]
        try:validate_filenames(files)
        except ErrorList as ex:
                for error in ex:
                        errorlist.append(error)
        try: contain_index_html(files)
        except FileExistsError as ex:
                print(ex)
                errorlist.append(ex)

        except FileNotFoundError as ex:
                print(ex)
                errorlist.append(ex)

        try: validate_extensions(files)
        except UnsupportedExtensionError as ex:
                errorlist.append(ex)
        except ErrorList as ex:
                for error in ex:
                        errorlist.append(error)

        try: validate_size(files)
        except ErrorList as ex:
                for error in ex:
                        print("ex",error)
                        errorlist.append(error)
        for error in errorlist:
                print(error)
        if errorlist==[]:
            return True
        else: raise ErrorList(errorlist)
def validate_extensions(data):
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
                ".html",
                ".js",
                ".txt",
                ".xml",
                ".mpe",
                ".mp4",
                ".mov",
                ".flv"
            ]
    errors_list=[]
    if isinstance(data,FileStorage):
        extension=os.path.splitext(data.filename)[1]
        if extension in valid_extensions:
            return True
        else: raise UnsupportedExtensionError(data.filename,extension)
    elif isinstance(data,ImmutableMultiDict):
        for file in data.getlist('files'):
            extension=os.path.splitext(file.filename)[1]
    if extension not in valid_extensions:
        errors_list.append(UnsupportedExtensionError(file.filename,extension).message)
        raise ErrorList(errors_list)
    else: raise TypeError(f'Error: {data} is not a file')

def contain_index_html(files):
    contain_html= False
    for file in files.getlist("files"):
        filename=file.filename.rsplit("/")[-1]
        if contain_html == False and filename=="index.html":
            contain_html = True
        elif contain_html == True and filename=="index.html":
            contain_html = False
            raise FileExistsError("ValueError : There's more than one index.html inside the folder")
        if contain_html==False:
            raise FileNotFoundError("FileNotFoundError: The folder should contain at least 1 index.html file")
        return True

def validate_size(files):
    errorlist=[]
    total_size=0
    for file in files.getlist("files"):
        print("errorlist",errorlist)
        file_bytes = file.read(10*1048576)
        size= len(file_bytes)
        if size >= 2*1048576:
            errorlist.append(FileTooLargeError("2megabytes",file.filename,))
            total_size+=size
        else:total_size+=size
    print(total_size)
    if total_size >= 10*1048576:
        errorlist.append(FileTooLargeError('10megabytes',folder=True))
    if len(errorlist)>0:
        raise ErrorList(errorlist)
    return True

def validate_filenames(files):
    invalid_names = [
    ".bash_history",
    ".bash_logout",
    ".bashrc",
    ".gitconfig",
    ".htaccess",
    ".htpasswd",
    ".ssh/authorized_keys",
    ".ssh/id_rsa",
    ".ssh/id_dsa",
    "config.php",
    "config.inc.php",
    "db.php",
    "wp-config.php",
    ".env",
    ".gitignore",
    ".gitkeep",
    ".gitmodules",
    ".gitattributes",
    ".git",
    ".svn",
    ".DS_Store",
    "index.php",
    "wp-config.php",
    ".aws/credentials",
    ".aws/config",
    "config.json",
    "credentials.csv",
    "accessKeys.csv",
    "access_keys.txt",
    ".pem",
    ".ppk"
]
    errorlist=[]
    for file in files:
     filename=file.filename.rsplit("/")[-1]
     if isinstance(filename,invalid_names):
         errorlist.append(UnsupportedNameError(filename))
    if len(errorlist)>0:
        raise ErrorList(errorlist)
    else: return True
