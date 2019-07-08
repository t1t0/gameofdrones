import React from 'react';
import HelpModal from '../src/app/helpModal';
import { mount, ReactWrapper } from 'enzyme'

test('Link changes the class when hovered', () => {
    const component = mount(
        <HelpModal/>,
    );
    expect(component).toMatchSnapshot();

    // Passes
    expect(component.find('.btnHelpModal')).toHaveLength(1);
    inside_els = document.getElementsByClassName("modalHelpBody")[0]
    inside_wrapper = new ReactWrapper(inside_els, true)

    // Passes
    expect(inside_wrapper.find('.modalHelpBody')).toHaveLength(1);

  });