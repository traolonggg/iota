/**
 * Represents a single playlist in our local database.
 */
export interface Playlist {
  name: string;
  genre: string;
  url: string; // e.g., a Spotify or YouTube Music URL
}

/**
 * Represents the structure of our local playlist database.
 */
export interface PlaylistDatabase {
  [genre: string]: Playlist[];
}
