import { Button, Center, FileButton, Group, Image, Box } from '@mantine/core';
import { FC, memo, useState } from 'react';
import { PhotoCover } from 'public/icons';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPencil } from '@tabler/icons-react';
import classes from './index.module.css';

interface PhotoInputProps {
  error: string | undefined;
  setPhoto: (file: File) => void;
}

const ONE_MB_IN_BYTES = 1048576;

const PhotoInput: FC<PhotoInputProps> = ({ error, setPhoto }) => {
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFileSizeCorrect = (file: any) => {
    if (file.size / ONE_MB_IN_BYTES > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG or PNG photos.');
    return false;
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    if (!imageFile) return;
    setErrorMessage(null);

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      setPhoto(imageFile);
      setImage(imageFile);
    }
  };

  return (
    <Box>
      <Group>
        <Dropzone
          name="avatarUrl"
          accept={['image/png', 'image/jpg', 'image/jpeg']}
          onDrop={handlePhotoUpload}
          classNames={{
            root: classes.dropzoneRoot,
          }}
          w={180}
          h={180}
        >
          <label className={classes.browseButton}>
            {image ? (
              <Box className={classes.productImageBox}>
                <Image
                  width={180}
                  height={180}
                  alt="Product image"
                  src={URL.createObjectURL(image)}
                  radius="lg"
                />
                <Center w="100%" h="100%" className={classes.productImagePencil}>
                  <IconPencil />
                </Center>
              </Box>
            ) : (
              <Box className={classes.coverWrapper}>
                <PhotoCover />
              </Box>
            )}
          </label>
        </Dropzone>
        <FileButton onChange={handlePhotoUpload} accept="image/png,image/jpeg,image/jpg" multiple>
          {(props) => (
            <Button variant="secondary" color="gray" radius="md" size="sm" {...props}>
              Upload Photo
            </Button>
          )}
        </FileButton>
      </Group>
      {(!!errorMessage || error) && (
        <p className={classes.errorMessage}>{errorMessage || (!image && error)}</p>
      )}
    </Box>
  );
};

export default memo(PhotoInput);
