// import axios, {AxiosResponse} from "axios/index";
import {ITrack} from "../types/track.ts";
import dataUntyped from "../../../assets/radio-data.json";

interface TrackResponse {
    nowplaying: ITrack[]
}

interface TrackResult {
    playingTrackResponse: playingTrackType
    historyTracksResponse: historyTracksType
    errorMessageResponse: errorMessageType
}

type playingTrackType = ITrack | null
type historyTracksType = ITrack[]
type errorMessageType = String | null

export class TrackService {
    public async getTracks(): Promise<TrackResult>{
        let playingTrackResponse: playingTrackType = null
        let historyTracksResponse: historyTracksType = []
        let errorMessageResponse: errorMessageType = null

        try {
            // const response: AxiosResponse<TrackResponse> = await axios.get('https://onair.radioapi.io/thisisgo/go/onair.json')
            // const data = await response.json() as TrackResponse
            // playingTrack = data.nowplaying[0]
            // historyTracks = data.nowplaying.slice(1).reverse()

            const data: TrackResponse = dataUntyped
            playingTrackResponse = data.nowplaying[0]
            historyTracksResponse = data.nowplaying.slice(1).reverse()
        } catch (error) {
            errorMessageResponse = 'Error fetching data from server!'
        }

        return {playingTrackResponse, historyTracksResponse, errorMessageResponse}
    }
}