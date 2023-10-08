export class TrackService {
    public async getTracks(): Promise<any> {
        return new Promise.resolve(() => {
            return {
                playingTrackResponse: {
                    "artist": "1Shawn Mendes",
                    "duration": "00:02:52",
                    "iTunesTrackUrl": "https://music.apple.com/gb/album/wonder/1533345318?i=1533345325&uo=4",
                    "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/ab/65/36/ab653661-1b63-ca02-0f19-aed1b5c1ed9c/source/450x450bb.jpg",
                    "status": "playing",
                    "time": "2023-10-08T02:12:16Z",
                    "title": "Wonder"
                },
                historyTracksResponse: [
                    {
                        "artist": "1Shawn Mendes",
                        "duration": "00:02:52",
                        "iTunesTrackUrl": "https://music.apple.com/gb/album/wonder/1533345318?i=1533345325&uo=4",
                        "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/ab/65/36/ab653661-1b63-ca02-0f19-aed1b5c1ed9c/source/450x450bb.jpg",
                        "status": "playing",
                        "time": "2023-10-08T02:12:16Z",
                        "title": "Wonder"
                    },
                    {
                        "artist": "1Shawn Mendes",
                        "duration": "00:02:52",
                        "iTunesTrackUrl": "https://music.apple.com/gb/album/wonder/1533345318?i=1533345325&uo=4",
                        "imageUrl": "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/ab/65/36/ab653661-1b63-ca02-0f19-aed1b5c1ed9c/source/450x450bb.jpg",
                        "status": "playing",
                        "time": "2023-10-08T02:12:16Z",
                        "title": "Wonder"
                    }
                ],
                errorMessageResponse: null
            }
        })
    }
}