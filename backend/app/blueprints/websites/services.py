from .errors import UnsupportedExtensionError,ErrorList,FileTooLargeError,UnsupportedNameError
import os
from.variables import valid_extensions, invalid_names
from flask import jsonify
from werkzeug.datastructures import ImmutableMultiDict,FileStorage
import io
import zipfile
import mimetypes
def validate_all_files(files):
    errorlist = []
    validation_functions = [validate_filenames,contain_index_html,validate_extensions,validate_size ]

    for func in validation_functions:
        try:
            func(files)
        except ErrorList  as ex:
            print("exceptions",ex)
            errorlist.extend(ex)
        except (FileExistsError,FileNotFoundError,UnsupportedExtensionError) as ex:
            errorlist.append(ex)

    if errorlist!=[]:
        raise ErrorList(errorlist)

def validate_filenames(files):
        errorlist=[]
        for file in files:
            if len(file.filename.split()) > 1:
                errorlist.append(UnsupportedNameError(file.filename,whitespace=True))
            filename=file.filename.rsplit("/")[-1]
            if filename in invalid_names:
                errorlist.append(UnsupportedNameError(filename))
        if len(errorlist)>0:
            raise ErrorList(errorlist)
        else: return True


def contain_index_html(files):
    contain_html= False
    print(files)
    for file in files:
        print(file)
        print(file.filename)
        filename=file.filename.rsplit("/")[-1]
        print(filename)
        if contain_html == False and filename=="index.html":
            contain_html = True
        elif contain_html == True and filename=="index.html":
            raise FileExistsError("ValueError : There's more than one index.html inside the folder")
    if contain_html==False:
        raise FileNotFoundError("FileNotFoundError: The folder should contain at least 1 index.html file")
    return True

def validate_extensions(files):

    errors_list=[]
    print("\n \n \n \n \n",type(files),"\n \n \n \n")
    if isinstance(files,FileStorage):
        extension=os.path.splitext(files.filename)[1]
        if extension in valid_extensions:
            return True
        else: raise UnsupportedExtensionError(files.filename,extension)
    elif isinstance(files,list):
        for file in files:
            extension=os.path.splitext(file.filename)[1]
            if extension not in valid_extensions:
                errors_list.append(UnsupportedExtensionError(file.filename,extension))
    else: raise TypeError(f'Error: {files} is not a file')
    if len(errors_list)>0:
      raise ErrorList(errors_list)
    else:return True

def validate_size(files):
    errorlist=[]
    total_size=0

    for file in files:
        #reading only the 10*1048576 first bytes to avoid wasting time on too large files
        file_bytes = file.read(10*1048576)
        size = len(file_bytes)
        #setting back the pointer to the beggining of the file
        file.seek(0)
        if size >= 2*1048576:
            errorlist.append(FileTooLargeError("2megabytes",filename=file.filename))
            total_size+=size

        else:total_size+=size

    if total_size >= 10*1048576:
        errorlist.append(FileTooLargeError('10megabytes',folder=True))
    if len(errorlist)>0:
        raise ErrorList(errorlist)
    return True

def create_error_json(error_list):
    error_dict={}
    for error in error_list:
        if type(error).__name__ in error_dict:
            value=error_dict.get(type(error).__name__)
            value.append(str(error))
            error_dict.update({type(error).__name__:value})

        else: error_dict[type(error).__name__]=[str(error)]

    return jsonify(error_dict)

def extract_files_from_zip(zip_file):
    in_memory_file = io.BytesIO(zip_file.read())
    with zipfile.ZipFile(in_memory_file, 'r') as zip_file:
        file_list = []
        for zip_info in zip_file.infolist():
            if zip_info.is_dir():
                continue
            file_name = zip_info.filename
            if not file_name:
                continue
            file_ext = os.path.splitext(file_name)[1]
            if not file_ext:
                continue
            file_storage = FileStorage(
                stream=zip_file.open(zip_info),
                filename=file_name,
                content_type=mimetypes.guess_type(file_name)[0],
            )
            file_list.append(file_storage)
        return file_list

