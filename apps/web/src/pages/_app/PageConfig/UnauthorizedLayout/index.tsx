import { FC, ReactElement } from 'react';

import {
  SimpleGrid,
  Image,
  Center,
  Stack,
  Group,
  Title,
  Text,
  Avatar,
  AvatarGroup,
} from '@mantine/core';

import { LogoImage } from 'public/images';
import classNames from 'classnames';

import classes from './index.module.css';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <Group justify="center" w="100vw">
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" p={32} h="100vh" className={classes.wrapper}>
      <Center w="100%" h="100%" component="main">
        {children}
      </Center>
      <Stack visibleFrom="sm" className={classes.preview}>
        <LogoImage />
        <Group className={classes.previewImages}>
          <Image
            alt="Shopy Item"
            src="/images/ItemCard-1.png"
            className={classNames(classes.previewItemImage, classes.previewItemImageLeft)}
          />
          <Image alt="Shopy Page" src="/images/Shop.png" className={classes.previewShopImage} />
          <Image
            alt="Shopy Item"
            src="/images/ItemCard-2.png"
            className={classNames(classes.previewItemImage, classes.previewItemImageRight)}
          />
        </Group>
        <Stack>
          <Title order={2} className={classes.previewHeading}>
            Sell and buy products super quickly!
          </Title>
          <Text fz="xl">Save your time, we take care of all the processing.</Text>
          <Group mt={20}>
            <AvatarGroup spacing="sm">
              <Avatar src="/images/Avatar-1.png" radius="xl" />
              <Avatar src="/images/Avatar-2.png" radius="xl" />
              <Avatar src="/images/Avatar-3.png" radius="xl" />
              <Avatar src="/images/Avatar-4.png" radius="xl" />
              <Avatar src="/images/Avatar-5.png" radius="xl" />
            </AvatarGroup>
            <Text>
              <b>+100 </b>
              users from all over the world
            </Text>
          </Group>
        </Stack>
      </Stack>
    </SimpleGrid>
  </Group>
);

export default UnauthorizedLayout;
