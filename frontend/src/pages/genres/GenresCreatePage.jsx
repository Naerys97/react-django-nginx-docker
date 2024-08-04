import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { Button, Message, useToaster } from 'rsuite';
import ModalForm from '../../components/genres/GenresModalForm';
import { useCreateGenreMutation } from '../../features/genres/genresApi';

function GenresCreatePage() {
    const [open, setOpen] = useState(false);
    const [createGenre] = useCreateGenreMutation();
    const toaster = useToaster();
  
    const onSubmit = async (values, actions) => {
      try {
        await createGenre(values);
        setOpen(false);
        toaster.push(
          <Message showIcon type="success" closable>
            Genre successfully created.
          </Message>,
          { duration: 4500, placement: "topCenter" }
        );
      } catch (error) {
        console.log("error", error);
        toaster.push(
          <Message showIcon type="error" closable>
            The following error ocurred while creating the genre.
            {error}
          </Message>,
          { duration: 5000, placement: "topCenter" }
        );
      }
    };
  
    return (
      <>
        <Button
          startIcon={<FiPlus />}
          className="button-green"
          onClick={() => setOpen(true)}
        >
          Add Genre
        </Button>
        <ModalForm
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={onSubmit}
          initialValues={{genre:''}}
          title='Create Genre'
        />
      </>
    );
}

export default GenresCreatePage