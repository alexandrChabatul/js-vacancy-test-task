import { FC, memo, useState } from 'react';
import { ActionIcon, Badge, Card, Group, Image, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { Product } from 'types';
import { productApi } from 'resources/product';
import queryClient from 'query-client';
import { handleError } from 'utils';
import ConfirmDialog from '../ConfirmDialog';

import classes from './index.module.css';
import AddToCartButton from '../AddToCartButton';

interface CardProps {
  product: Product;
  type: 'store' | 'account';
  maw?: number;
  miw?: number;
  h?: number;
  hImage?: number;
}
const CardItem: FC<CardProps> = ({ product, maw, miw, h, hImage, type }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: removeProduct } = productApi.useRemove();
  const handleRemoveProduct = () => {
    removeProduct(product._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['account'] });
        showNotification({
          title: 'Success',
          message: 'The product was removed.',
          color: 'gray',
        });
        setDialogOpen(false);
      },
      onError: (e) => handleError(e),
    });
  };
  return (
    <>
      <Card
        padding="lg"
        radius="lg"
        withBorder
        maw={maw}
        w="100%"
        h={h}
        p="md"
        miw={miw}
        style={{ flexBasis: `${miw}px`, flexGrow: '1' }}
      >
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
          <Text fw="bold" size="xl" lh={1.3} maw="80%" truncate>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
              product.price
            )}
          </Text>
        </Group>
        {type === 'store' && <AddToCartButton productId={product._id} />}
      </Card>
      {type === 'account' && (
        <ConfirmDialog
          isOpen={dialogOpen}
          onAccept={handleRemoveProduct}
          onClose={() => setDialogOpen(false)}
          title="Are you sure you want to remove the item?"
          acceptText="Delete"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default memo(CardItem);
