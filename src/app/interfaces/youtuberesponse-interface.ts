interface YouTubeResponse{
    items: item[];  
}

interface YouTubeResponseSearch{
    nextPageToken: string;
    items: itemS[];
}

interface item{
    id: string;
    snippet: snippet;
}

interface itemS{
    id: vidid;
    snippet: snippet;
}

interface vidid{
    videoId: string;
}

interface snippet{
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: thumbnail;
    channelTitle: string;
}

interface thumbnail{
    default: preset;
    medium: medium;
    high: high;
    standard: standard;
}

interface preset{
    url: string;
    width: number;
    height: number;
}

interface medium{
    url: string;
    width: number;
    height: number;
}

interface high{
    url: string;
    width: number;
    height: number;
}

interface standard{
    url: string;
    width: number;
    height: number;
}