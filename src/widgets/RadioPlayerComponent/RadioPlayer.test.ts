import { expect, test, describe } from "vitest";
import { mount } from '@vue/test-utils';
import RadioPlayer from './RadioPlayer.vue';
import {TrackService as TrackServiceSuccessful} from './mocks/track-correct.service.ts'

describe('YourComponent', () => {
    test('renders track items and no error message when API call is successful', async () => {
        const originalService = import.meta.globEager('./services/track.service.ts');
        originalService.TrackService = TrackServiceSuccessful;

        const wrapper = mount(RadioPlayer);

        const historyItems = wrapper.find('.history-items');
        expect(historyItems.exists()).toBe(true);

        const playingItem = wrapper.find('.playing-item');
        expect(playingItem.exists()).toBe(true);

        const errorMessage = wrapper.find('.error-block');
        expect(errorMessage.exists()).toBe(false);
    });
});
