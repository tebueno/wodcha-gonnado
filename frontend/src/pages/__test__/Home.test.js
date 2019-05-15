import { mount, shallow } from 'enzyme';
import createRouterContext from 'react-router-test-context';
import toJson from 'enzyme-to-json';
import React from 'react';
import Root from 'Root';
import Home from 'pages/Home';
import testData from 'testData/fetchWodsResp';
import fetchMock from 'fetch-mock';

// TODO: add test for:
// infinity scroll
// clicking workout card
// better validations/assertions for existing case

let wrapped;
const map = {};
window.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});
describe('Test rendering of Card component', () => {
  beforeEach(() => {
    const context = createRouterContext();
    wrapped = mount(
      <Root>
        <Home />
      </Root>,
      { context }
    );

    /*     fetchMock.getOnce('http://localhost/api/wods/all?size=15&page=2', {
        "id": "5c0747d29b78ae203b06fa72",
        "wod": "Recovery Day\nA.\nMobility and Maintenance\n* Choose 1-2 Thoracic Mobility Drills from Kelly Starrett’s Mobility WOD and spend 5-10 minutes with them.\n* Choose 2-3 Lower Body Mobility Drills from Kelly Starrett’s Mobility WOD and spend 10-12 minutes with them.\n* Choose 1-2 Upper Extremity Mobility Drills from Kelly Starrett’s Mobility WOD and spend 5-10 minutes with them.\n– AND/OR –\n* Body work from a licensed body worker (ART, Graston, acupuncture, etc…)\nB.\nNutrition Preparation\n* Ensure that you have quality foods prepared in the appropriate quantities to fuel your efforts for the remainder of the week.\nC.\nMental Restoration\n* Different for everyone – could be meditation or could be gathering with friends; the key is to engage in activities that make your life full and help you recharge your batteries.\n"
      });*/
  });

  it('Renders correctly', () => {
    /* map.scroll({height: 111}); */
    /*   Home.contextTypes = {
    router: React.PropTypes.object
  }; */
  fetchMock.getOnce('http://localhost/api/wods/all?size=15&page=1', testData);

    expect(toJson(wrapped)).toMatchSnapshot();
  });

  afterEach(() => {
    wrapped.unmount();
  });

});
