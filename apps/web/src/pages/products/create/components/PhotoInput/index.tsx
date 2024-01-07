import { Button, FileButton, Group, Image, Loader, Stack } from '@mantine/core';
import { FC, memo, useState } from 'react';
import { PhotoCover } from 'public/icons';
import classes from './index.module.css';

interface PhotoInputProps {
  error: string | false | undefined;
  setPhoto: (url: string) => void;
}

const PhotoInput: FC<PhotoInputProps> = ({ error, setPhoto }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onPhotoUpload = (file: File) => {
    setLoading(true);
    if (!file) return;
    setPhotoUrl(file.toString());
    setPhoto(file.toString());
  };

  return (
    <Stack>
      <Group>
        <div>
          {photoUrl ? (
            <Image height={180} w={180} radius="lg" src={photoUrl} />
          ) : (
            <div className={classes.coverWrapper}>
              <PhotoCover />
              {loading && <Loader size={30} className={classes.loader} />}
            </div>
          )}
        </div>
        <FileButton onChange={onPhotoUpload} accept="image/png,image/jpeg,image/jpg">
          {(props) => (
            <Button variant="secondary" color="gray" radius="md" size="sm" {...props}>
              Upload Photo
            </Button>
          )}
        </FileButton>
      </Group>
      {error && <p>{error}</p>}
    </Stack>
  );
};

export default memo(PhotoInput);
