import { TextareaAutosize, Typography } from '@mui/material';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import Markdown from 'react-markdown';

import { defaultErrorMessage } from '@/lib/helper';

import Button from '@/atoms/Button';
import { postBugComment } from '@/services';

const CommentInput: FC<{
  onSubmit: () => Promise<void>;
}> = ({ onSubmit }) => {
  const {
    query: { bugId },
  } = useRouter();

  const [descriptionMode, setDescriptionMode] = React.useState<
    'markdown' | 'text'
  >('text');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [description, setDescription] = React.useState<string>('');

  const handleAddComment = async () => {
    try {
      setIsLoading(true);
      await postBugComment(Number(bugId), description);
      await onSubmit();
      setDescription('');
    } catch (error) {
      defaultErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center space-x-4'>
        <div onClick={() => setDescriptionMode('text')}>
          <Typography
            className={classNames(
              'cursor-pointer rounded-md px-2 py-1',
              descriptionMode === 'text' ? ' bg-gray' : ''
            )}
            fontWeight={500}
          >
            Edit
          </Typography>
        </div>
        <div onClick={() => setDescriptionMode('markdown')}>
          <Typography
            className={classNames(
              'cursor-pointer rounded-md px-2 py-1',
              descriptionMode === 'markdown' ? ' bg-gray' : ''
            )}
            fontWeight={500}
          >
            Preview
          </Typography>
        </div>
      </div>

      {descriptionMode === 'text' ? (
        <div className='w-full'>
          <TextareaAutosize
            minRows={4}
            className='min-h[5rem] resize-y rounded-xl p-4'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      ) : (
        <Markdown className='markdown-container p-4'>{description}</Markdown>
      )}
      <Button
        variant='contained'
        disabled={!description}
        onClick={handleAddComment}
        isLoading={isLoading}
      >
        Add comment
      </Button>
    </div>
  );
};

export default CommentInput;
