import { mount, shallow } from 'enzyme';
import createRouterContext from 'react-router-test-context';
import toJson from 'enzyme-to-json';
import React from 'react';
import Root from 'Root';
import Home from 'pages/Home';
import testData from 'testData/fetchWodsResp';
import fetchMock from 'fetch-mock';
import { wrap } from 'module';

// TODO: add test for:
// infinity scroll
// clicking workout card
// better validations/assertions for existing case

let wrapped;
const map = {};
window.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});
describe('Home component unit test', () => {
  beforeEach(() => {
    const context = createRouterContext();
    wrapped = mount(
      <Root>
        <Home />
      </Root>,
      { context }
    );

  });

  it('Renders correctly', () => {
    fetchMock.get('http://localhost/api/wods/all?size=15&page=1', testData);
    expect(toJson(wrapped)).toMatchSnapshot();
  });

  it('Renders workouts',() => {
    fetchMock.get('http://localhost/api/wods/all?size=15&page=1', testData);
    console.log(wrapped.find(Home));
  });

  afterEach(() => {
    wrapped.unmount();
  });

});

