import { Button } from '@mantine/core';
import { FC, memo, useMemo } from 'react';
import { userApi } from '../../resources/user';
import { accountApi } from '../../resources/account';

interface AddToCartProps {
  productId: string;
}

const AddToCartButton: FC<AddToCartProps> = ({ productId }) => {
  const { data: user } = accountApi.useGet();
  const { mutate: addToCart, isLoading } = userApi.useAddToCart<{ productId: string }>();

  const isInCart = useMemo(
    () => user?.cart?.some((item) => item._id === productId),
    [user, productId]
  );

  const handleAddToCart = () => {
    addToCart({ productId });
  };

  return (
    <Button
      fullWidth
      mt="md"
      radius="md"
      size="md"
      loading={isLoading}
      onClick={handleAddToCart}
      disabled={isInCart}
    >
      {isInCart ? 'In cart' : 'Add to cart'}
    </Button>
  );
};

export default memo(AddToCartButton);
