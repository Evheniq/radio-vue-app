export class TrackService {
    public async getTracks(): Promise<{
        playingTrackResponse: null,
        historyTracksResponse: any[],
        errorMessageResponse: String,
    }> {
        return new Promise((resolve) => {
            resolve({
                playingTrackResponse: null,
                historyTracksResponse: [],
                errorMessageResponse: 'Some error'
            })
        })
    }
}