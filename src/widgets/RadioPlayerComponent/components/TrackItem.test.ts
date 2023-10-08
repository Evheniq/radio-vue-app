import { expect, test, describe } from "vitest";
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TrackItem from './TrackItem.vue';
import {ITrack} from "../types/track.ts";

// Mock data
const trackDataMock: ITrack = {
    title: 'Test Track',
    artist: 'Test Artist',
    album: 'Test Album',
    duration: '00:03:30',
    time: new Date().toISOString(),
    imageUrl: 'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/5f/85/bb/5f85bbf3-de53-a9e2-4e81-3d07080eb080/mzi.mnsosfnc.jpg/450x450bb.jpg',
    status: 'playing',
};

describe("TrackItem.vue tests", () => {
    test('displays track data correctly', async () => {
        // Mount component
        const wrapper = mount(TrackItem, {
            props: { trackData: trackDataMock, isPlaying: true },
        });

        // Assert
        expect(wrapper.find('h2').text()).toBe(trackDataMock.title);
        expect(wrapper.find('h3').text()).toBe(trackDataMock.artist);
        expect(wrapper.find('h4').text()).toBe(trackDataMock.album);
        expect(wrapper.find('p').text()).toContain(trackDataMock.duration);
    });

    test('handles image error', async () => {
        const wrapper = mount(TrackItem, {
            props: { trackData: trackDataMock, isPlaying: true },
        });

        // Manually trigger error event on image
        await wrapper.find('img').trigger('error');
        await nextTick();

        // Assert: check if placeholder image is displayed after error
        expect(wrapper.find('img').attributes('src')).toBe('/src/widgets/RadioPlayerComponent/assets/placeholder.png');
    });
})
