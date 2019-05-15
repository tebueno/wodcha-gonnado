import { mount } from 'enzyme';
import React from 'react';
import Root from 'Root';
import Card from 'components/card/card';
import EllipsisIcon from 'components/ellipsisIcon/ellipsisIcon';

describe('Test rendering of Card component', () => {
  let wrapped;
  const props = { id: '123kj55', wod: 'For Time: 700 Cal row' };

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <Card {...props}> 
          <span>{props.wod}</span>
        </Card>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it('has a div with index value equal to id', () => {
    expect(wrapped.find(`.card`).length).toEqual(1);
  });

  it('displays workout text', () => {
    expect(wrapped.find('span').text()).toEqual(props.wod);
  });
});

describe('Test rendering of ellipse component', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = mount(
      <Root>
        <EllipsisIcon />
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it('it renders', () => {
    expect(wrapped.find(`div.card__ellipsis`).length).toEqual(1);
  });
});
