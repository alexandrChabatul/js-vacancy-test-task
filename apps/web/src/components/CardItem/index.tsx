import { FC, memo, useState } from 'react';
import { ActionIcon, Badge, Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Product } from 'types';

import classes from './index.module.css';
import ConfirmDialog from '../ConfirmDialog';

interface CardProps {
  product: Product;
  type: 'store' | 'account';
  maw?: number;
  h?: number;
  hImage?: number;
}

const CardItem: FC<CardProps> = ({ product, maw, h, hImage, type }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const removeProduct = () => {};
  const handleAddToCart = () => {};
  return (
    <>
      <Card padding="lg" radius="lg" withBorder maw={maw} w="100%" h={h} p="md">
        <Card.Section pos="relative">
          <Image src={product.photoUrl} h={hImage || 160} alt={product.title} />
          {type === 'account' && (
            <Stack pos="absolute" className={classes.userActions} p="md">
              <ActionIcon
                size="lg"
                radius="md"
                variant="default"
                aria-label="Remove"
                onClick={() => setDialogOpen(true)}
              >
                <IconTrash color="gray" />
              </ActionIcon>
              <Badge
                size="lg"
                radius="md"
                className={product.status === 'On sale' ? classes.statusSell : classes.statusSold}
              >
                {product.status}
              </Badge>
            </Stack>
          )}
        </Card.Section>

        <Text fw="bold" size="xl" mt="md" truncate lh={1.3}>
          {product.title}
        </Text>

        <Group className={classes.price} mt={12}>
          <Text size="sm" c="var(--mantine-color-custom-grey-4)" truncate>
            Price:
          </Text>
          <Text fw="bold" size="xl" lh={1.3} truncate>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
              product.price
            )}
          </Text>
        </Group>
      </Card>
      {type === 'account' && (
        <ConfirmDialog
          isOpen={dialogOpen}
          onAccept={removeProduct}
          onClose={() => setDialogOpen(false)}
          title="Are you sure you want to remove the item?"
          acceptText="Delete"
          cancelText="Cancel"
        />
      )}
      {type === 'store' && (
        <Button fullWidth mt="md" radius="md" size="md" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default memo(CardItem);
