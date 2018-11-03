interface ISpotifyResponse {
    tracks: ITrack;
    item: IItems;
  }
  interface ITrack {
    items: IItems[];
    
  }
  interface IItems {
    artists: IArtists[];
    album: IAlbum[];
  }
  interface IArtists {
    name: string;
  }
  interface IAlbum {
    images: IImages[];
  }
  interface IImages {
    url: string;
  }
  