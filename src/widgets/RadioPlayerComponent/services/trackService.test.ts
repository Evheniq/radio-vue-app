import { TrackService } from "./track.service";
import type { ITrack } from "../types/track.ts";
import { assert, test, describe, beforeEach } from "vitest";
import dataUntyped from "../../../assets/radio-data.json";

// Mock data
const mockData: {"nowplaying": ITrack[]} = dataUntyped;

// Testing TrackService
describe('TrackService', () => {
    let trackService: TrackService;

    beforeEach(() => {
        trackService = new TrackService();
    });

    test('should retrieve the playing track and history tracks', async () => {
        const { playingTrackResponse, historyTracksResponse, errorMessageResponse } = await trackService.getTracks();

        // Assertions
        assert.deepEqual(playingTrackResponse, mockData.nowplaying[0]);
        assert.deepEqual(historyTracksResponse, mockData.nowplaying.slice(1).reverse());
        assert.equal(errorMessageResponse, null);
    });
});
