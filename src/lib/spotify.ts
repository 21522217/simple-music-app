// Audiomack API integration

import { useQuery, UseQueryResult } from "@tanstack/react-query";

// --- Types for Audiomack API responses ---

export interface AudiomackPlaylist {
  id: string;
  title: string;
  description: string;
  cover: string;
}

export interface AudiomackTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  stream_url: string;
}

// --- API Calls ---

// Example: Fetch playlists for a given Audiomack user
export async function fetchAudiomackPlaylists(username: string): Promise<AudiomackPlaylist[]> {
  const res = await fetch(`https://api.audiomack.com/v1/user/playlists?user=${encodeURIComponent(username)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Audiomack playlists");
  }
  const data = await res.json();
  // Map to our interface
  return (data?.results || []).map((pl: any) => ({
    id: pl.id,
    title: pl.title,
    description: pl.description,
    cover: pl.cover,
  }));
}

// Example: Fetch tracks for a given Audiomack playlist
export async function fetchAudiomackTracks(playlistId: string): Promise<AudiomackTrack[]> {
  const res = await fetch(`https://api.audiomack.com/v1/playlist/songs?id=${encodeURIComponent(playlistId)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Audiomack tracks");
  }
  const data = await res.json();
  return (data?.results || []).map((track: any) => ({
    id: track.id,
    title: track.title,
    artist: track.artist,
    album: track.album,
    duration: track.duration,
    cover: track.cover,
    stream_url: track.stream_url,
  }));
}

// --- React Query Hooks ---

export function useAudiomackPlaylists(username: string): UseQueryResult<AudiomackPlaylist[], Error> {
  return useQuery({
    queryKey: ["audiomackPlaylists", username],
    queryFn: () => fetchAudiomackPlaylists(username),
    enabled: !!username,
  });
}

export function useAudiomackTracks(playlistId: string): UseQueryResult<AudiomackTrack[], Error> {
  return useQuery({
    queryKey: ["audiomackTracks", playlistId],
    queryFn: () => fetchAudiomackTracks(playlistId),
    enabled: !!playlistId,
  });
}