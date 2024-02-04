import React from 'react';
import { Column, Img, Row, Section } from '@react-email/components';

// eslint-disable-next-line operator-linebreak
const logoURL =
  'https://firebasestorage.googleapis.com/v0/b/paralect-test-app.appspot.com/o/Logo%20-%20%237.png?alt=media&token=c65736c0-4166-44d8-a235-0e338be77c21';

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
