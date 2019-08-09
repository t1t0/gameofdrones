import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import { exportAllDeclaration } from '@babel/types';

describe('<App />', () => {
    it('renders without crashing', () => {
        const aplicacion = shallow(<App />);
        exportAllDeclaration(aplicacion.find('div').length).toEqual(1);
    });
});
