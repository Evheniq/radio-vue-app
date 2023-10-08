export class TrackService {
    public async getTracks(): Promise<any> {
        return new Promise.resolve(() => {
            return {
                playingTrackResponse: null,
                historyTracksResponse: [],
                errorMessageResponse: 'Some error'
            }
        })
    }
}