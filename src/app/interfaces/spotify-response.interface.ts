interface ISpotifyResponse {
    display_name: string;
    email: string;
    tracks: ITrack;
    item: IItems;
    uri: string;
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
  