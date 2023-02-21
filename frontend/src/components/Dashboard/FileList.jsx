function FileList({website}) {
    console.log("website",website)
    return (
    <div className="max-h-20 overflow-scroll text-left m-2 p-2">
            {website.map((item,key)=>{
                return <p key={key}>{item}</p>
            }
            )
            }

    </div>
)}

export default FileList;