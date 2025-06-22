var signatures: any = {
    JVBERi0: "application/pdf",
    R0lGODdh: "image/gif",
    R0lGODlh: "image/gif",
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg"
}

export const getExtension = (base64Data: any) => {
    for (var s in signatures) {
        console.log(s);
        
        if (base64Data.indexOf(s) === 0) {
            return Promise.resolve(signatures[s])
        }
    }

    return Promise.resolve(null)
}