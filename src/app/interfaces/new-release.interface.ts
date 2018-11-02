export interface NewReleases {
  feed: Feed;
}
export interface Feed {
    results: Results[]
}
export interface Results {
    artistName: string;
    name: string;
    artworkUrl100: string;
}