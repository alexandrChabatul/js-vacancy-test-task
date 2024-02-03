import React from 'react';
import { Link, Text } from '@react-email/components';

const MainFooter = () => (
  <>
    <Text className="mt-12">
      For any questions or issues, feel free to contact us at{' '}
      <Link href="mailto:alexwork304@gmail.com">alexwork304@gmail.com</Link>
      .
      <br />
      We are always here to assist you!
    </Text>

    <Text>
      Best Regards,
      <br />
      Shopy Team
    </Text>
  </>
);

export default MainFooter;
