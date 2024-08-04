import React, { useRef } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import {
  ButtonToolbar,
  Divider,
  FlexboxGrid,
  IconButton,
  Message,
  Popover,
  useToaster,
  Whisper,
} from "rsuite";
import { useDeleteGenreMutation } from "../../features/genres/genresApi";

function DeleteGenre({ data, children }) {
  const [deleteGenre, { isLoading: isDeleting }] = useDeleteGenreMutation();
  const toaster = useToaster();

  const whisperRef = useRef();
  const handleOk = async () => {
    try {
      await deleteGenre(data.id);
      toaster.push(
        <Message showIcon type="success" closable>
          Genre successfully deleted.
        </Message>,
        { duration: 4500, placement: "topCenter" }
      );
    } catch (error) {
      // console.log("error", error);
      toaster.push(
        <Message showIcon type="error" closable>
          The following error ocurred while deleting the genre.
          {error}
        </Message>,
        { duration: 5000, placement: "topCenter" }
      );
    } finally {
      whisperRef.current.close();
    }
  };
  const handleCancel = () => whisperRef.current.close();
  const speaker = (
    <Popover
      arrow={false}
      placement="auto"
      full
      style={{ padding: "0.8rem", width: "150px" }}
    >
      <p>
        Are you sure you want to delete <b>{data.genre}</b>?
      </p>
      <Divider style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
      <ButtonToolbar as={FlexboxGrid} justify="space-around">
        <IconButton
          circle
          icon={<FiCheck />}
          className="button-green"
          appearance="primary"
          onClick={handleOk}
          disabled={isDeleting}
        />
        <IconButton
          circle
          icon={<FiX />}
          className="button-red"
          appearance="primary"
          onClick={handleCancel}
          disabled={isDeleting}
        />
      </ButtonToolbar>
    </Popover>
  );
  return (
    <Whisper
      trigger="click"
      ref={whisperRef}
      placement="auto"
      speaker={speaker}
    >
      {children}
    </Whisper>
  );
}

export default DeleteGenre;
