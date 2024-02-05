import React from 'react';
import { Column, Img, Row, Section } from '@react-email/components';

const logoURL = 'https://i.ibb.co/mJT4szx/Logo-7.png';

const Header = () => (
  <>
    <Row className="p-6">
      <Column align="center">
        <Img src={logoURL} width="146" height="44" alt="Ship" />
      </Column>
    </Row>

    <Section className="flex w-full">
      <Row>
        <Column className="border-b-0 border-solid border-gray-100 w-60" />
        <Column className="border-b-0 border-solid border-black w-32" />
        <Column className="border-b-0 border-solid border-gray-100 w-60" />
      </Row>
    </Section>
  </>
);

export default Header;
