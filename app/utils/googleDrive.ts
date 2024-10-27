export interface driveFiles {
    id: string;
    mimeType: string;
    name: string;
    webViewLink: string;
}

interface fetchFilesParam {
    folderId: string;
    apiKey: string;
}

export async function fetchGooleDriveFiles({folderId, apiKey} : fetchFilesParam) {
    let allFiles: driveFiles[] = [];
    let pageToken = null;
    do {
        // Costruisci l'URL della richiesta
        let url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,mimeType,webViewLink),nextPageToken`;

        // Aggiungi il token della pagina se esiste
        if (pageToken) {
            url += `&pageToken=${pageToken}`;
        }

        // Esegui la richiesta
        
        const response = await fetch(url);
        const data = await response.json();

        // Aggiungi i file alla lista
        allFiles.push(...data.files);

        // Aggiorna il token della pagina
        pageToken = data.nextPageToken;
    } while (pageToken); // Continua finché c'è un token per la pagina successiva
    
    return allFiles;
};

export function getMediaTypes(files: driveFiles[]){
    const videos: driveFiles[] = [];
    const images: driveFiles[] = [];
    files.forEach(file => {
        if (file.mimeType.indexOf('image') !== -1) images.push(file);
        if (file.mimeType.indexOf('video') !== -1) videos.push(file);
        
    })
    return { videos, images };
}
